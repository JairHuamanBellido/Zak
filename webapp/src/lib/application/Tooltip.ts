import type { IPortfolio, IPortfolioTimeSeriesData } from '$lib/domain/interface/portfolio.interface';
import { formatDateShort } from '$lib/utils/utils';
import { bisector, pointer, type Selection } from 'd3';

export class TooltipChart {
	private _tooltip: Selection<SVGRectElement, unknown, HTMLElement, any>;
	private _tooltipTextPrice: Selection<SVGTextElement, unknown, HTMLElement, any>;
	private _tooltipTextDate: Selection<SVGTextElement, unknown, HTMLElement, any>;
	private _tooltipBottomLine: Selection<SVGLineElement, unknown, HTMLElement, any>;
	private _tooltipCricle: Selection<SVGCircleElement, unknown, HTMLElement, any>;

	constructor(public svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
		this._tooltip = svg
			.append('rect')
			.attr('fill', 'hsl(var(--background))')
			.attr('filter', 'drop-shadow( 0 0 10px rgba(67, 67, 67, .1))')
			.attr('width', '100')
			.attr('x', 0)
			.attr('y', 0)
			.style('position', 'relative')
			.style('display', 'none')
			.attr('rx', 8)
			.attr('ry', 8)
			.attr('height', '60');

		this._tooltipTextPrice = svg.append('text').attr('x', 0).attr('y', 0).style('z-index', 2);
		this._tooltipTextDate = svg.append('text').attr('x', 0).attr('y', 0).style('z-index', 2);
		this._tooltipBottomLine = svg
			.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', 0)
			.attr('y2', 0)
			.attr('stroke-width', '1px')
			.attr('stroke', 'hsl(var(--primary) / 0.5');
		this._tooltipCricle = svg
			.append('circle')
			.attr('cx', 0)
			.attr('cy', 0)
			.attr('r', 10)
			.attr('display','none')
			// .attr('filter', 'drop-shadow( 0 0 10px rgba(67, 67, 67, 0.5))')
			.attr('filter', 'drop-shadow( 0 0 15px hsl(var(--primary))')
			.attr('fill', 'hsl(var(--primary))')
			// .attr('stroke', 'hsl(var(--background) / 0.5)')
			// .attr('stroke-width', 3);
	}

	public onMouseEnter(
		event: any,
		x: d3.ScaleTime<number, number, never>,
		y: d3.ScaleLinear<number, number, never>,
		data: IPortfolioTimeSeriesData[]
	) {
		const bisect = bisector((d: { date: string }) => new Date(d.date)).center;

		const i = bisect(data, x.invert(pointer(event)[0]));

		this._tooltip.style('display', 'initial');
		this._tooltipTextPrice.style('display', 'initial');
		this._tooltipTextDate.style('display', 'initial');
		this._tooltipBottomLine.style('display', 'initial');
		this._tooltipCricle.style('display', 'initial');

		const selectDate = new Date(data[i].date + 'T23:00:00Z');
		const selectPrice = data[i].value;

		this._tooltip.attr('transform', `translate(${x(selectDate) + 20},${y(data[i].value) - 30})`);
		this._tooltipTextDate
			.attr('transform', `translate(${x(selectDate) + 30},${y(data[i].value) - 10})`)
			.attr('fill', 'hsl(var(--muted-foreground))')
			.attr('font-size', '12px')
			.text(formatDateShort(selectDate));
		this._tooltipTextPrice
			.attr('transform', `translate(${x(selectDate) + 30},${y(data[i].value) + 15})`)
			.attr('fill', 'hsl(var(--primary)')
			.attr('font-size', '1rem')
			.text('$' + data[i].value);

		this._tooltipBottomLine
			.attr('y1', 400)
			.attr('x1', x(selectDate))
			.attr('x2', x(selectDate))
			.attr('y2', y(selectPrice));

		this._tooltipCricle.attr('cx', x(selectDate)).attr('cy', y(selectPrice));
	}

	public onMouseLeave() {
		this._tooltip.style('display', 'none');
		this._tooltipTextDate.style('display', 'none');
		this._tooltipTextPrice.style('display', 'none');
		this._tooltipBottomLine.style('display', 'none');
		this._tooltipCricle.style('display', 'none');
	}
}
