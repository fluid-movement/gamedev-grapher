import type { Equation } from '$lib/data/Equation';
import * as math from 'mathjs';

export interface DataPoint {
	x: number;
	y: number;
}

export const compute = (equation: Equation): DataPoint[] => {
	const compiled = math.compile(equation.equation);
	let dataPoints: DataPoint[] = [];
	for (let x = equation.minValue; x <= equation.maxValue; x++) {
		dataPoints.push({
			x: x,
			y: compiled.evaluate({ x: x }) as number
		});
	}

	return dataPoints;
};