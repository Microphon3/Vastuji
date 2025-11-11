<script lang="ts">
	export let icon: string;
	export let size = 24;
</script>

{#if icon === 'om'}
	<svg width={size} height={size} viewBox="0 0 100 100" class="text-orange-400">
		<path
			d="M65 35c-8 0-15 7-15 15s7 15 15 15c4 0 8-2 10-5v10c0 8-7 15-15 15s-15-7-15-15v-20c0-8-7-15-15-15s-15 7-15 15v5h8v-5c0-4 3-7 7-7s7 3 7 7v20c0 13 10 23 23 23s23-10 23-23V50c2 3 6 5 10 5 8 0 15-7 15-15s-7-15-15-15c-4 0-8 2-10 5-2-3-6-5-10-5z"
			fill="currentColor"
		/>
		<circle cx="25" cy="25" r="8" fill="currentColor" />
	</svg>
{:else if icon === 'lotus'}
	<svg width={size} height={size} viewBox="0 0 100 100" class="text-pink-400">
		<path
			d="M50 20c-5 0-8 8-8 18s3 18 8 18 8-8 8-18-3-18-8-18z"
			fill="currentColor"
			opacity="0.9"
		/>
		<path
			d="M35 30c-4 3-6 12-4 20s8 12 14 9c6-3 6-12 4-20s-8-12-14-9z"
			fill="currentColor"
			opacity="0.8"
		/>
		<path
			d="M65 30c4 3 6 12 4 20s-8 12-14 9c-6-3-6-12-4-20s8-12 14-9z"
			fill="currentColor"
			opacity="0.8"
		/>
		<path
			d="M25 45c-3 5-1 14 5 20s16 6 19 1c3-5 1-14-5-20s-16-6-19-1z"
			fill="currentColor"
			opacity="0.7"
		/>
		<path
			d="M75 45c3 5 1 14-5 20s-16 6-19 1c-3-5-1-14 5-20s16-6 19-1z"
			fill="currentColor"
			opacity="0.7"
		/>
		<circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.9" />
	</svg>
{:else if icon === 'yantra'}
	<svg width={size} height={size} viewBox="0 0 100 100" class="text-yellow-400">
		<path d="M50 10L65 35H35L50 10z" fill="currentColor" opacity="0.9" />
		<path d="M50 90L35 65H65L50 90z" fill="currentColor" opacity="0.9" />
		<path d="M10 50L35 35V65L10 50z" fill="currentColor" opacity="0.8" />
		<path d="M90 50L65 65V35L90 50z" fill="currentColor" opacity="0.8" />
		<circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2" />
		<circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.6" />
	</svg>
{:else if icon === 'temple'}
	<svg width={size} height={size} viewBox="0 0 100 100" class="text-orange-500">
		<path d="M20 80h60v10H20z" fill="currentColor" />
		<path d="M25 50h50v30H25z" fill="currentColor" opacity="0.9" />
		<path d="M30 30h40v20H30z" fill="currentColor" opacity="0.8" />
		<path d="M40 20h20v10H40z" fill="currentColor" opacity="0.7" />
		<path d="M45 10h10v10H45z" fill="currentColor" opacity="0.6" />
		<circle cx="50" cy="65" r="8" fill="#000" opacity="0.3" />
	</svg>
{:else if icon === 'chakra'}
	<svg width={size} height={size} viewBox="0 0 100 100" class="text-purple-400">
		<circle
			cx="50"
			cy="50"
			r="40"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			opacity="0.3"
		/>
		<circle
			cx="50"
			cy="50"
			r="25"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			opacity="0.5"
		/>
		<circle
			cx="50"
			cy="50"
			r="12"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			opacity="0.7"
		/>
		{#each Array(8) as _, i}
			<line
				x1="50"
				y1="50"
				x2={50 + 35 * Math.cos((i * 45 * Math.PI) / 180)}
				y2={50 + 35 * Math.sin((i * 45 * Math.PI) / 180)}
				stroke="currentColor"
				stroke-width="1"
				opacity="0.4"
			/>
		{/each}
		<circle cx="50" cy="50" r="5" fill="currentColor" />
	</svg>
{:else if icon === 'compass'}
	<svg width={size} height={size} viewBox="0 0 100 100" class="text-blue-400">
		<circle
			cx="50"
			cy="50"
			r="45"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			opacity="0.4"
		/>
		<path d="M50 10L55 45L50 40L45 45z" fill="currentColor" />
		<path d="M50 90L45 55L50 60L55 55z" fill="currentColor" opacity="0.6" />
		<circle cx="50" cy="50" r="4" fill="currentColor" />
		<text x="50" y="15" text-anchor="middle" fill="currentColor" font-size="8" font-weight="bold"
			>N</text
		>
	</svg>
{:else if icon === 'elements'}
	<svg width={size} height={size} viewBox="0 0 100 100" class="text-green-400">
		<!-- Earth (Square) -->
		<rect x="10" y="70" width="20" height="20" fill="currentColor" opacity="0.8" />
		<!-- Water (Circle) -->
		<circle cx="50" cy="80" r="10" fill="currentColor" opacity="0.7" />
		<!-- Fire (Triangle) -->
		<path d="M80 90L90 70L70 70z" fill="currentColor" opacity="0.9" />
		<!-- Air (Diamond) -->
		<path d="M50 30L60 40L50 50L40 40z" fill="currentColor" opacity="0.6" />
		<!-- Space (Oval) -->
		<ellipse cx="50" cy="15" rx="15" ry="8" fill="currentColor" opacity="0.5" />
	</svg>
{:else if icon === 'sun'}
	<svg width={size} height={size} viewBox="0 0 100 100" class="text-yellow-500">
		<circle cx="50" cy="50" r="20" fill="currentColor" />
		{#each Array(8) as _, i}
			<line
				x1={50 + 30 * Math.cos((i * 45 * Math.PI) / 180)}
				y1={50 + 30 * Math.sin((i * 45 * Math.PI) / 180)}
				x2={50 + 40 * Math.cos((i * 45 * Math.PI) / 180)}
				y2={50 + 40 * Math.sin((i * 45 * Math.PI) / 180)}
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
			/>
		{/each}
	</svg>
{/if}
