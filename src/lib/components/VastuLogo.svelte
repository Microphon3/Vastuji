<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	
	const sizes = {
		sm: 'w-8 h-8',
		md: 'w-10 h-10', 
		lg: 'w-16 h-16'
	};
	
	const textSizes = {
		sm: 'text-lg',
		md: 'text-xl',
		lg: 'text-3xl'
	};
</script>

<div class="{sizes[size]} bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center pulse-glow">
	<span class="text-white font-bold {textSizes[size]}">V</span>
</div>