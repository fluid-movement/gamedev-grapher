import type { Equation } from '$lib/data/Equation';

interface EquationsInterface {
	equations: Equation[];
	create: () => void;
	remove: (id: string) => void;
}

class Equations implements EquationsInterface {
	equations = $state<Equation[]>([]);

	create = (): void => {
		this.equations.push({
			id: crypto.randomUUID(),
			equation: '',
			name: 'New Equation',
			minValue: 1,
			maxValue: 20,
			showTable: false,
			hue: Math.random() * 360
		});
	};

	remove = (id: string): void => {
		this.equations = this.equations.filter((eq) => eq.id !== id);
	};
}

export const equationsStore = new Equations();
