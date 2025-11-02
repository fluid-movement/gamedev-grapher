import type { Equation } from '$lib/data/Equation';
import { compute } from './MathService';
import type { ChartConfiguration } from 'chart.js';

export const build = (equations: Equation[]): ChartConfiguration => {
	// Calculate overall x-axis range
	const allXValues = equations.flatMap(eq =>
		Array.from({ length: eq.maxValue - eq.minValue + 1 }, (_, i) => eq.minValue + i)
	);
	const minX = Math.min(...allXValues);
	const maxX = Math.max(...allXValues);

	// Generate consistent colors for each equation
	const datasets = equations.map((equation) => {
		const dataPoints = compute(equation);

		return {
			label: equation.name,
			data: dataPoints, // Use { x, y } objects directly
			borderColor: `hsl(${equation.hue}, 100%, 50%)`,
			backgroundColor: `hsla(${equation.hue}, 100%, 50%, 0.5)`,
			pointRadius: 4,
			pointHoverRadius: 6,
			tension: 0.1
		};
	});

	const chartData: ChartConfiguration = {
		type: 'line',
		data: {
			datasets
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					type: 'linear',
					min: minX,
					max: maxX,
					ticks: {
						stepSize: 1
					},
					grid: {
						display: true,
						color: 'rgba(0, 0, 0, 0.1)'
					}
				},
				y: {
					type: 'linear',
					grid: {
						display: true,
						color: 'rgba(0, 0, 0, 0.1)'
					}
				}
			},
			plugins: {
				legend: {
					display: true,
					position: 'top'
				},
				tooltip: {
					mode: 'index',
					intersect: false
				}
			}
		}
	};

	console.log(chartData);
	return chartData;
};