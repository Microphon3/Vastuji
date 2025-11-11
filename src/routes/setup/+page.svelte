<script lang="ts">
	import { goto } from '$app/navigation';

	let currentStep = 1;
	let formData = {
		// Personal Information
		name: '',
		dob: '',
		tob: '',
		place: '',

		// Property Details
		propertyType: '',
		address: '',
		coordinates: null,
		floorPlan: null,
		facing: '',

		// Goals
		goals: []
	};

	const propertyTypes = [
		{ id: 'home', name: 'Home/Residence', desc: 'Single family homes, apartments' },
		{ id: 'office', name: 'Office Space', desc: 'Commercial workplaces, co-working' },
		{ id: 'shop', name: 'Retail/Shop', desc: 'Stores, showrooms, boutiques' },
		{ id: 'factory', name: 'Factory/Industrial', desc: 'Manufacturing, warehouses' },
		{ id: 'plot', name: 'Vacant Plot', desc: 'Land for future construction' },
		{ id: 'apartment', name: 'Apartment Complex', desc: 'Multi-unit residential building' }
	];

	const goalOptions = [
		{ id: 'wealth', name: 'Wealth & Prosperity', desc: 'Financial growth and abundance' },
		{ id: 'health', name: 'Health & Wellness', desc: 'Physical and mental well-being' },
		{ id: 'career', name: 'Career Growth', desc: 'Professional advancement' },
		{ id: 'marriage', name: 'Relationships', desc: 'Love, marriage, family harmony' },
		{ id: 'peace', name: 'Peace & Harmony', desc: 'Spiritual growth, tranquility' },
		{ id: 'business', name: 'Business Success', desc: 'Commercial growth and profits' }
	];

	function nextStep() {
		if (currentStep < 3) currentStep++;
	}

	function prevStep() {
		if (currentStep > 1) currentStep--;
	}

	function selectPropertyType(type: string) {
		formData.propertyType = type;
	}

	function toggleGoal(goalId: string) {
		if (formData.goals.includes(goalId)) {
			formData.goals = formData.goals.filter((g) => g !== goalId);
		} else {
			formData.goals = [...formData.goals, goalId];
		}
	}

	function completeSetup() {
		// Navigate to full report
		console.log('Setup complete:', formData);
		goto('/report?type=full');
	}
</script>

<svelte:head>
	<title>Property Setup - VASTUJI</title>
</svelte:head>

