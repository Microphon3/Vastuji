<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let videoElement: HTMLVideoElement;
	let canvasElement: HTMLCanvasElement;
	let stream: MediaStream | null = null;
	let isRecording = false;
	let recordedBlobs: Blob[] = [];
	let mediaRecorder: MediaRecorder;
	let recordingTime = 0;
	let recordingInterval: number;
	let currentStep = 'options'; // options, camera, recording, upload, processing, complete
	let cameraError = '';
	let analysisProgress = 0;

	let uploadedFiles: FileList | null = null;
	let uploadType = '';

	onMount(() => {
		// Don't auto-request camera on mount anymore
	});

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
				cameraError = '';
			}
		} catch (error) {
			console.error('Camera access denied:', error);
			cameraError =
				'Camera access is required for space analysis. Please enable camera permissions.';
		}
	}

	function startRecording() {
		if (!stream) return;

		recordedBlobs = [];
		mediaRecorder = new MediaRecorder(stream);

		mediaRecorder.ondataavailable = (event) => {
			if (event.data && event.data.size > 0) {
				recordedBlobs.push(event.data);
			}
		};

		mediaRecorder.onstop = () => {
			processRecording();
		};

		mediaRecorder.start();
		isRecording = true;
		recordingTime = 0;
		currentStep = 'recording';

		recordingInterval = setInterval(() => {
			recordingTime += 1;
			if (recordingTime >= 30) {
				// Auto-stop after 30 seconds
				stopRecording();
			}
		}, 1000);
	}

	function stopRecording() {
		if (mediaRecorder && isRecording) {
			mediaRecorder.stop();
			isRecording = false;
			clearInterval(recordingInterval);
		}
	}

	function processRecording() {
		currentStep = 'processing';
		analysisProgress = 0;

		// Simulate AI processing
		const processingInterval = setInterval(() => {
			analysisProgress += 2;
			if (analysisProgress >= 100) {
				clearInterval(processingInterval);
				currentStep = 'complete';

				// Stop camera stream
				if (stream) {
					stream.getTracks().forEach((track) => track.stop());
					stream = null;
				}
			}
		}, 100);
	}

	function viewBasicReport() {
		goto('/report?type=basic');
	}

	function retakeVideo() {
		currentStep = 'options';
		recordingTime = 0;
		analysisProgress = 0;
		recordedBlobs = [];
		uploadedFiles = null;
		uploadType = '';
	}

	function selectScanOption(option: string) {
		if (option === 'camera') {
			currentStep = 'camera';
			requestCameraAccess();
		} else {
			currentStep = 'upload';
			uploadType = option;
		}
	}

	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		uploadedFiles = target.files;
		if (uploadedFiles && uploadedFiles.length > 0) {
			processUpload();
		}
	}

	function processUpload() {
		currentStep = 'processing';
		analysisProgress = 0;

		// Simulate processing of uploaded files
		const processingInterval = setInterval(() => {
			analysisProgress += 2;
			if (analysisProgress >= 100) {
				clearInterval(processingInterval);
				currentStep = 'complete';
			}
		}, 100);
	}
</script>

<svelte:head>
	<title>Space Scanner - VASTUJI</title>
</svelte:head>

