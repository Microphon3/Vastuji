<script lang="ts">
	import BlueprintGrid from '$lib/components/shared/BlueprintGrid.svelte';

	const sampleZones = [
		{ id: 1, status: 'optimal' as const, score: 85 },
		{ id: 5, status: 'attention' as const, score: 60 },
		{ id: 9, status: 'critical' as const, score: 35 }
	];

	function handleZoneClick(zoneId: number) {
		console.log('Clicked zone:', zoneId);
	}
</script>

<div class="mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-3xl font-bold">Blueprint Grid Test</h1>

	<div class="mb-8">
		<h2 class="mb-4 text-xl">Interactive Grid</h2>
		<BlueprintGrid zones={sampleZones} interactive={true} onZoneClick={handleZoneClick} />
	</div>

	<div>
		<h2 class="mb-4 text-xl">Static Grid</h2>
		<BlueprintGrid zones={sampleZones} />
	</div>
</div>
