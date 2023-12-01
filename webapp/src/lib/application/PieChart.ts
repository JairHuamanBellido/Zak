import type { IPortfolioDistribution } from '$lib/domain/interface/portfolio.interface';
import * as d3 from 'd3';

export class PieChart {
	private _svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
	private _boxWidth: number;
	private _boxHeight: number;
	private _data: IPortfolioDistribution[];
	constructor(idContainer: string, data: IPortfolioDistribution[], width: number, height: number) {
		this._boxWidth = width;
		this._boxHeight = Math.min(width, height);
		this._data = data;
		this._svg = d3
			.select(idContainer)
			.append('svg')
			.attr('class', 'pie-chart')
			.attr('width', this._boxWidth)
			.attr('height', this._boxHeight)
			.attr('viewBox', [-width/2, -height / 2, width, height])
			.attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');
	}

	private createPie() {
		return d3
			.pie<IPortfolioDistribution>()
			.sort(null)
			.value((d) => d.totalInvestment);
	}

	public display() {
		const arc = d3
			.arc<IPortfolioDistribution>()
			.innerRadius(50)
			.outerRadius(Math.min(this._boxWidth, this._boxHeight) / 2 - 1);
		const labelRadius =
			arc.outerRadius()({ percentageOfTotal: 2, symbol: 'voo', totalInvestment: 203 }) * 0.8;

		const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

		const arcs = this.createPie()(this._data);

		this._svg
			.append('g')
			.attr('stroke', 'hsl(var(--background))')
			.attr('class', 'asd')
			.selectAll()
			.data(arcs)
			.join('path')
			.attr('fill', (d) => `hsl(var(--primary)/ ${d.data.percentageOfTotal / 100}`)
			.attr('d', arc)
			.append('title')
			.text((d) => d.data.symbol);
	}

	public update(width: number, height: number) {
		const boxWidth = width;
		const boxHeigth = Math.min(width, height);

		d3.select('.pie-chart')
			.attr('width', boxWidth)
			.attr('height', boxHeigth)
			.attr('viewBox', [-boxWidth / 2, -boxHeigth / 2, boxWidth, boxHeigth]);
	}
}
