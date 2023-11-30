import type { IPortfolioDistribution } from '$lib/domain/interface/portfolio.interface';
import * as d3 from 'd3';

export class PieChart {
	private _svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
	private _boxWidth: number;
	private _boxHeight: number;
	private _data: IPortfolioDistribution[];
	constructor(idContainer: string, data: IPortfolioDistribution[], width: number, height: number) {
		this._boxWidth = width;
		this._boxHeight = height;
		this._data = data;
		this._svg = d3
			.select(idContainer)
			.append('svg')
			.attr('width', this._boxWidth)
			.attr('height', this._boxHeight)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
			.attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');
	}

	private getColor() {
		return d3
			.scaleOrdinal()
			.domain(this._data.map((d) => d.symbol))
			.range(d3.quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());
	}

	private createPie() {
		return d3
			.pie<IPortfolioDistribution>()
			.sort(null)
			.value((d) => d.totalInvestment);
	}

	public display() {
		const arc = d3
			.arc()
			.innerRadius(0)
			.outerRadius(this._boxWidth - 100);
		const labelRadius = arc.outerRadius()() * 0.8;

		const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

		const arcs = this.createPie()(this._data);

		this._svg
			.append('g')
			.attr('stroke', 'white')
			.selectAll()
			.data(arcs)
			.join('path')
			.attr('fill', '#d3d3d3')
			.attr('d', arc)
			.append('title')
			.text((d) => d.symbol);

		this._svg
			.append('g')
			.attr('text-anchor', 'middle')
			.selectAll()
			.data(arcs)
			.join('text')
			.attr('transform', (d) => `translate(${arcLabel.centroid(d)})`)
			.call((text) =>
				text
					.append('tspan')
					.attr('y', '-0.4em')
					.attr('font-weight', 'bold')
					.text((d) => d.data.symbol)
			)
			.call((text) =>
				text
					.filter((d) => d.endAngle - d.startAngle > 0.25)
					.append('tspan')
					.attr('x', 0)
					.attr('y', '0.7em')
					.attr('fill-opacity', 0.7)
					.text((d) => d.data.totalInvestment)
			);
	}
}
