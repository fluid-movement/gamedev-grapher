<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Equations } from '$lib/data/Equations.svelte.js';
	import LineChart from '$lib/components/LineChart.svelte';
	import { Plus } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { loadEquations, saveEquations } from '$lib/services/EquationStorageService';
	import EquationCard from '$lib/components/EquationCard.svelte';

	const equationsStore = new Equations(loadEquations());

	$effect(() => {
		saveEquations(equationsStore.equations);
	});
</script>

<div class="relative flex h-screen gap-8 p-8">
	<ScrollArea>
		<div class="flex flex-col gap-4 pr-8">
			{#each equationsStore.equations as equation}
				<EquationCard {equation} {equationsStore} />
			{/each}
			<Button onclick={equationsStore.create}>
				<Plus /> <span>New Equation</span>
			</Button>
		</div>
	</ScrollArea>
	<div class="grow">
		{#if equationsStore.equations.length > 0}
			<LineChart {equationsStore} />
		{/if}
	</div>
</div>
