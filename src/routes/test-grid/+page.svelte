<script>
  import BlueprintGrid from '$lib/components/shared/BlueprintGrid.svelte';

  const sampleZones = [
    { id: 1, status: 'optimal', score: 85 },
    { id: 5, status: 'attention', score: 60 },
    { id: 9, status: 'critical', score: 35 },
  ];

  function handleZoneClick(zoneId) {
    console.log('Clicked zone:', zoneId);
  }
</script>

<div class="p-8 max-w-2xl mx-auto">
  <h1 class="text-3xl font-bold mb-8">Blueprint Grid Test</h1>

  <div class="mb-8">
    <h2 class="text-xl mb-4">Interactive Grid</h2>
    <BlueprintGrid zones={sampleZones} interactive={true} onZoneClick={handleZoneClick} />
  </div>

  <div>
    <h2 class="text-xl mb-4">Static Grid</h2>
    <BlueprintGrid zones={sampleZones} />
  </div>
</div>
