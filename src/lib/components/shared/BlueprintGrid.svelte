<script lang="ts">
	import type { Zone } from '$lib/types/database';

	interface Props {
		zones?: Partial<Zone>[];
		interactive?: boolean;
		onZoneClick?: (zoneId: number) => void;
	}

	let { zones = [], interactive = false, onZoneClick }: Props = $props();

	// Create 16 zones with defaults if not provided
	const displayZones = $derived(
		Array.from({ length: 16 }, (_, i) => {
			const zoneId = i + 1;
			const existingZone = zones.find((z) => z.id === zoneId);
			return {
				id: zoneId,
				status: existingZone?.status || 'neutral',
				score: existingZone?.score || 0
			};
		})
	);

	function handleZoneClick(zoneId: number) {
		if (interactive && onZoneClick) {
			onZoneClick(zoneId);
		}
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'optimal':
				return 'bg-[var(--optimal-green)]/20 border-[var(--optimal-green)] hover:bg-[var(--optimal-green)]/30 optimal';
			case 'attention':
				return 'bg-[var(--attention-amber)]/20 border-[var(--attention-amber)] hover:bg-[var(--attention-amber)]/30 attention';
			case 'critical':
				return 'bg-[var(--critical-red)]/20 border-[var(--critical-red)] hover:bg-[var(--critical-red)]/30 critical';
			default:
				return 'bg-[var(--neutral-gray)]/10 border-[var(--grid-lines)] hover:bg-[var(--neutral-gray)]/20';
		}
	}
</script>

<div
	class="blueprint-grid grid aspect-square w-full grid-cols-4 grid-rows-4 gap-0 border-2 border-[var(--grid-lines)]"
>
	{#each displayZones as zone (zone.id)}
		<button
			data-zone={zone.id}
			class="zone-cell relative border border-[var(--grid-lines)] transition-all duration-200 {getStatusColor(
				zone.status
			)} {interactive ? 'cursor-pointer' : 'cursor-default'}"
			class:interactive
			onclick={() => handleZoneClick(zone.id)}
			disabled={!interactive}
		>
			<!-- Zone number -->
			<span class="absolute top-1 left-1 font-mono text-xs text-gray-400">
				{zone.id}
			</span>

			<!-- Score indicator (if available) -->
			{#if zone.score > 0}
				<div
					class="absolute right-1 bottom-1 text-xs font-bold"
					class:text-[var(--optimal-green)]={zone.status === 'optimal'}
					class:text-[var(--attention-amber)]={zone.status === 'attention'}
					class:text-[var(--critical-red)]={zone.status === 'critical'}
				>
					{zone.score}
				</div>
			{/if}
		</button>
	{/each}
</div>

<style>
	.zone-cell {
		min-height: 60px;
	}

	.zone-cell.interactive:hover {
		transform: scale(1.02);
		z-index: 10;
	}

	@media (min-width: 768px) {
		.zone-cell {
			min-height: 80px;
		}
	}
</style>