<!-- Professional Analysis Interface -->
<div class="min-h-screen bg-white">
	{#if currentStep === 'options'}
		<!-- Analysis Options -->
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

						<button on:click={() => goto('/')} class="text-gray-400 hover:text-gray-600">
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
			</header>

			<!-- Main Content -->
			<main class="mx-auto max-w-4xl px-8 py-16">
				<div class="mb-12 text-center">
					<h1 class="mb-4 text-4xl font-bold text-gray-900">Choose Analysis Method</h1>
					<p class="text-xl text-gray-600">Select how you'd like to analyze your space</p>
				</div>

				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<!-- Live Camera Scan -->
					<button
						on:click={() => selectScanOption('camera')}
						class="group rounded-xl border-2 border-gray-200 bg-white p-8 text-center transition-all hover:border-amber-500 hover:bg-amber-50"
					>
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-100 transition-colors group-hover:bg-amber-200"
						>
							<svg
								class="h-8 w-8 text-amber-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h3 class="mb-2 font-semibold text-gray-900">Live Scan</h3>
						<p class="text-sm text-gray-600">Record a 360° video of your space in real-time</p>
					</button>

					<!-- Upload Video -->
					<button
						on:click={() => selectScanOption('video')}
						class="group rounded-xl border-2 border-gray-200 bg-white p-8 text-center transition-all hover:border-amber-500 hover:bg-amber-50"
					>
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 transition-colors group-hover:bg-blue-200"
						>
							<svg
								class="h-8 w-8 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
								/>
							</svg>
						</div>
						<h3 class="mb-2 font-semibold text-gray-900">Upload Video</h3>
						<p class="text-sm text-gray-600">Upload pre-recorded footage of your space</p>
					</button>

					<!-- Upload Blueprint -->
					<button
						on:click={() => selectScanOption('blueprint')}
						class="group rounded-xl border-2 border-gray-200 bg-white p-8 text-center transition-all hover:border-amber-500 hover:bg-amber-50"
					>
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 transition-colors group-hover:bg-green-200"
						>
							<svg
								class="h-8 w-8 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
						<h3 class="mb-2 font-semibold text-gray-900">Floor Plan</h3>
						<p class="text-sm text-gray-600">Upload architectural drawings or blueprints</p>
					</button>

					<!-- Upload Images -->
					<button
						on:click={() => selectScanOption('images')}
						class="group rounded-xl border-2 border-gray-200 bg-white p-8 text-center transition-all hover:border-amber-500 hover:bg-amber-50"
					>
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100 transition-colors group-hover:bg-purple-200"
						>
							<svg
								class="h-8 w-8 text-purple-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h3 class="mb-2 font-semibold text-gray-900">Photos</h3>
						<p class="text-sm text-gray-600">Upload multiple photos of different rooms</p>
					</button>
				</div>

				<!-- Info Section -->
				<div class="mt-16 rounded-xl border border-gray-200 bg-white p-8">
					<div class="mb-6 text-center">
						<h3 class="mb-2 text-lg font-semibold text-gray-900">Analysis Process</h3>
						<p class="text-gray-600">
							Our AI analyzes your space using traditional Vastu principles
						</p>
					</div>

					<div class="grid gap-6 text-center md:grid-cols-3">
						<div>
							<div
								class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"
							>
								<span class="font-bold text-amber-600">1</span>
							</div>
							<h4 class="mb-1 font-semibold text-gray-900">Capture</h4>
							<p class="text-sm text-gray-600">Record or upload your space data</p>
						</div>
						<div>
							<div
								class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"
							>
								<span class="font-bold text-amber-600">2</span>
							</div>
							<h4 class="mb-1 font-semibold text-gray-900">Analyze</h4>
							<p class="text-sm text-gray-600">AI processes using Vastu algorithms</p>
						</div>
						<div>
							<div
								class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"
							>
								<span class="font-bold text-amber-600">3</span>
							</div>
							<h4 class="mb-1 font-semibold text-gray-900">Report</h4>
							<p class="text-sm text-gray-600">Receive detailed insights and remedies</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	{/if}

	{#if currentStep === 'upload'}
		<!-- Upload Interface -->
		<div class="flex min-h-screen items-center justify-center bg-gray-50 p-8">
			<div class="w-full max-w-md">
				<div class="rounded-xl border border-gray-200 bg-white p-8 text-center">
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-100"
					>
						{#if uploadType === 'video'}
							<svg
								class="h-8 w-8 text-amber-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
								/>
							</svg>
						{:else if uploadType === 'blueprint'}
							<svg
								class="h-8 w-8 text-amber-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						{:else}
							<svg
								class="h-8 w-8 text-amber-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						{/if}
					</div>

					<h2 class="mb-2 text-2xl font-bold text-gray-900">
						Upload {uploadType === 'video'
							? 'Video'
							: uploadType === 'blueprint'
								? 'Floor Plan'
								: 'Photos'}
					</h2>
					<p class="mb-8 text-gray-600">
						{uploadType === 'video'
							? 'Select a video file of your space'
							: uploadType === 'blueprint'
								? 'Upload PDF or image files of your floor plan'
								: 'Select multiple photos of different rooms'}
					</p>

					<label class="block">
						<input
							type="file"
							class="hidden"
							multiple={uploadType === 'images'}
							accept={uploadType === 'video'
								? 'video/*'
								: uploadType === 'blueprint'
									? '.pdf,image/*'
									: 'image/*'}
							on:change={handleFileUpload}
						/>
						<div
							class="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 transition-all hover:border-amber-500 hover:bg-amber-50"
						>
							<svg
								class="mx-auto mb-4 h-12 w-12 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
								/>
							</svg>
							<p class="font-semibold text-gray-600">Click to upload files</p>
							<p class="text-sm text-gray-500">or drag and drop here</p>
						</div>
					</label>

					<button
						on:click={retakeVideo}
						class="mt-6 w-full rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
					>
						Back to Options
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if currentStep === 'camera'}
		<!-- Camera View -->
		<div class="relative flex h-screen flex-col">
			<!-- Header -->
			<header
				class="absolute top-0 right-0 left-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-6"
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-3">
						<div class="flex h-8 w-8 items-center justify-center rounded bg-white/20 backdrop-blur">
							<span class="text-sm font-bold text-white">V</span>
						</div>
						<div class="text-white">
							<div class="text-sm font-bold">VASTUJI</div>
							<div class="text-xs opacity-80">The Sacred Science of Space</div>
						</div>
					</div>

					<button on:click={() => goto('/')} class="text-white/80 hover:text-white">
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
			</header>

			<!-- Camera Feed -->
			<div class="relative flex-1 overflow-hidden bg-black">
				{#if cameraError}
					<div class="flex h-full items-center justify-center bg-gray-900 p-8 text-white">
						<div class="max-w-md text-center">
							<svg
								class="mx-auto mb-4 h-16 w-16 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
							<h3 class="mb-2 text-lg font-semibold">Camera Access Required</h3>
							<p class="mb-6 text-sm text-gray-300">{cameraError}</p>
							<button
								on:click={requestCameraAccess}
								class="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
							>
								Enable Camera
							</button>
						</div>
					</div>
				{:else}
					<video
						bind:this={videoElement}
						autoplay
						playsinline
						muted
						class="h-full w-full object-cover"
					></video>

					<!-- Scanning Guide Overlay -->
					<div class="pointer-events-none absolute inset-0">
						<!-- Grid Overlay -->
						<div class="absolute inset-4 grid grid-cols-3 grid-rows-3 gap-0 opacity-30">
							{#each Array(9) as _, i}
								<div class="border border-white/40"></div>
							{/each}
						</div>

						<!-- Center Focus -->
						<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
							<div
								class="h-32 w-32 animate-pulse rounded-full border-2 border-white opacity-60"
							></div>
						</div>

						<!-- Corner Guides -->
						<div
							class="absolute top-8 left-8 h-8 w-8 border-t-2 border-l-2 border-white opacity-80"
						></div>
						<div
							class="absolute top-8 right-8 h-8 w-8 border-t-2 border-r-2 border-white opacity-80"
						></div>
						<div
							class="absolute bottom-24 left-8 h-8 w-8 border-b-2 border-l-2 border-white opacity-80"
						></div>
						<div
							class="absolute right-8 bottom-24 h-8 w-8 border-r-2 border-b-2 border-white opacity-80"
						></div>
					</div>
				{/if}
			</div>

			<!-- Instructions & Controls -->
			<div
				class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6 pb-12"
			>
				<div class="mb-6 text-center text-white">
					<h2 class="mb-2 text-xl font-semibold">Scan Your Space</h2>
					<p class="text-sm opacity-90">
						Hold steady and slowly pan across your room. Capture all corners and key areas.
					</p>
				</div>

				<div class="flex items-center justify-center space-x-6">
					<button
						on:click={startRecording}
						disabled={!!cameraError}
						class="flex h-20 w-20 transform items-center justify-center rounded-full bg-amber-600 transition-all hover:scale-105 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if currentStep === 'recording'}
		<!-- Recording View -->
		<div class="relative flex h-screen flex-col">
			<video bind:this={videoElement} autoplay playsinline muted class="h-full w-full object-cover"
			></video>

			<!-- Recording Indicator -->
			<div class="absolute top-6 left-6 flex items-center space-x-2">
				<div class="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
				<span class="font-semibold text-white">Recording</span>
				<span class="text-white/80"
					>{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</span
				>
			</div>

			<!-- Stop Button -->
			<div class="absolute bottom-12 left-1/2 -translate-x-1/2 transform">
				<button
					on:click={stopRecording}
					class="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 transition-all hover:bg-red-700"
				>
					<div class="h-6 w-6 rounded-sm bg-white"></div>
				</button>
			</div>

			<!-- Progress Bar -->
			<div class="absolute right-8 bottom-32 left-8">
				<div class="h-1 rounded-full bg-white/20">
					<div
						class="h-1 rounded-full bg-white transition-all duration-1000"
						style="width: {(recordingTime / 30) * 100}%"
					></div>
				</div>
			</div>
		</div>
	{/if}

	{#if currentStep === 'processing'}
		<!-- Processing View -->
		<div class="flex h-screen flex-col items-center justify-center bg-gray-50 p-8">
			<div class="w-full max-w-md text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100"
				>
					<svg
						class="h-8 w-8 animate-spin text-amber-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
				</div>

				<h2 class="mb-2 text-2xl font-bold text-gray-900">Analyzing Your Space</h2>
				<p class="mb-8 text-gray-600">
					Our AI is processing your footage using advanced Vastu principles
				</p>

				<!-- Progress Circle -->
				<div class="relative mx-auto mb-6 h-32 w-32">
					<svg class="h-32 w-32 -rotate-90 transform" viewBox="0 0 36 36">
						<path
							class="text-gray-200"
							stroke="currentColor"
							stroke-width="3"
							fill="none"
							d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						/>
						<path
							class="text-amber-600"
							stroke="currentColor"
							stroke-width="3"
							fill="none"
							stroke-dasharray="{analysisProgress}, 100"
							d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						/>
					</svg>
					<div class="absolute inset-0 flex items-center justify-center">
						<span class="text-2xl font-bold text-gray-900">{analysisProgress}%</span>
					</div>
				</div>

				<div class="space-y-2 text-sm text-gray-600">
					<div class="flex items-center justify-center space-x-2">
						<div
							class="h-2 w-2 rounded-full bg-amber-600 {analysisProgress > 20
								? ''
								: 'animate-pulse'}"
						></div>
						<span>Detecting room boundaries</span>
					</div>
					<div class="flex items-center justify-center space-x-2">
						<div
							class="h-2 w-2 rounded-full bg-amber-600 {analysisProgress > 50 ? '' : 'opacity-30'}"
						></div>
						<span>Mapping directional zones</span>
					</div>
					<div class="flex items-center justify-center space-x-2">
						<div
							class="h-2 w-2 rounded-full bg-amber-600 {analysisProgress > 80 ? '' : 'opacity-30'}"
						></div>
						<span>Analyzing Vastu compliance</span>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if currentStep === 'complete'}
		<!-- Completion View -->
		<div class="flex h-screen flex-col items-center justify-center bg-gray-50 p-8">
			<div class="w-full max-w-md text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
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

				<h2 class="mb-2 text-2xl font-bold text-gray-900">Analysis Complete</h2>
				<p class="mb-8 text-gray-600">
					Your space has been analyzed using traditional Vastu principles
				</p>

				<div class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
					<div class="grid grid-cols-3 gap-4 text-center">
						<div>
							<div class="text-lg font-bold text-gray-900">12</div>
							<div class="text-sm text-gray-600">Issues Found</div>
						</div>
						<div>
							<div class="text-lg font-bold text-amber-600">68%</div>
							<div class="text-sm text-gray-600">Vastu Score</div>
						</div>
						<div>
							<div class="text-lg font-bold text-gray-900">8</div>
							<div class="text-sm text-gray-600">Remedies</div>
						</div>
					</div>
				</div>

				<div class="space-y-3">
					<button
						on:click={viewBasicReport}
						class="w-full rounded-lg bg-amber-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-amber-700"
					>
						View Basic Report
					</button>

					<button
						on:click={retakeVideo}
						class="w-full rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
					>
						Retake Video
					</button>
				</div>

				<p class="mt-4 text-xs text-gray-500">
					Complete your profile to unlock detailed analysis and personalized remedies
				</p>
			</div>
		</div>
	{/if}
</div>

<canvas bind:this={canvasElement} class="hidden"></canvas>
