<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { Equations } from '$lib/data/Equations.svelte.js';
	import { build } from '$lib/services/ChartDataService';


	let { equationsStore }: { equationsStore: Equations } = $props();
	let canvas: HTMLCanvasElement;
	let chartInstance: Chart | null = null;

	onMount(() => {
		return () => {
			if (chartInstance) {
				chartInstance.destroy();
			}
		};
	});

	$effect(() => {
		if (canvas && equationsStore) {
			if (chartInstance) {
				chartInstance.destroy();
			}

			chartInstance = new Chart(canvas, build(equationsStore.equations));
		}

		return () => {
			if (chartInstance) {
				chartInstance.destroy();
				chartInstance = null;
			}
		};
	});
</script>

<div class="relative h-full w-full">
	<canvas bind:this={canvas}></canvas>
</div>