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
			remedies: ['Relocate to South-East', 'Add earth elements (clay pots)', 'Use red/orange colors']
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
			remedies: ['Cannot relocate - use purification rituals', 'Keep door closed always', 'Add sacred plants nearby']
		},
		{
			room: 'Living Room',
			zone: 'North-East (Good)',
			status: 'good',
			score: 78,
			issues: ['Heavy furniture in light zone'],
			remedies: ['Move heavy items to South-West', 'Add water element (fountain)', 'Use light colors']
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
	<header class="bg-white border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-8 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-3">
					<div class="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded flex items-center justify-center">
						<span class="text-white font-bold text-sm">V</span>
					</div>
					<div>
						<div class="font-bold text-gray-900 text-lg tracking-tight">VASTUJI</div>
						<div class="text-xs text-gray-500 uppercase tracking-wide">The Sacred Science of Space</div>
					</div>
				</div>
				
				<div class="flex items-center space-x-4">
					<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
						Complete Analysis
					</span>
					
					<button 
						on:click={() => goto('/report')}
						class="text-gray-400 hover:text-gray-600"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-8 py-12">
		
		<!-- Success Header -->
		<div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 mb-8 text-center">
			<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
				<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
				</svg>
			</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Complete Vastu Analysis Ready!</h1>
			<p class="text-gray-600">Your personalized report with detailed remedies and action plan</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-8">
				
				<!-- Room-by-Room Analysis -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
					<h2 class="text-2xl font-bold text-gray-900 mb-6">Detailed Room Analysis</h2>
					
					<div class="space-y-6">
						{#each roomAnalysis as room}
							<div class="border border-gray-200 rounded-lg p-6">
								<div class="flex items-start justify-between mb-4">
									<div>
										<h3 class="text-xl font-bold text-gray-900">{room.room}</h3>
										<p class="text-gray-600">{room.zone}</p>
									</div>
									<div class="text-right">
										<div class="text-2xl font-bold {
											room.status === 'excellent' ? 'text-green-600' :
											room.status === 'good' ? 'text-green-500' :
											room.status === 'fair' ? 'text-yellow-600' : 'text-red-600'
										}">{room.score}/100</div>
										<div class="text-sm text-gray-500 capitalize">{room.status}</div>
									</div>
								</div>
								
								{#if room.issues.length > 0}
									<div class="mb-4">
										<h4 class="font-semibold text-gray-900 mb-2">Issues Found:</h4>
										<ul class="space-y-1">
											{#each room.issues as issue}
												<li class="flex items-start">
													<svg class="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
														<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
													</svg>
													<span class="text-gray-700 text-sm">{issue}</span>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
								
								<div>
									<h4 class="font-semibold text-gray-900 mb-2">Recommended Actions:</h4>
									<ul class="space-y-1">
										{#each room.remedies as remedy}
											<li class="flex items-start">
												<svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
													<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
												</svg>
												<span class="text-gray-700 text-sm">{remedy}</span>
											</li>
										{/each}
									</ul>
								</div>
							</div>
						{/each}
					</div>
				</div>
				
				<!-- Personalized Action Plan -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
					<h2 class="text-2xl font-bold text-gray-900 mb-6">Your Personalized Action Plan</h2>
					
					<div class="space-y-8">
						{#each personalizedRemedies as timeframe}
							<div>
								<h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
									<div class="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
									{timeframe.category}
								</h3>
								
								<div class="space-y-3">
									{#each timeframe.items as item}
										<div class="flex items-start">
											<div class="w-6 h-6 border border-gray-300 rounded mr-3 mt-0.5 flex-shrink-0 cursor-pointer hover:border-amber-500 transition-colors"></div>
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
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 class="text-lg font-bold text-gray-900 mb-4">Analysis Summary</h3>
					
					<div class="space-y-4">
						<div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
							<span class="text-green-800 font-medium">Excellent Zones</span>
							<span class="text-green-600 font-bold">2</span>
						</div>
						<div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
							<span class="text-yellow-800 font-medium">Need Attention</span>
							<span class="text-yellow-600 font-bold">1</span>
						</div>
						<div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
							<span class="text-red-800 font-medium">Critical Issues</span>
							<span class="text-red-600 font-bold">2</span>
						</div>
					</div>
				</div>

				<!-- Expert Consultation -->
				<div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
					<h3 class="text-lg font-bold text-gray-900 mb-2">Expert Consultation</h3>
					<p class="text-gray-600 text-sm mb-4">
						Get personalized guidance from certified Vastu consultants
					</p>
					
					<button class="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
						Book Consultation
					</button>
					
					<div class="text-xs text-gray-500 mt-2 text-center">
						Starting from ₹2,999 • Video call included
					</div>
				</div>

				<!-- Progress Tracker -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 class="text-lg font-bold text-gray-900 mb-4">Implementation Progress</h3>
					
					<div class="space-y-3">
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="text-gray-600">Immediate Actions</span>
								<span class="text-gray-900 font-medium">0/4</span>
							</div>
							<div class="w-full bg-gray-200 rounded-full h-2">
								<div class="bg-amber-500 h-2 rounded-full" style="width: 0%"></div>
							</div>
						</div>
						
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="text-gray-600">Medium Term</span>
								<span class="text-gray-900 font-medium">0/4</span>
							</div>
							<div class="w-full bg-gray-200 rounded-full h-2">
								<div class="bg-amber-500 h-2 rounded-full" style="width: 0%"></div>
							</div>
						</div>
						
						<div>
							<div class="flex justify-between text-sm mb-1">
								<span class="text-gray-600">Long Term</span>
								<span class="text-gray-900 font-medium">0/4</span>
							</div>
							<div class="w-full bg-gray-200 rounded-full h-2">
								<div class="bg-amber-500 h-2 rounded-full" style="width: 0%"></div>
							</div>
						</div>
					</div>
					
					<div class="text-xs text-gray-500 mt-3 text-center">
						Track your progress as you implement remedies
					</div>
				</div>

				<!-- Export Enhanced Report -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 class="text-lg font-bold text-gray-900 mb-4">Export Complete Report</h3>
					
					<div class="space-y-3">
						<button class="w-full flex items-center justify-center border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
							</svg>
							Download Full PDF
						</button>
						
						<button class="w-full flex items-center justify-center border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h6l2 2h6a2 2 0 012 2v4M8 7v8a2 2 0 002 2h8a2 2 0 002-2V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
							</svg>
							Save to Dashboard
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>