<!-- Professional Setup Interface -->
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

				<!-- Progress Indicator -->
				<div class="flex items-center space-x-2">
					<div class="flex items-center space-x-1">
						{#each Array(3) as _, i}
							<div
								class="h-1 w-8 rounded-full {i + 1 <= currentStep ? 'bg-amber-600' : 'bg-gray-200'}"
							></div>
						{/each}
					</div>
					<span class="ml-3 text-sm text-gray-500">Step {currentStep} of 3</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-4xl px-8 py-12">
		{#if currentStep === 1}
			<!-- Step 1: Personal Information -->
			<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<div class="mb-8">
					<h1 class="mb-2 text-3xl font-bold text-gray-900">Personal Information</h1>
					<p class="text-gray-600">Help us provide personalized Vastu recommendations</p>
				</div>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="space-y-6">
						<div>
							<label class="mb-2 block text-sm font-semibold text-gray-700">Full Name</label>
							<input
								bind:value={formData.name}
								type="text"
								class="w-full rounded-lg border border-gray-200 px-4 py-3 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
								placeholder="Enter your full name"
							/>
						</div>

						<div>
							<label class="mb-2 block text-sm font-semibold text-gray-700">Date of Birth</label>
							<input
								bind:value={formData.dob}
								type="date"
								class="w-full rounded-lg border border-gray-200 px-4 py-3 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
							/>
						</div>
					</div>

					<div class="space-y-6">
						<div>
							<label class="mb-2 block text-sm font-semibold text-gray-700">Time of Birth</label>
							<input
								bind:value={formData.tob}
								type="time"
								class="w-full rounded-lg border border-gray-200 px-4 py-3 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
							/>
							<p class="mt-1 text-xs text-gray-500">Optional: For astrology integration</p>
						</div>

						<div>
							<label class="mb-2 block text-sm font-semibold text-gray-700">Place of Birth</label>
							<input
								bind:value={formData.place}
								type="text"
								class="w-full rounded-lg border border-gray-200 px-4 py-3 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
								placeholder="City, Country"
							/>
						</div>
					</div>
				</div>

				<div class="mt-8 flex justify-end">
					<button
						on:click={nextStep}
						disabled={!formData.name}
						class="rounded-lg bg-gray-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Continue to Property Details
					</button>
				</div>
			</div>
		{/if}

		{#if currentStep === 2}
			<!-- Step 2: Property Details -->
			<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<div class="mb-8">
					<h1 class="mb-2 text-3xl font-bold text-gray-900">Property Information</h1>
					<p class="text-gray-600">Tell us about the space you want to analyze</p>
				</div>

				<!-- Property Type Selection -->
				<div class="mb-8">
					<label class="mb-4 block text-sm font-semibold text-gray-700">Property Type</label>
					<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each propertyTypes as property}
							<button
								on:click={() => selectPropertyType(property.id)}
								class="rounded-lg border-2 p-4 text-left transition-all hover:border-amber-200 hover:bg-amber-50 {formData.propertyType ===
								property.id
									? 'border-amber-500 bg-amber-50'
									: 'border-gray-200'}"
							>
								<div class="mb-1 font-semibold text-gray-900">{property.name}</div>
								<div class="text-sm text-gray-600">{property.desc}</div>
							</button>
						{/each}
					</div>
				</div>

				<!-- Address -->
				<div class="mb-6">
					<label class="mb-2 block text-sm font-semibold text-gray-700">Property Address</label>
					<textarea
						bind:value={formData.address}
						class="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
						rows="3"
						placeholder="Enter complete address including city, state, country"
					></textarea>
					<p class="mt-1 text-xs text-gray-500">This helps us align with geographic north</p>
				</div>

				<!-- Navigation -->
				<div class="mt-8 flex justify-between">
					<button
						on:click={prevStep}
						class="rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
					>
						Back
					</button>
					<button
						on:click={nextStep}
						disabled={!formData.propertyType || !formData.address}
						class="rounded-lg bg-gray-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Continue to Goals
					</button>
				</div>
			</div>
		{/if}

		{#if currentStep === 3}
			<!-- Step 3: Goals Selection -->
			<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<div class="mb-8">
					<h1 class="mb-2 text-3xl font-bold text-gray-900">Your Goals</h1>
					<p class="text-gray-600">
						Select what you want to improve through Vastu (choose multiple)
					</p>
				</div>

				<div class="mb-8 grid gap-4 md:grid-cols-2">
					{#each goalOptions as goal}
						<button
							on:click={() => toggleGoal(goal.id)}
							class="rounded-lg border-2 p-6 text-left transition-all hover:border-amber-200 hover:bg-amber-50 {formData.goals.includes(
								goal.id
							)
								? 'border-amber-500 bg-amber-50'
								: 'border-gray-200'}"
						>
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<div class="mb-2 font-semibold text-gray-900">{goal.name}</div>
									<div class="text-sm text-gray-600">{goal.desc}</div>
								</div>
								{#if formData.goals.includes(goal.id)}
									<svg class="mt-1 h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
								{/if}
							</div>
						</button>
					{/each}
				</div>

				<!-- Navigation -->
				<div class="flex justify-between">
					<button
						on:click={prevStep}
						class="rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
					>
						Back
					</button>
					<button
						on:click={completeSetup}
						disabled={formData.goals.length === 0}
						class="rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Start Vastu Analysis
					</button>
				</div>
			</div>
		{/if}
	</main>
</div>
