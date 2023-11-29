import * as d3 from 'd3';
import { TooltipChart } from './Tooltip';
import { formatDateShort } from '$lib/utils/utils';
import type { IPortfolioTimeSeriesData } from '$lib/domain/interface/portfolio.interface';

const height = 500;
const marginTop = 20;
const marginRight = 100;
const marginBottom = 100;
const marginLeft = 40;
export class Chart {
	private _svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
	private _data: IPortfolioTimeSeriesData[];
	private _boxWidth: number;
	constructor(idContainer: string, data: IPortfolioTimeSeriesData[], boxWidth: number) {
		this._svg = d3
			.select(idContainer)
			.append('svg')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('overflow', 'initial');
		this._data = data;
		this._boxWidth = boxWidth;
	}

	public getX() {
		return d3.scaleUtc(
			d3.extent(this._data, (d) => new Date(d.date + 'T23:00:00Z')) as [Date, Date],
			[marginLeft, this._boxWidth - marginRight]
		);
	}

	public get svg() {
		return this._svg;
	}

	public get data() {
		return this._data;
	}

	public getY() {
		const maxValuAppl = [...this._data].sort((a, b) => (a.value < b.value ? 1 : -1))[0].value;
		const minValuAppl = [...this._data].sort((a, b) => (a.value > b.value ? 1 : -1))[0].value;
		return d3.scaleLinear([minValuAppl, maxValuAppl], [height - marginBottom, marginTop]);
	}

	private getLine() {
		const x = this.getX();
		const y = this.getY();
		return d3
			.line<IPortfolioTimeSeriesData>()
			.x((d) => x(new Date(d.date + 'T23:00:00Z')))
			.y((d) => y(d.value));
	}
	public buidlXAsis() {
		const x = this.getX();
		this._svg
			.append('g')
			.attr('transform', `translate(0,${height - marginBottom})`)
			.attr('class', 'x-axis-container')
			.call(
				d3
					.axisBottom<Date>(x)
					.ticks(this._boxWidth / 80)
					.tickSizeOuter(0)
					.tickFormat((d) => `${d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}`)
			)
			.call((g) => g.selectAll('.domain').style('display', 'none'))
			.call((g) => g.selectAll('line').style('display', 'none'))
			.call((g) => g.selectAll('text').style('font-size', '0.875rem'));
	}

	public buildYAsis() {
		const y = this.getY();
		this._svg
			.append('g')
			.attr('transform', `translate(${marginLeft},0)`)
			.attr('class', 'y-axis-container')
			.call(d3.axisLeft(y).ticks(height / 100))
			.call((g) => g.select('.domain').remove())
			.call((g) => g.selectAll('text').style('font-size', '0.875rem'))
			.attr('color', 'hsl(var(--muted-foreground))')
			.call((g) =>
				g
					.selectAll('.tick line')
					.attr('x2', this._boxWidth - marginLeft - marginRight)
					.attr('stroke-opacity', 0.1)
			);
	}

	public buildPath() {
		const line = this.getLine();
		this._svg
			.append('path')
			.attr('class', 'line-stocks')
			.attr('fill', 'none')
			.attr('stroke', 'hsl(var(--primary)')
			.attr('stroke-width', 2)
			.attr('d', line(this._data));
	}

	public updatePath() {
		if (this._svg) {
			const line = this.getLine();
			d3.select('.line-stocks').attr('d', line(this._data));
		}
	}

	public updateXAxis() {
		const axisCall: (
			selection: d3.Selection<any, unknown, SVGSVGElement, unknown>
		) => d3.Selection<d3.BaseType, unknown, SVGSVGElement, unknown> = (selection) =>
			selection.call(
				d3
					.axisBottom<Date>(this.getX())
					.ticks(this._boxWidth / 80)
					.tickSizeOuter(0)
					.tickFormat((d) => `${formatDateShort(d)}`)
			);

		d3.axisBottom<any>(this.getX())
			.ticks(this._boxWidth / 80)
			.tickSizeOuter(0)
			.tickFormat((d) => `${formatDateShort(d)}`);
		this._svg.selectAll('g.x-axis-container').call(axisCall);
	}

	public updateYAxis() {
		this._svg.select('g.y-axis-container').call((g) =>
			g
				.selectAll('.tick line')
				.attr('x2', this._boxWidth - marginLeft - marginRight)
				.attr('stroke-opacity', 0.1)
		);
	}

	public updateChart(boxWidth: number) {
		this._boxWidth = boxWidth;
		this.updatePath();
		this.updateXAxis();
		this.updateYAxis();
	}
	public addToolTip() {
		const tooltip = new TooltipChart(this._svg);
		this._svg
			.on('pointerenter pointermove', (e) =>
				tooltip.onMouseEnter(e, this.getX(), this.getY(), this._data)
			)
			.on('pointerleave', (e) => tooltip.onMouseLeave());
	}
}
