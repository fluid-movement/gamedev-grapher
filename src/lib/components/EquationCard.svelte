<script lang="ts">
    import * as Label from '$lib/components/ui/label';
	import * as ButtonGroup from '$lib/components/ui/button-group';
	import * as InputGroup from '$lib/components/ui/input-group';
	import * as Card from '$lib/components/ui/card';
	import { Switch } from '$lib/components/ui/switch';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
   
	import { compute } from '$lib/services/MathService';
	import { Palette, Trash } from 'lucide-svelte';
	import PresetPicker from '$lib/components/PresetPicker.svelte';
	
	let { equation, equationsStore } = $props();
</script>

<Card.Root class="border-2 border-solid" style="border-color: hsl({equation.hue}, 100%, 50%);">
	<Card.Content class="flex flex-col gap-4">
		<div class="flex gap-4">
			<Input placeholder="Name the equation" bind:value={equation.name} />
			<Button size="icon" variant="outline" onclick={() => equationsStore.changeHue(equation.id)}>
				<Palette />
			</Button>
		</div>
		<div class="flex gap-4">
			<ButtonGroup.Root>
				<ButtonGroup.Text>
					<Label.Root for="equation">y&nbsp;=</Label.Root>
				</ButtonGroup.Text>
				<InputGroup.Root>
					<InputGroup.Input
						bind:value={equation.equation}
						name="equation"
						placeholder="e.g., 2*x + 3"
					/>
				</InputGroup.Root>
			</ButtonGroup.Root>
			<PresetPicker {equation} />
		</div>
		<ButtonGroup.Root>
			<ButtonGroup.Text>
				<Label.Root for="min">Range</Label.Root>
			</ButtonGroup.Text>
			<InputGroup.Root>
				<InputGroup.Input
					bind:value={equation.minValue}
					class="max-w-20"
					type="number"
					name="minValue"
				/>
			</InputGroup.Root>
			<ButtonGroup.Text>-</ButtonGroup.Text>
			<InputGroup.Root>
				<InputGroup.Input
					bind:value={equation.maxValue}
					class="max-w-20"
					type="number"
					name="maxValue"
				/>
			</InputGroup.Root>
		</ButtonGroup.Root>

		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<Switch name="showTable" bind:checked={equation.showTable} />
				<Label.Root for="">Show Values</Label.Root>
			</div>
			<Button size="icon" variant="outline" onclick={() => equationsStore.remove(equation.id)}>
				<Trash />
			</Button>
		</div>
		{#if equation.showTable}
			<ul class="flex flex-col">
				{#each compute(equation) as dataPoint}
					<li class="grow">{dataPoint.x}: {dataPoint.y}</li>
				{/each}
			</ul>
		{/if}
	</Card.Content>
</Card.Root>
