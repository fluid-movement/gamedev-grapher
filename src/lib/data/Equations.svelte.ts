import type { Equation } from '$lib/data/Equation';

interface EquationsInterface {
	equations: Equation[];
	create: () => void;
	remove: (id: string) => void;
	changeHue: (id: string) => void;
}

export class Equations implements EquationsInterface {
	equations = $state<Equation[]>([]);

	constructor(equations: Equation[]) {
		this.equations = equations;
	}

	create = (): void => {
		this.equations.push({
			id: crypto.randomUUID(),
			equation: '',
			name: '',
			minValue: 1,
			maxValue: 20,
			showTable: false,
			hue: Math.random() * 360
		});
	};

	remove = (id: string): void => {
		this.equations = this.equations.filter((eq) => eq.id !== id);
	};

	changeHue = (id: string): void => {
		this.equations = this.equations.map((eq) => {
			if (eq.id === id) {
				return {
					...eq,
					hue: Math.random() * 360
				};
			}
			return eq;
		});
	}
}
