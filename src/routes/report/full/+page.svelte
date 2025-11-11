<script lang="ts">
	import { goto } from '$app/navigation';

	// Enhanced analysis data for full report
	const roomAnalysis = [
		{
			room: 'Kitchen',
			zone: 'South (Wrong Direction)',
			status: 'critical',
			score: 35,
			issues: ['Stove facing wrong direction', 'Water element conflict with fire'],
			remedies: [
				'Relocate to South-East',
				'Add earth elements (clay pots)',
				'Use red/orange colors'
			]
		},
		{
			room: 'Master Bedroom',
			zone: 'South-West (Ideal)',
			status: 'excellent',
			score: 92,
			issues: [],
			remedies: ['Perfect placement - maintain current setup']
		},
		{
			room: 'Bathroom',
			zone: 'Center (Brahmasthan)',
			status: 'critical',
			score: 28,
			issues: ['Violates sacred center', 'Blocks energy flow'],
			remedies: [
				'Cannot relocate - use purification rituals',
				'Keep door closed always',
				'Add sacred plants nearby'
			]
		},
		{
			room: 'Living Room',
			zone: 'North-East (Good)',
			status: 'good',
			score: 78,
			issues: ['Heavy furniture in light zone'],
			remedies: [
				'Move heavy items to South-West',
				'Add water element (fountain)',
				'Use light colors'
			]
		}
	];

	const personalizedRemedies = [
		{
			category: 'Immediate Actions (This Week)',
			items: [
				'Place a small water fountain in North-East corner of living room',
				'Move dining table to South-West area',
				'Add yellow flowers in East direction for career growth',
				'Keep bathroom doors closed at all times'
			]
		},
		{
			category: 'Medium Term (This Month)',
			items: [
				'Repaint kitchen walls in warm earth tones (terracotta/orange)',
				'Install proper ventilation in North-West rooms',
				'Add heavy furniture (bookshelf) in South-West bedroom corner',
				'Place indoor plants in North and East windows'
			]
		},
		{
			category: 'Long Term (3-6 Months)',
			items: [
				'Consider kitchen renovation - relocate to South-East if possible',
				'Install skylight in center area to energize Brahmasthan',
				'Create meditation space in North-East corner',
				'Consult architect for structural Vastu improvements'
			]
		}
	];
</script>

<svelte:head>
	<title>Complete Vastu Analysis - VASTUJI</title>
</svelte:head>

