<script lang="ts">
	import { equationPresets } from '$lib/services/EquationPresets';
	import * as Select from '$lib/components/ui/select';
	import { TextAlignJustify } from 'lucide-svelte';

	let { equation } = $props();
</script>

<Select.Root type="single" onValueChange={(value) => {equation.equation = value}}>
	<Select.Trigger><TextAlignJustify /></Select.Trigger>
	<Select.Content>
	{#each equationPresets as preset}
		<Select.Group>
		    <Select.Label>{preset.name}</Select.Label>
			{#each preset.equation as presetEquation}
				<Select.Item value={presetEquation}>
					{presetEquation}
				</Select.Item>
			{/each}
		</Select.Group>
	{/each}
	</Select.Content>
</Select.Root>
