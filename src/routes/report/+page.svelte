<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	
	let reportType = 'basic';
	let vastuScore = 68;
	let issuesFound = 12;
	let remediesAvailable = 8;
	
	onMount(() => {
		// Get report type from URL params
		reportType = $page.url.searchParams.get('type') || 'basic';
	});
	
	// Sample analysis data
	const zoneAnalysis = [
		{ zone: 'North-East (Ishaan)', status: 'excellent', score: 92, issue: null, color: 'green' },
		{ zone: 'North', status: 'good', score: 78, issue: null, color: 'green' },
		{ zone: 'North-West (Vayavya)', status: 'fair', score: 65, issue: 'Heavy furniture blocking air flow', color: 'yellow' },
		{ zone: 'East', status: 'good', score: 82, issue: null, color: 'green' },
		{ zone: 'Center (Brahmasthan)', status: 'critical', score: 28, issue: 'Toilet placement violates sacred center', color: 'red' },
		{ zone: 'West', status: 'fair', score: 58, issue: 'Mirror placement needs adjustment', color: 'yellow' },
		{ zone: 'South-East (Agneya)', status: 'excellent', score: 88, issue: null, color: 'green' },
		{ zone: 'South', status: 'critical', score: 35, issue: 'Kitchen in wrong direction', color: 'red' },
		{ zone: 'South-West (Nairutya)', status: 'good', score: 75, issue: null, color: 'green' }
	];
	
	const elementBalance = [
		{ element: 'Earth (Prithvi)', percentage: 45, status: 'balanced', color: 'amber' },
		{ element: 'Water (Jal)', percentage: 72, status: 'excess', color: 'blue' },
		{ element: 'Fire (Agni)', percentage: 28, status: 'deficient', color: 'red' },
		{ element: 'Air (Vayu)', percentage: 55, status: 'balanced', color: 'gray' },
		{ element: 'Space (Akasha)', percentage: 38, status: 'deficient', color: 'purple' }
	];
	
	const quickRemedies = [
		{ title: 'Relocate Kitchen Elements', description: 'Move stove to South-East corner', priority: 'high', effort: 'medium' },
		{ title: 'Add Earth Elements', description: 'Place clay pots in South-West', priority: 'medium', effort: 'low' },
		{ title: 'Improve Air Flow', description: 'Remove heavy furniture from North-West', priority: 'medium', effort: 'medium' },
		{ title: 'Sacred Center Clearing', description: 'Avoid placing heavy objects in center', priority: 'high', effort: 'low' }
	];
	
	function upgradeToFull() {
		goto('/setup');
	}
</script>

<svelte:head>
	<title>Vastu Analysis Report - VASTUJI</title>
</svelte:head>

