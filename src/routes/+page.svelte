<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import OrbitingCircles from '$lib/components/OrbitingCircles.svelte';
	import VastuIcons from '$lib/components/VastuIcons.svelte';
	
	let mounted = false;
	let videoElement: HTMLVideoElement;
	let stream: MediaStream | null = null;
	let cameraAccess = false;
	let cameraError = '';
	let isCapturing = false;
	let captureProgress = 0;
	let currentStep = 'welcome'; // welcome, propertyType, goals, camera, capturing, results
	let selectedPropertyType = '';
	let selectedGoals: string[] = [];
	let compassHeading = 0;
	
	const propertyTypes = [
		{ id: 'home', name: 'Home/Residence', icon: '🏠', desc: 'Living spaces & apartments' },
		{ id: 'office', name: 'Office/Workspace', icon: '🏢', desc: 'Commercial & business' },
		{ id: 'shop', name: 'Shop/Retail', icon: '🏪', desc: 'Retail & showrooms' },
		{ id: 'factory', name: 'Factory/Industry', icon: '🏭', desc: 'Manufacturing units' },
		{ id: 'plot', name: 'Plot/Land', icon: '🌍', desc: 'Vacant land analysis' }
	];
	
	const goalOptions = [
		{ id: 'wealth', name: 'Wealth & Prosperity', icon: '💰', color: '#FFD700' },
		{ id: 'health', name: 'Health & Wellness', icon: '🌿', color: '#32CD32' },
		{ id: 'career', name: 'Career Growth', icon: '📈', color: '#FF6347' },
		{ id: 'marriage', name: 'Love & Marriage', icon: '💕', color: '#FF69B4' },
		{ id: 'peace', name: 'Peace & Harmony', icon: '🕉️', color: '#9370DB' },
		{ id: 'business', name: 'Business Success', icon: '💼', color: '#FF8C00' }
	];
	
	onMount(() => {
		mounted = true;
		// Initialize compass if available
		if (browser && 'DeviceOrientationEvent' in window) {
			// Request permission for iOS 13+
			if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
				(DeviceOrientationEvent as any).requestPermission()
					.then((response: string) => {
						if (response === 'granted') {
							window.addEventListener('deviceorientation', handleOrientation);
						}
					});
			} else {
				window.addEventListener('deviceorientation', handleOrientation);
			}
		}
	});
	
	function handleOrientation(event: DeviceOrientationEvent) {
		if (event.alpha !== null) {
			compassHeading = Math.round(360 - event.alpha); // Correct for true north
		}
	}
	
	function getDirectionName(heading: number) {
		const directions = [
			{ name: 'North', sanskrit: 'उत्तर', range: [337.5, 22.5] },
			{ name: 'North-East', sanskrit: 'ईशान', range: [22.5, 67.5] },
			{ name: 'East', sanskrit: 'पूर्व', range: [67.5, 112.5] },
			{ name: 'South-East', sanskrit: 'अग्नेय', range: [112.5, 157.5] },
			{ name: 'South', sanskrit: 'दक्षिण', range: [157.5, 202.5] },
			{ name: 'South-West', sanskrit: 'नैऋत्य', range: [202.5, 247.5] },
			{ name: 'West', sanskrit: 'पश्चिम', range: [247.5, 292.5] },
			{ name: 'North-West', sanskrit: 'वायव्य', range: [292.5, 337.5] }
		];
		
		for (let dir of directions) {
			if (dir.range[0] > dir.range[1]) {
				// Handle wrap around (North)
				if (heading >= dir.range[0] || heading < dir.range[1]) {
					return dir;
				}
			} else {
				if (heading >= dir.range[0] && heading < dir.range[1]) {
					return dir;
				}
			}
		}
		return directions[0]; // Default to North
	}
	
	function selectPropertyType(type: string) {
		selectedPropertyType = type;
		currentStep = 'goals';
	}
	
	function toggleGoal(goalId: string) {
		if (selectedGoals.includes(goalId)) {
			selectedGoals = selectedGoals.filter(g => g !== goalId);
		} else {
			selectedGoals = [...selectedGoals, goalId];
		}
	}
	
	function proceedToCamera() {
		if (selectedGoals.length > 0) {
			currentStep = 'camera';
			requestCameraAccess();
		}
	}
	
	async function requestCameraAccess() {
		if (!browser) return;
		
		try {
			stream = await navigator.mediaDevices.getUserMedia({ 
				video: { 
					facingMode: 'environment',
					width: { ideal: 1920 },
					height: { ideal: 1080 }
				} 
			});
			
			if (videoElement) {
				videoElement.srcObject = stream;
				cameraAccess = true;
				cameraError = '';
			}
		} catch (error) {
			console.error('Camera access denied:', error);
			cameraError = 'Camera access required for Vastu analysis';
		}
	}
	
	function startVastuScan() {
		currentStep = 'capturing';
		isCapturing = true;
		captureProgress = 0;
		
		// Simulate comprehensive Vastu analysis
		const analysisSteps = [
			'Detecting 16 Sacred Zones...',
			'Mapping 5 Elements Balance...',
			'Analyzing Directional Strength...',
			'Identifying Room Placements...',
			'Checking 45 Devta Positions...',
			'Calculating Remedies...'
		];
		
		let stepIndex = 0;
		const interval = setInterval(() => {
			captureProgress += 2;
			if (captureProgress % 17 === 0 && stepIndex < analysisSteps.length - 1) {
				stepIndex++;
			}
			if (captureProgress >= 100) {
				clearInterval(interval);
				completeAnalysis();
			}
		}, 100); // 10 second comprehensive analysis
	}
	
	function completeAnalysis() {
		// Stop camera stream
		if (stream) {
			stream.getTracks().forEach(track => track.stop());
			stream = null;
		}
		
		currentStep = 'results';
	}
	
	function resetAnalysis() {
		currentStep = 'welcome';
		selectedPropertyType = '';
		selectedGoals = [];
		isCapturing = false;
		cameraAccess = false;
		captureProgress = 0;
	}