<!-- Enhanced Full Report -->
<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="border-b border-gray-200 bg-white">
		<div class="mx-auto max-w-7xl px-8 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br from-amber-600 to-orange-700"
					>
						<span class="text-sm font-bold text-white">V</span>
					</div>
					<div>
						<div class="text-lg font-bold tracking-tight text-gray-900">VASTUJI</div>
						<div class="text-xs tracking-wide text-gray-500 uppercase">
							The Sacred Science of Space
						</div>
					</div>
				</div>

				<div class="flex items-center space-x-4">
					<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
						Complete Analysis
					</span>

					<button on:click={() => goto('/report')} class="text-gray-400 hover:text-gray-600">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-8 py-12">
		<!-- Success Header -->
		<div
			class="mb-8 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center"
		>
			<div
				class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
			>
				<svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>
			<h1 class="mb-2 text-3xl font-bold text-gray-900">Complete Vastu Analysis Ready!</h1>
			<p class="text-gray-600">Your personalized report with detailed remedies and action plan</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Main Content -->
			<div class="space-y-8 lg:col-span-2">
				<!-- Room-by-Room Analysis -->
				<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
					<h2 class="mb-6 text-2xl font-bold text-gray-900">Detailed Room Analysis</h2>

					<div class="space-y-6">
						{#each roomAnalysis as room}
							<div class="rounded-lg border border-gray-200 p-6">
								<div class="mb-4 flex items-start justify-between">
									<div>
										<h3 class="text-xl font-bold text-gray-900">{room.room}</h3>
										<p class="text-gray-600">{room.zone}</p>
									</div>
									<div class="text-right">
										<div
											class="text-2xl font-bold {room.status === 'excellent'
												? 'text-green-600'
												: room.status === 'good'
													? 'text-green-500'
													: room.status === 'fair'
														? 'text-yellow-600'
														: 'text-red-600'}"
										>
											{room.score}/100
										</div>
										<div class="text-sm text-gray-500 capitalize">{room.status}</div>
									</div>
								</div>

								{#if room.issues.length > 0}
									<div class="mb-4">
										<h4 class="mb-2 font-semibold text-gray-900">Issues Found:</h4>
										<ul class="space-y-1">
											{#each room.issues as issue}
												<li class="flex items-start">
													<svg
														class="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-red-500"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fill-rule="evenodd"
															d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
															clip-rule="evenodd"
														/>
													</svg>
													<span class="text-sm text-gray-700">{issue}</span>
												</li>
											{/each}
										</ul>
									</div>
								{/if}

								<div>
									<h4 class="mb-2 font-semibold text-gray-900">Recommended Actions:</h4>
									<ul class="space-y-1">
										{#each room.remedies as remedy}
											<li class="flex items-start">
												<svg
													class="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-green-500"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fill-rule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clip-rule="evenodd"
													/>
												</svg>
												<span class="text-sm text-gray-700">{remedy}</span>
											</li>
										{/each}
									</ul>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Personalized Action Plan -->
				<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
					<h2 class="mb-6 text-2xl font-bold text-gray-900">Your Personalized Action Plan</h2>

					<div class="space-y-8">
						{#each personalizedRemedies as timeframe}
							<div>
								<h3 class="mb-4 flex items-center text-lg font-bold text-gray-900">
									<div class="mr-3 h-3 w-3 rounded-full bg-amber-500"></div>
									{timeframe.category}
								</h3>

								<div class="space-y-3">
									{#each timeframe.items as item}
										<div class="flex items-start">
											<div
												class="mt-0.5 mr-3 h-6 w-6 flex-shrink-0 cursor-pointer rounded border border-gray-300 transition-colors hover:border-amber-500"
											></div>
											<span class="text-gray-700">{item}</span>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Enhanced Sidebar -->
			<div class="space-y-6">
				<!-- Quick Stats -->
				<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-lg font-bold text-gray-900">Analysis Summary</h3>

					<div class="space-y-4">
						<div class="flex items-center justify-between rounded-lg bg-green-50 p-3">
							<span class="font-medium text-green-800">Excellent Zones</span>
							<span class="font-bold text-green-600">2</span>
						</div>
						<div class="flex items-center justify-between rounded-lg bg-yellow-50 p-3">
							<span class="font-medium text-yellow-800">Need Attention</span>
							<span class="font-bold text-yellow-600">1</span>
						</div>
						<div class="flex items-center justify-between rounded-lg bg-red-50 p-3">
							<span class="font-medium text-red-800">Critical Issues</span>
							<span class="font-bold text-red-600">2</span>
						</div>
					</div>
				</div>

				<!-- Expert Consultation -->
				<div
					class="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6"
				>
					<h3 class="mb-2 text-lg font-bold text-gray-900">Expert Consultation</h3>
					<p class="mb-4 text-sm text-gray-600">
						Get personalized guidance from certified Vastu consultants
					</p>

					<button
						class="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
					>
						Book Consultation
					</button>

					<div class="mt-2 text-center text-xs text-gray-500">
						Starting from ₹2,999 • Video call included
					</div>
				</div>

				<!-- Progress Tracker -->
				<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-lg font-bold text-gray-900">Implementation Progress</h3>

					<div class="space-y-3">
						<div>
							<div class="mb-1 flex justify-between text-sm">
								<span class="text-gray-600">Immediate Actions</span>
								<span class="font-medium text-gray-900">0/4</span>
							</div>
							<div class="h-2 w-full rounded-full bg-gray-200">
								<div class="h-2 rounded-full bg-amber-500" style="width: 0%"></div>
							</div>
						</div>

						<div>
							<div class="mb-1 flex justify-between text-sm">
								<span class="text-gray-600">Medium Term</span>
								<span class="font-medium text-gray-900">0/4</span>
							</div>
							<div class="h-2 w-full rounded-full bg-gray-200">
								<div class="h-2 rounded-full bg-amber-500" style="width: 0%"></div>
							</div>
						</div>

						<div>
							<div class="mb-1 flex justify-between text-sm">
								<span class="text-gray-600">Long Term</span>
								<span class="font-medium text-gray-900">0/4</span>
							</div>
							<div class="h-2 w-full rounded-full bg-gray-200">
								<div class="h-2 rounded-full bg-amber-500" style="width: 0%"></div>
							</div>
						</div>
					</div>

					<div class="mt-3 text-center text-xs text-gray-500">
						Track your progress as you implement remedies
					</div>
				</div>

				<!-- Export Enhanced Report -->
				<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-lg font-bold text-gray-900">Export Complete Report</h3>

					<div class="space-y-3">
						<button
							class="flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
						>
							<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							Download Full PDF
						</button>

						<button
							class="flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
						>
							<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3a2 2 0 012-2h6l2 2h6a2 2 0 012 2v4M8 7v8a2 2 0 002 2h8a2 2 0 002-2V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
								/>
							</svg>
							Save to Dashboard
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