<!-- Professional Report Interface -->
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
					{#if reportType === 'basic'}
						<span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
							Basic Report
						</span>
					{:else}
						<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
							Complete Analysis
						</span>
					{/if}
					
					<button 
						on:click={() => goto('/scan')}
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
		
		<!-- Report Header -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
			<div class="text-center">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">Your Vastu Analysis</h1>
				<p class="text-xl text-gray-600 mb-8">
					{reportType === 'basic' ? 'Initial assessment based on your space scan' : 'Complete analysis with personalized recommendations'}
				</p>
				
				<!-- Overall Score -->
				<div class="flex justify-center items-center mb-8">
					<div class="relative w-32 h-32">
						<!-- Score Circle -->
						<svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
							<path
								class="text-gray-200"
								stroke="currentColor"
								stroke-width="3"
								fill="none"
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
							/>
							<path
								class="text-amber-500"
								stroke="currentColor"
								stroke-width="3"
								fill="none"
								stroke-dasharray="{vastuScore}, 100"
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
							/>
						</svg>
						<div class="absolute inset-0 flex flex-col items-center justify-center">
							<span class="text-3xl font-bold text-gray-900">{vastuScore}</span>
							<span class="text-sm text-gray-600">Vastu Score</span>
						</div>
					</div>
				</div>
				
				<!-- Key Metrics -->
				<div class="grid grid-cols-3 gap-6">
					<div class="text-center">
						<div class="text-2xl font-bold text-red-600 mb-1">{issuesFound}</div>
						<div class="text-sm text-gray-600">Issues Found</div>
					</div>
					<div class="text-center">
						<div class="text-2xl font-bold text-green-600 mb-1">4</div>
						<div class="text-sm text-gray-600">Zones Aligned</div>
					</div>
					<div class="text-center">
						<div class="text-2xl font-bold text-amber-600 mb-1">{remediesAvailable}</div>
						<div class="text-sm text-gray-600">Remedies Available</div>
					</div>
				</div>
			</div>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			
			<!-- Main Analysis -->
			<div class="lg:col-span-2 space-y-8">
				
				<!-- Directional Analysis -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
					<h2 class="text-2xl font-bold text-gray-900 mb-6">Directional Zone Analysis</h2>
					
					<div class="space-y-4">
						{#each zoneAnalysis as zone}
							<div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
								<div class="flex-1">
									<div class="font-semibold text-gray-900">{zone.zone}</div>
									{#if zone.issue}
										<div class="text-sm text-gray-600 mt-1">{zone.issue}</div>
									{/if}
								</div>
								
								<div class="flex items-center space-x-3">
									<div class="text-right">
										<div class="text-sm font-medium text-gray-900">{zone.score}/100</div>
										<div class="text-xs text-gray-500 capitalize">{zone.status}</div>
									</div>
									
									<div class="w-3 h-3 rounded-full {
										zone.color === 'green' ? 'bg-green-500' :
										zone.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
									}"></div>
								</div>
							</div>
						{/each}
					</div>
					
					{#if reportType === 'basic'}
						<div class="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
							<div class="text-amber-800 text-sm">
								<strong>🔒 Complete Analysis Available:</strong> Get detailed remedies, room-by-room guidance, and personalized solutions.
							</div>
						</div>
					{/if}
				</div>

				<!-- 5 Elements Balance -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
					<h2 class="text-2xl font-bold text-gray-900 mb-6">5 Elements Balance (Panch Mahabhuta)</h2>
					
					<div class="space-y-4">
						{#each elementBalance as element}
							<div class="flex items-center justify-between">
								<div class="flex-1">
									<div class="flex items-center justify-between mb-2">
										<span class="font-semibold text-gray-900">{element.element}</span>
										<span class="text-sm font-medium text-gray-600">{element.percentage}%</span>
									</div>
									<div class="w-full bg-gray-200 rounded-full h-2">
										<div 
											class="h-2 rounded-full bg-{element.color}-500" 
											style="width: {element.percentage}%"
										></div>
									</div>
									<div class="text-xs text-gray-500 mt-1 capitalize">{element.status}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="space-y-8">
				
				<!-- Quick Remedies -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 class="text-xl font-bold text-gray-900 mb-4">Quick Remedies</h3>
					
					<div class="space-y-4">
						{#each quickRemedies.slice(0, reportType === 'basic' ? 2 : 4) as remedy}
							<div class="p-4 border border-gray-200 rounded-lg">
								<div class="flex items-start justify-between mb-2">
									<h4 class="font-semibold text-gray-900 text-sm">{remedy.title}</h4>
									<span class="text-xs px-2 py-1 rounded-full {
										remedy.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
									}">
										{remedy.priority}
									</span>
								</div>
								<p class="text-sm text-gray-600 mb-2">{remedy.description}</p>
								<div class="text-xs text-gray-500">Effort: {remedy.effort}</div>
							</div>
						{/each}
					</div>
					
					{#if reportType === 'basic'}
						<div class="mt-4 p-3 bg-gray-50 rounded-lg text-center">
							<div class="text-sm text-gray-600">+{quickRemedies.length - 2} more remedies in full report</div>
						</div>
					{/if}
				</div>

				<!-- Upgrade CTA -->
				{#if reportType === 'basic'}
					<div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
						<div class="text-center">
							<h3 class="text-xl font-bold text-gray-900 mb-2">Unlock Complete Analysis</h3>
							<p class="text-gray-600 text-sm mb-6">
								Get personalized remedies, detailed room guidance, and expert recommendations
							</p>
							
							<ul class="text-left space-y-2 mb-6 text-sm text-gray-700">
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
									</svg>
									Room-by-room detailed analysis
								</li>
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
									</svg>
									Personalized remedy calendar  
								</li>
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
									</svg>
									3D visualization and placement guide
								</li>
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
									</svg>
									Expert consultation access
								</li>
							</ul>
							
							<button 
								on:click={upgradeToFull}
								class="w-full bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
							>
								Complete Your Profile
							</button>
							
							<div class="text-xs text-gray-500 mt-2">
								Takes 2 minutes • Unlock full potential
							</div>
						</div>
					</div>
				{/if}

				<!-- Export Options -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 class="text-xl font-bold text-gray-900 mb-4">Export Report</h3>
					
					<div class="space-y-3">
						<button class="w-full flex items-center justify-center border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
							</svg>
							Download PDF
						</button>
						
						<button class="w-full flex items-center justify-center border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
							</svg>
							Share Report
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>