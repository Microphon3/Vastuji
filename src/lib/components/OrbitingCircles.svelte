<script lang="ts">
	import { onMount } from 'svelte';
	import VastuIcons from './VastuIcons.svelte';
	
	export let iconSize = 40;
	export let radius = 60;
	export let reverse = false;
	export let speed = 1;
	export let delay = 0;
	export let children = [];
	
	let mounted = false;
	
	onMount(() => {
		mounted = true;
	});
	
	$: animationDuration = `${20 / speed}s`;
	$: animationDelay = `${delay}s`;
	$: itemCount = children.length;
</script>

<div 
	class="absolute animate-spin"
	style="
		animation-duration: {animationDuration}; 
		animation-delay: {animationDelay};
		animation-direction: {reverse ? 'reverse' : 'normal'};
		width: {radius * 2}px;
		height: {radius * 2}px;
	"
>
	{#each children as iconName, i}
		<div 
			class="absolute flex items-center justify-center rounded-full bg-black bg-opacity-20 border border-orange-500 border-opacity-30 backdrop-blur-sm"
			style="
				width: {iconSize}px;
				height: {iconSize}px;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) rotate({(360 / itemCount) * i}deg) translateY(-{radius}px) rotate(-{(360 / itemCount) * i}deg);
			"
		>
			<VastuIcons icon={iconName} size={iconSize * 0.6} />
		</div>
	{/each}
</div>

<style>
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	.animate-spin {
		animation-name: spin;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
</style>