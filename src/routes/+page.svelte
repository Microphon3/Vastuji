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
				(DeviceOrientationEvent as any).requestPermission().then((response: string) => {
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
			selectedGoals = selectedGoals.filter((g) => g !== goalId);
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
			stream.getTracks().forEach((track) => track.stop());
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
	<meta
		name="description"
		content="5000 वर्षीय ज्ञान के साथ आधुनिक तकनीक। वास्तु सिद्धांतों से अपनी संपत्ति का विश्लेषण करें, व्यक्तिगत उपाय प्राप्त करें।"
	/>
	<meta
		name="keywords"
		content="Vastu Shastra, वास्तु शास्त्र, Indian Architecture, Sacred Geometry, Home Design, Directional Analysis"
	/>
</svelte:head>

<!-- Professional Vastu Interface -->
<div class="min-h-screen bg-white">
	{#if currentStep === 'welcome'}
		<!-- Clean Professional Layout -->
		<div class="relative">
			<!-- Subtle Header -->
			<header class="border-b border-gray-100 px-8 py-6">
				<div class="mx-auto flex max-w-7xl items-center justify-between">
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
					<div class="hidden items-center space-x-8 text-sm text-gray-600 md:flex">
						<span class="cursor-pointer hover:text-gray-900">Analysis</span>
						<span class="cursor-pointer hover:text-gray-900">Remedies</span>
						<span class="cursor-pointer hover:text-gray-900">Consultation</span>
					</div>
				</div>
			</header>

			<!-- Main Content Area -->
			<main class="mx-auto max-w-7xl px-8 py-16">
				<div class="grid min-h-[80vh] items-center gap-16 lg:grid-cols-2">
					<!-- Left: Content -->
					<div class="space-y-8">
						<div class="space-y-6">
							<div
								class="inline-flex items-center space-x-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800"
							>
								<div class="h-2 w-2 rounded-full bg-amber-600"></div>
								<span>Instant Spatial Analysis</span>
							</div>

							<h1 class="text-5xl leading-tight font-bold text-gray-900 md:text-6xl">
								Transform spaces with
								<span class="text-amber-600">ancient wisdom</span>
							</h1>

							<p class="max-w-lg text-xl leading-relaxed text-gray-600">
								Professional Vastu analysis powered by computer vision. Get instant insights into
								your space's energy flow and receive expert remedies.
							</p>
						</div>

						<div class="flex flex-col gap-4 sm:flex-row">
							<a
								href="/scan"
								class="group inline-flex items-center justify-center rounded-lg bg-gray-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-gray-800"
							>
								<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
									></path>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
									></path>
								</svg>
								Scan Your Space
							</a>

							<button
								class="inline-flex items-center justify-center rounded-lg border-2 border-gray-200 px-8 py-4 font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
							>
								Learn More
							</button>
						</div>

						<!-- Trust Indicators -->
						<div class="grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
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
						<div
							class="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8"
						>
							<!-- Vastu Grid Visualization -->
							<div class="absolute inset-8 grid grid-cols-4 grid-rows-4 gap-1">
								{#each Array(16) as _, i}
									<div
										class="group relative flex cursor-pointer items-center justify-center rounded border border-gray-200 bg-white transition-colors hover:bg-amber-50"
									>
										<div class="font-mono text-xs text-gray-400">
											{i + 1}
										</div>
										<!-- Subtle direction indicators -->
										{#if i === 1 || i === 2}
											<div class="absolute top-1 right-1 h-1 w-1 rounded-full bg-blue-400"></div>
										{:else if i === 4 || i === 8}
											<div class="absolute top-1 right-1 h-1 w-1 rounded-full bg-green-400"></div>
										{:else if i === 6 || i === 7}
											<div class="absolute top-1 right-1 h-1 w-1 rounded-full bg-red-400"></div>
										{:else if i === 9 || i === 13}
											<div class="absolute top-1 right-1 h-1 w-1 rounded-full bg-amber-400"></div>
										{/if}
									</div>
								{/each}
							</div>

							<!-- Compass indicator -->
							<div class="absolute top-4 right-4 rounded-lg bg-white p-3 shadow-sm">
								<div class="relative h-8 w-8">
									<div class="absolute inset-0 rounded-full border border-gray-300"></div>
									<div
										class="absolute top-0 left-1/2 h-3 w-0.5 origin-bottom -translate-x-1/2 transform bg-red-500"
									></div>
									<div class="absolute top-1 left-1/2 -translate-x-1/2 transform">
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
			<div class="mb-8 text-center">
				<h2 class="mb-2 text-2xl font-bold text-white md:text-3xl">Select Property Type</h2>
				<p class="text-gray-400">Choose your space for personalized Vastu analysis</p>
			</div>

			<div class="flex-1 overflow-y-auto">
				<div class="mx-auto grid max-w-2xl gap-4">
					{#each propertyTypes as property}
						<button
							on:click={() => selectPropertyType(property.id)}
							class="flex transform items-center rounded-2xl border-2 border-gray-700 p-6 text-left transition-all hover:scale-105 hover:border-orange-500"
							style="background: rgba(255, 148, 32, 0.05);"
						>
							<div class="mr-4 text-4xl">{property.icon}</div>
							<div class="flex-1">
								<div class="mb-1 text-xl font-bold text-white">{property.name}</div>
								<div class="text-sm text-gray-400">{property.desc}</div>
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
			<div class="mb-8 text-center">
				<h2 class="mb-2 text-2xl font-bold text-white md:text-3xl">Select Your Goals</h2>
				<p class="text-gray-400">Choose what you want to improve (select multiple)</p>
			</div>

			<div class="mb-6 flex-1 overflow-y-auto">
				<div class="mx-auto grid max-w-2xl grid-cols-2 gap-4">
					{#each goalOptions as goal}
						<button
							on:click={() => toggleGoal(goal.id)}
							class="transform rounded-2xl border-2 p-6 text-center transition-all hover:scale-105"
							class:border-orange-500={selectedGoals.includes(goal.id)}
							class:border-gray-700={!selectedGoals.includes(goal.id)}
							style="background: {selectedGoals.includes(goal.id)
								? 'rgba(255, 148, 32, 0.15)'
								: 'rgba(255, 148, 32, 0.05)'};"
						>
							<div class="mb-3 text-3xl">{goal.icon}</div>
							<div class="text-sm font-semibold text-white">{goal.name}</div>
						</button>
					{/each}
				</div>
			</div>

			{#if selectedGoals.length > 0}
				<div class="text-center">
					<button
						on:click={proceedToCamera}
						class="transform rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-12 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105"
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
				<div class="relative flex-1 overflow-hidden">
					<video bind:this={videoElement} autoplay playsinline class="h-full w-full object-cover"
					></video>

					<!-- 16-Zone Vastu Grid Overlay -->
					<div class="pointer-events-none absolute inset-0">
						<!-- Grid Lines -->
						<div class="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0">
							{#each Array(16) as _, i}
								<div
									class="border-opacity-30 flex items-center justify-center border border-orange-500"
								>
									<span
										class="bg-opacity-50 rounded bg-black px-1 text-xs font-bold text-orange-300"
										>Z{i + 1}</span
									>
								</div>
							{/each}
						</div>

						<!-- Compass Indicator -->
						<div class="bg-opacity-70 absolute top-4 right-4 rounded-full bg-black p-3">
							<div class="text-sm font-bold text-white">N</div>
							<div class="text-xs text-orange-400">{compassHeading}°</div>
						</div>

						<!-- Center Point -->
						<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
							<div
								class="bg-opacity-30 h-6 w-6 rounded-full border-2 border-orange-500 bg-orange-500"
							></div>
						</div>
					</div>
				</div>

				<!-- Camera Controls -->
				<div class="bg-opacity-80 bg-black p-6">
					<div class="text-center">
						<button
							on:click={startVastuScan}
							class="mb-3 transform rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-12 py-4 text-xl font-bold text-white shadow-2xl transition-all hover:scale-105"
						>
							🔍 Analyze Space
						</button>
						<div class="text-sm text-gray-400">
							Point at center • Hold steady • Capture all 16 zones
						</div>
					</div>
				</div>
			{:else}
				<!-- Camera Access Request -->
				<div class="flex flex-1 items-center justify-center p-6">
					<div class="text-center">
						<div class="mb-6 text-6xl">📹</div>
						<h3 class="mb-4 text-2xl font-bold text-white">Camera Access Required</h3>
						<p class="mb-6 text-gray-400">
							We need camera access to analyze your space using Vastu principles
						</p>
						<button
							on:click={requestCameraAccess}
							class="rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 font-bold text-white"
						>
							Enable Camera
						</button>
						{#if cameraError}
							<div class="mt-4 text-sm text-red-400">{cameraError}</div>
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
				<h3 class="mb-8 text-3xl font-bold text-white">Analyzing Your Sacred Space</h3>

				<!-- Large Progress Circle -->
				<div class="relative mx-auto mb-8 h-48 w-48">
					<svg class="h-48 w-48 -rotate-90 transform" viewBox="0 0 36 36">
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
						<span class="text-sm text-orange-400">Complete</span>
					</div>
				</div>

				<!-- Analysis Steps -->
				<div class="space-y-2 text-gray-400">
					<div class="flex items-center justify-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
						<span>Detecting 16 Sacred Zones...</span>
					</div>
					<div class="flex items-center justify-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
						<span>Mapping 5 Elements Balance...</span>
					</div>
					<div class="flex items-center justify-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
						<span>Analyzing Directional Strength...</span>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if currentStep === 'results'}
		<!-- Results Preview -->
		<div class="absolute inset-0 flex flex-col p-6">
			<div class="mb-6 text-center">
				<h2 class="mb-2 text-3xl font-bold text-white">Analysis Complete!</h2>
				<p class="text-gray-400">Your personalized Vastu report is ready</p>
			</div>

			<div class="flex-1 space-y-4 overflow-y-auto">
				<!-- Sample Results Cards -->
				<div class="bg-opacity-30 rounded-xl border border-green-500 bg-green-900 p-4">
					<div class="mb-2 flex items-center">
						<div class="mr-2 text-green-400">✓</div>
						<div class="font-semibold text-white">North-East Zone: Excellent</div>
					</div>
					<div class="text-sm text-gray-400">Perfect for water element and spiritual practices</div>
				</div>

				<div class="bg-opacity-30 rounded-xl border border-yellow-500 bg-yellow-900 p-4">
					<div class="mb-2 flex items-center">
						<div class="mr-2 text-yellow-400">⚠</div>
						<div class="font-semibold text-white">South-West Zone: Needs Attention</div>
					</div>
					<div class="text-sm text-gray-400">Place heavy furniture here for stability</div>
				</div>

				<div class="bg-opacity-30 rounded-xl border border-red-500 bg-red-900 p-4">
					<div class="mb-2 flex items-center">
						<div class="mr-2 text-red-400">✗</div>
						<div class="font-semibold text-white">Kitchen Placement: Critical</div>
					</div>
					<div class="text-sm text-gray-400">Consider relocating to South-East zone</div>
				</div>
			</div>

			<div class="mt-6 text-center">
				<button
					on:click={resetAnalysis}
					class="mb-4 transform rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-12 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105"
				>
					📄 View Full Report
				</button>
				<button
					on:click={resetAnalysis}
					class="block w-full text-sm text-gray-400 transition-colors hover:text-white"
				>
					← Start New Analysis
				</button>
			</div>
		</div>
	{/if}
</div>
