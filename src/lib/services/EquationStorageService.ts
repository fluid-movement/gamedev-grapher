import type { Equation } from '$lib/data/Equation';
import { browser } from '$app/environment';

const STORAGE_KEY = 'equations_data';

export function saveEquations(equations: Equation[]): void {
	if (!browser) return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(equations));
	} catch (error) {
		console.error('Failed to save equations to localStorage:', error);
	}
}

export function loadEquations(): Equation[] {
	if (!browser) return [];

	try {
		const data = localStorage.getItem(STORAGE_KEY);
		return data ? JSON.parse(data) : [];
	} catch (error) {
		console.error('Failed to load equations from localStorage:', error);
		return [];
	}
}