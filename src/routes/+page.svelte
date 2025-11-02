<script lang="ts">
	import * as Label from '$lib/components/ui/label';
	import * as ButtonGroup from '$lib/components/ui/button-group';
	import * as InputGroup from '$lib/components/ui/input-group';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Switch } from '$lib/components/ui/switch';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';


	import { equationsStore } from '$lib/data/Equations.svelte.js';
	import LineChart from '$lib/components/LineChart.svelte';
	import {compute} from '$lib/services/MathService';

</script>

<main class="relative p-8 flex gap-8">
	<div class="flex flex-col gap-4">
		{#each equationsStore.equations as equation}
			<Card.Root>
				<Card.Content class="flex flex-col gap-4">
					<Input bind:value={equation.name} />
					<ButtonGroup.Root>
						<ButtonGroup.Text>
							<Label.Root for="equation">y&nbsp;=</Label.Root>
						</ButtonGroup.Text>
						<InputGroup.Root>
							<InputGroup.Input
								bind:value={equation.equation}
								name="equation"
							/>
						</InputGroup.Root>
					</ButtonGroup.Root>

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

					<div class="flex items-center space-x-2">
						<Switch name="showTable" bind:checked={equation.showTable} />
						<Label.Root for="">Show Values</Label.Root>
					</div>
				</Card.Content>
				<Card.Footer>
					<Button size="sm" variant="destructive" onclick={() => equationsStore.remove(equation.id)}>x</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
		<Button onclick={equationsStore.create}>+</Button>
	</div>
	<div class="grow flex gap-4">
		{#each equationsStore.equations.filter((equation) => equation.showTable === true) as equation}
			<Card.Root>
				<Card.Header>
					<Card.Title>{equation.name}</Card.Title>
					<Card.Description>Results for y = {equation.equation}</Card.Description>
				</Card.Header>
				<Card.Content>
					<Table.Root>
					</Table.Root>
					<ul>
						{#each compute(equation) as dataPoint}
							<li>{dataPoint.x}: {dataPoint.y}</li>
						{/each}
					</ul>
				</Card.Content>
			</Card.Root>
		{/each}
		<LineChart {equationsStore} />
	</div>
</main>