</script>

<svelte:head>
	<title>वास्तुजी VASTUJI - भारत का सबसे व्यापक वास्तु शास्त्र मंच</title>
	<meta name="description" content="5000 वर्षीय ज्ञान के साथ आधुनिक तकनीक। वास्तु सिद्धांतों से अपनी संपत्ति का विश्लेषण करें, व्यक्तिगत उपाय प्राप्त करें।" />
	<meta name="keywords" content="Vastu Shastra, वास्तु शास्त्र, Indian Architecture, Sacred Geometry, Home Design, Directional Analysis" />
</svelte:head>

<!-- Professional Vastu Interface -->
<div class="min-h-screen bg-white">

{#if currentStep === 'welcome'}
	<!-- Clean Professional Layout -->
	<div class="relative">
		<!-- Subtle Header -->
		<header class="px-8 py-6 border-b border-gray-100">
			<div class="flex items-center justify-between max-w-7xl mx-auto">
				<div class="flex items-center space-x-3">
					<div class="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded flex items-center justify-center">
						<span class="text-white font-bold text-sm">V</span>
					</div>
					<div>
						<div class="font-bold text-gray-900 text-lg tracking-tight">VASTUJI</div>
						<div class="text-xs text-gray-500 uppercase tracking-wide">The Sacred Science of Space</div>
					</div>
				</div>
				<div class="hidden md:flex items-center space-x-8 text-sm text-gray-600">
					<span class="hover:text-gray-900 cursor-pointer">Analysis</span>
					<span class="hover:text-gray-900 cursor-pointer">Remedies</span>
					<span class="hover:text-gray-900 cursor-pointer">Consultation</span>
				</div>
			</div>
		</header>

		<!-- Main Content Area -->
		<main class="max-w-7xl mx-auto px-8 py-16">
			<div class="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
				
				<!-- Left: Content -->
				<div class="space-y-8">
					<div class="space-y-6">
						<div class="inline-flex items-center space-x-2 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
							<div class="w-2 h-2 bg-amber-600 rounded-full"></div>
							<span>Instant Spatial Analysis</span>
						</div>
						
						<h1 class="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
							Transform spaces with
							<span class="text-amber-600">ancient wisdom</span>
						</h1>
						
						<p class="text-xl text-gray-600 leading-relaxed max-w-lg">
							Professional Vastu analysis powered by computer vision. 
							Get instant insights into your space's energy flow and receive expert remedies.
						</p>
					</div>
					
					<div class="flex flex-col sm:flex-row gap-4">
						<a 
							href="/scan"
							class="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors group"
						>
							<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
							Scan Your Space
						</a>
						
						<button class="inline-flex items-center justify-center border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors">
							Learn More
						</button>
					</div>
					
					<!-- Trust Indicators -->
					<div class="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
						<div>
							<div class="text-2xl font-bold text-gray-900">16</div>
							<div class="text-sm text-gray-600">Directional Zones</div>
						</div>
						<div>
							<div class="text-2xl font-bold text-gray-900">5000+</div>
							<div class="text-sm text-gray-600">Years of Wisdom</div>
						</div>
						<div>
							<div class="text-2xl font-bold text-gray-900">99%</div>
							<div class="text-sm text-gray-600">Accuracy</div>
						</div>
					</div>
				</div>

				<!-- Right: Visual -->
				<div class="relative">
					<div class="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 relative overflow-hidden">
						<!-- Vastu Grid Visualization -->
						<div class="absolute inset-8 grid grid-cols-4 grid-rows-4 gap-1">
							{#each Array(16) as _, i}
								<div class="bg-white rounded border border-gray-200 flex items-center justify-center relative group hover:bg-amber-50 transition-colors cursor-pointer">
									<div class="text-xs text-gray-400 font-mono">
										{i + 1}
									</div>
									<!-- Subtle direction indicators -->
									{#if i === 1 || i === 2}
										<div class="absolute top-1 right-1 w-1 h-1 bg-blue-400 rounded-full"></div>
									{:else if i === 4 || i === 8}
										<div class="absolute top-1 right-1 w-1 h-1 bg-green-400 rounded-full"></div>
									{:else if i === 6 || i === 7}
										<div class="absolute top-1 right-1 w-1 h-1 bg-red-400 rounded-full"></div>
									{:else if i === 9 || i === 13}
										<div class="absolute top-1 right-1 w-1 h-1 bg-amber-400 rounded-full"></div>
									{/if}
								</div>
							{/each}
						</div>
						
						<!-- Compass indicator -->
						<div class="absolute top-4 right-4 bg-white rounded-lg shadow-sm p-3">
							<div class="w-8 h-8 relative">
								<div class="absolute inset-0 border border-gray-300 rounded-full"></div>
								<div class="absolute top-0 left-1/2 w-0.5 h-3 bg-red-500 transform -translate-x-1/2 origin-bottom"></div>
								<div class="absolute top-1 left-1/2 transform -translate-x-1/2">
									<span class="text-xs font-bold text-gray-700">N</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
{/if}

{#if currentStep === 'propertyType'}
	<!-- Property Type Selection -->
	<div class="absolute inset-0 flex flex-col p-6">
		<div class="text-center mb-8">
			<h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Select Property Type</h2>
			<p class="text-gray-400">Choose your space for personalized Vastu analysis</p>
		</div>
		
		<div class="flex-1 overflow-y-auto">
			<div class="grid gap-4 max-w-2xl mx-auto">
				{#each propertyTypes as property}
					<button 
						on:click={() => selectPropertyType(property.id)}
						class="flex items-center p-6 rounded-2xl border-2 border-gray-700 hover:border-orange-500 transition-all transform hover:scale-105 text-left"
						style="background: rgba(255, 148, 32, 0.05);"
					>
						<div class="text-4xl mr-4">{property.icon}</div>
						<div class="flex-1">
							<div class="text-xl font-bold text-white mb-1">{property.name}</div>
							<div class="text-gray-400 text-sm">{property.desc}</div>
						</div>
						<div class="text-orange-400">→</div>
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}

{#if currentStep === 'goals'}
	<!-- Goals Selection -->
	<div class="absolute inset-0 flex flex-col p-6">
		<div class="text-center mb-8">
			<h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Select Your Goals</h2>
			<p class="text-gray-400">Choose what you want to improve (select multiple)</p>
		</div>
		
		<div class="flex-1 overflow-y-auto mb-6">
			<div class="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
				{#each goalOptions as goal}
					<button 
						on:click={() => toggleGoal(goal.id)}
						class="p-6 rounded-2xl border-2 transition-all transform hover:scale-105 text-center"
						class:border-orange-500={selectedGoals.includes(goal.id)}
						class:border-gray-700={!selectedGoals.includes(goal.id)}
						style="background: {selectedGoals.includes(goal.id) ? 'rgba(255, 148, 32, 0.15)' : 'rgba(255, 148, 32, 0.05)'};"
					>
						<div class="text-3xl mb-3">{goal.icon}</div>
						<div class="text-white font-semibold text-sm">{goal.name}</div>
					</button>
				{/each}
			</div>
		</div>
		
		{#if selectedGoals.length > 0}
			<div class="text-center">
				<button 
					on:click={proceedToCamera}
					class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 rounded-3xl text-lg font-bold shadow-2xl transform hover:scale-105 transition-all"
				>
					📱 Open Camera ({selectedGoals.length} goals selected)
				</button>
			</div>
		{/if}
	</div>
{/if}

{#if currentStep === 'camera'}
	<!-- Full-Screen Camera with Vastu Overlay -->
	<div class="absolute inset-0 flex flex-col">
		{#if cameraAccess}
			<!-- Camera View with 16-Zone Overlay -->
			<div class="flex-1 relative overflow-hidden">
				<video 
					bind:this={videoElement}
					autoplay 
					playsinline 
					class="w-full h-full object-cover"
				></video>
				
				<!-- 16-Zone Vastu Grid Overlay -->
				<div class="absolute inset-0 pointer-events-none">
					<!-- Grid Lines -->
					<div class="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0">
						{#each Array(16) as _, i}
							<div class="border border-orange-500 border-opacity-30 flex items-center justify-center">
								<span class="text-orange-300 text-xs font-bold bg-black bg-opacity-50 px-1 rounded">Z{i+1}</span>
							</div>
						{/each}
					</div>
					
					<!-- Compass Indicator -->
					<div class="absolute top-4 right-4 bg-black bg-opacity-70 rounded-full p-3">
						<div class="text-white text-sm font-bold">N</div>
						<div class="text-orange-400 text-xs">{compassHeading}°</div>
					</div>
					
					<!-- Center Point -->
					<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<div class="w-6 h-6 border-2 border-orange-500 rounded-full bg-orange-500 bg-opacity-30"></div>
					</div>
				</div>
			</div>
			
			<!-- Camera Controls -->
			<div class="p-6 bg-black bg-opacity-80">
				<div class="text-center">
					<button 
						on:click={startVastuScan}
						class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 rounded-3xl text-xl font-bold shadow-2xl transform hover:scale-105 transition-all mb-3"
					>
						🔍 Analyze Space
					</button>
					<div class="text-gray-400 text-sm">
						Point at center • Hold steady • Capture all 16 zones
					</div>
				</div>
			</div>
		{:else}
			<!-- Camera Access Request -->
			<div class="flex-1 flex items-center justify-center p-6">
				<div class="text-center">
					<div class="text-6xl mb-6">📹</div>
					<h3 class="text-2xl font-bold text-white mb-4">Camera Access Required</h3>
					<p class="text-gray-400 mb-6">We need camera access to analyze your space using Vastu principles</p>
					<button 
						on:click={requestCameraAccess}
						class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-2xl font-bold"
					>
						Enable Camera
					</button>
					{#if cameraError}
						<div class="text-red-400 text-sm mt-4">{cameraError}</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
{/if}

{#if currentStep === 'capturing'}
	<!-- Full-Screen Analysis Progress -->
	<div class="absolute inset-0 flex flex-col items-center justify-center p-6">
		<div class="text-center">
			<h3 class="text-3xl font-bold text-white mb-8">Analyzing Your Sacred Space</h3>
			
			<!-- Large Progress Circle -->
			<div class="relative w-48 h-48 mx-auto mb-8">
				<svg class="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
					<path
						class="text-gray-600"
						stroke="currentColor"
						stroke-width="2"
						fill="none"
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
					<path
						class="text-orange-500"
						stroke="currentColor"
						stroke-width="2"
						fill="none"
						stroke-dasharray="{captureProgress}, 100"
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
				</svg>
				<div class="absolute inset-0 flex flex-col items-center justify-center">
					<span class="text-3xl font-bold text-white">{captureProgress}%</span>
					<span class="text-orange-400 text-sm">Complete</span>
				</div>
			</div>
			
			<!-- Analysis Steps -->
			<div class="space-y-2 text-gray-400">
				<div class="flex items-center justify-center">
					<div class="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
					<span>Detecting 16 Sacred Zones...</span>
				</div>
				<div class="flex items-center justify-center">
					<div class="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
					<span>Mapping 5 Elements Balance...</span>
				</div>
				<div class="flex items-center justify-center">
					<div class="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
					<span>Analyzing Directional Strength...</span>
				</div>
			</div>
		</div>
	</div>
{/if}

{#if currentStep === 'results'}
	<!-- Results Preview -->
	<div class="absolute inset-0 flex flex-col p-6">
		<div class="text-center mb-6">
			<h2 class="text-3xl font-bold text-white mb-2">Analysis Complete!</h2>
			<p class="text-gray-400">Your personalized Vastu report is ready</p>
		</div>
		
		<div class="flex-1 overflow-y-auto space-y-4">
			<!-- Sample Results Cards -->
			<div class="p-4 rounded-xl bg-green-900 bg-opacity-30 border border-green-500">
				<div class="flex items-center mb-2">
					<div class="text-green-400 mr-2">✓</div>
					<div class="text-white font-semibold">North-East Zone: Excellent</div>
				</div>
				<div class="text-gray-400 text-sm">Perfect for water element and spiritual practices</div>
			</div>
			
			<div class="p-4 rounded-xl bg-yellow-900 bg-opacity-30 border border-yellow-500">
				<div class="flex items-center mb-2">
					<div class="text-yellow-400 mr-2">⚠</div>
					<div class="text-white font-semibold">South-West Zone: Needs Attention</div>
				</div>
				<div class="text-gray-400 text-sm">Place heavy furniture here for stability</div>
			</div>
			
			<div class="p-4 rounded-xl bg-red-900 bg-opacity-30 border border-red-500">
				<div class="flex items-center mb-2">
					<div class="text-red-400 mr-2">✗</div>
					<div class="text-white font-semibold">Kitchen Placement: Critical</div>
				</div>
				<div class="text-gray-400 text-sm">Consider relocating to South-East zone</div>
			</div>
		</div>
		
		<div class="text-center mt-6">
			<button 
				on:click={resetAnalysis}
				class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 rounded-3xl text-lg font-bold shadow-2xl transform hover:scale-105 transition-all mb-4"
			>
				📄 View Full Report
			</button>
			<button 
				on:click={resetAnalysis}
				class="block w-full text-gray-400 text-sm hover:text-white transition-colors"
			>
				← Start New Analysis
			</button>
		</div>
	</div>
{/if}

</div>

