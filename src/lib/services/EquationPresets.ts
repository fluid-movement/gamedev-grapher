export type EquationPreset = {
		name: string;
		equation: string[];
		description: string;
};

export const equationPresets: EquationPreset[] = [
	{
		name: "Constant",
		equation: ["10", "500"],
		description: "A horizontal line.",
	},
	{
		name: "Linear",
		equation: ["x", "2x + 3"],
		description: "A straight line.",
	},
	{
		name: "Exponential",
		equation: ["1.5^x", "2^x", "e^x"],
		description: "A curve that increases rapidly.",
	},
	{
		name: "Logarithmic",
		equation: ["log(x)", "ln(x)"],
		description: "A curve that increases slowly.",
	},
	{
		name: "Polynomial",
		equation: ["x^2", "x^3 - 4x + 1"],
		description: "A curve defined by a polynomial function.",
	},
	{
		name: "Trigonometric",
		equation: ["sin(x)", "cos(x)", "tan(x)"],
		description: "Periodic functions based on angles.",
	}
];