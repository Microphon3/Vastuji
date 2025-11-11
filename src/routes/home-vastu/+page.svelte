<script lang="ts">
	import { goto } from '$app/navigation';

	const roomGuidelines = [
		{
			room: 'Main Entrance',
			zone: 'North, East, or North-East',
			importance: 'critical',
			guidelines: [
				'Should open inwards and be wider than other doors',
				'Keep well-lit and welcoming with plants or rangoli',
				'Avoid placing shoe racks directly in front',
				'Use solid wood door for positive energy flow'
			],
			colors: ['White', 'Light Yellow', 'Natural Wood'],
			direction: 'Face North or East when entering',
			vastu_score: 85
		},
		{
			room: 'Kitchen',
			zone: 'South-East (Agni)',
			importance: 'critical',
			guidelines: [
				'Stove should be placed in South-East corner',
				'Cook facing East for health and prosperity',
				'Keep water sources (sink) away from stove',
				'Maintain cleanliness and good ventilation'
			],
			colors: ['Red', 'Orange', 'Yellow', 'Pink'],
			direction: 'Cook facing East',
			vastu_score: 78
		},
		{
			room: 'Master Bedroom',
			zone: 'South-West (Strength)',
			importance: 'high',
			guidelines: [
				'Bed should be in South or West wall',
				'Sleep with head towards South or East',
				'Avoid mirrors facing the bed',
				'Keep room clutter-free and well-ventilated'
			],
			colors: ['Beige', 'Light Pink', 'Cream', 'Light Yellow'],
			direction: 'Head South/East while sleeping',
			vastu_score: 92
		},
		{
			room: 'Living Room',
			zone: 'North-East (Water)',
			importance: 'medium',
			guidelines: [
				'Place heavy furniture in South and West',
				'Keep North-East corner light and open',
				'Face North or East while sitting',
				'Use bright colors and good lighting'
			],
			colors: ['White', 'Light Blue', 'Green', 'Yellow'],
			direction: 'Face North or East when seated',
			vastu_score: 72
		},
		{
			room: 'Bathroom & Toilet',
			zone: 'North-West or South-East',
			importance: 'medium',
			guidelines: [
				'Never place in North-East (Brahma corner)',
				'Keep doors closed always',
				'Ensure proper drainage towards North or East',
				'Maintain cleanliness and ventilation'
			],
			colors: ['White', 'Light Blue', 'Pastels'],
			direction: 'Face North or East when using',
			vastu_score: 65
		},
		{
			room: 'Home Temple/Pooja',
			zone: 'North-East (Ishaan)',
			importance: 'high',
			guidelines: [
				'Place idols facing West (you face East)',
				'Keep area clean and well-lit',
				'Use marble or wood for the altar',
				'Avoid placing under staircase or in bedroom'
			],
			colors: ['White', 'Light Yellow', 'Saffron'],
			direction: 'Face East while praying',
			vastu_score: 88
		},
		{
			room: 'Study Room',
			zone: 'North or East',
			importance: 'medium',
			guidelines: [
				'Study table in North or East',
				'Face North or East while studying',
				'Keep books in North-East corner',
				'Ensure good natural lighting'
			],
			colors: ['Light Green', 'White', 'Light Yellow'],
			direction: 'Face North or East while studying',
			vastu_score: 76
		},
		{
			room: 'Staircase',
			zone: 'South, West, or South-West',
			importance: 'medium',
			guidelines: [
				'Should turn clockwise when going up',
				'Number of steps should be odd',
				'Avoid spiral or central staircases',
				'Keep well-lit and clutter-free'
			],
			colors: ['Neutral tones', 'Light colors'],
			direction: 'Turn right when ascending',
			vastu_score: 70
		}
	];

	const commonIssues = [
		{
			issue: 'Kitchen in Wrong Direction',
			impact: 'Health problems, financial stress, family disputes',
			solution: 'Relocate to South-East or use red/orange colors, place clay pots',
			urgency: 'high'
		},
		{
			issue: 'Main Door in South-West',
			impact: 'Career obstacles, financial losses, health issues',
			solution: 'Cannot relocate - use bright lighting, keep door heavy, place pyramid',
			urgency: 'high'
		},
		{
			issue: 'Bedroom in North-East',
			impact: 'Disturbed sleep, relationship issues, mental stress',
			solution: 'Relocate or use heavy furniture in South-West corner',
			urgency: 'medium'
		},
		{
			issue: 'Toilet in North-East',
			impact: 'Blocks prosperity, creates negativity, health problems',
			solution: 'Keep door closed, place heavy object above ceiling, regular cleaning',
			urgency: 'critical'
		},
		{
			issue: 'Central Courtyard Covered',
			impact: 'Blocked energy flow, family disputes, lack of prosperity',
			solution: 'Create skylight or keep area light with mirrors and plants',
			urgency: 'medium'
		},
		{
			issue: 'Water Tank in South-West',
			impact: 'Financial instability, relationship problems, mental stress',
			solution: 'Relocate to North or North-East, if not possible use vastu remedies',
			urgency: 'high'
		}
	];

	const seasonalTips = [
		{
			season: 'Summer (Apr-Jun)',
			tips: [
				'Keep North and East windows open for cool breeze',
				'Use light colors and cotton fabrics',
				'Place water fountain in North-East',
				'Avoid heavy colors in bedrooms'
			]
		},
		{
			season: 'Monsoon (Jul-Sep)',
			tips: [
				'Ensure proper drainage from North-East to South-West',
				'Keep house dry and well-ventilated',
				'Use bright lights to counter dampness',
				'Place tulsi plant in North-East'
			]
		},
		{
			season: 'Winter (Oct-Mar)',
			tips: [
				'Allow maximum sunlight from East and South',
				'Use warm colors like red and orange',
				'Keep South-West area warm with carpets',
				'Place heavier furniture in South and West'
			]
		}
	];
</script>

<svelte:head>
	<title>Home Vastu Guide - VASTUJI</title>
</svelte:head>

<!-- Home Vastu Comprehensive Guide -->
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

				<nav class="hidden items-center space-x-8 text-sm text-gray-600 md:flex">
					<a href="/" class="hover:text-gray-900">Home</a>
					<a href="/knowledge" class="hover:text-gray-900">Knowledge</a>
					<span class="font-medium text-amber-600">Home Vastu</span>
					<a href="/scan" class="hover:text-gray-900">Analysis</a>
					<a href="/consultation" class="hover:text-gray-900">Consultation</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
		<div class="mx-auto max-w-7xl px-8">
			<div class="mb-12 text-center">
				<h1 class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Complete Home Vastu Guide</h1>
				<p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
					Transform your home into a harmonious sanctuary with traditional Vastu principles.
					Room-by-room guidelines for optimal energy flow and family prosperity.
				</p>

				<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<button
						on:click={() => goto('/scan')}
						class="rounded-xl bg-amber-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-amber-700"
					>
						Analyze My Home
					</button>
					<button
						on:click={() => goto('/consultation')}
						class="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
					>
						Expert Consultation
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Room Guidelines Section -->
	<section class="py-16">
		<div class="mx-auto max-w-7xl px-8">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900">Room-by-Room Vastu Guidelines</h2>
				<p class="text-gray-600">Detailed directions for each area of your home</p>
			</div>

			<div class="space-y-8">
				{#each roomGuidelines as room}
					<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
						<div class="p-8">
							<div class="mb-6 flex items-start justify-between">
								<div>
									<h3 class="mb-2 text-2xl font-bold text-gray-900">{room.room}</h3>
									<div class="mb-3 flex items-center space-x-4">
										<span class="font-medium text-amber-700">Ideal Zone: {room.zone}</span>
										<span
											class="rounded-full px-2 py-1 text-xs font-medium {room.importance ===
											'critical'
												? 'bg-red-100 text-red-800'
												: room.importance === 'high'
													? 'bg-orange-100 text-orange-800'
													: 'bg-yellow-100 text-yellow-800'}"
										>
											{room.importance} importance
										</span>
									</div>
								</div>
								<div class="text-right">
									<div
										class="text-3xl font-bold {room.vastu_score >= 85
											? 'text-green-600'
											: room.vastu_score >= 70
												? 'text-yellow-600'
												: 'text-red-600'}"
									>
										{room.vastu_score}/100
									</div>
									<div class="text-sm text-gray-500">Vastu Score</div>
								</div>
							</div>

							<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
								<!-- Guidelines -->
								<div class="lg:col-span-2">
									<h4 class="mb-3 font-semibold text-gray-900">Key Guidelines</h4>
									<ul class="space-y-2">
										{#each room.guidelines as guideline}
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
												<span class="text-sm text-gray-700">{guideline}</span>
											</li>
										{/each}
									</ul>
								</div>

								<!-- Colors & Direction -->
								<div>
									<h4 class="mb-3 font-semibold text-gray-900">Ideal Colors</h4>
									<div class="mb-4 flex flex-wrap gap-2">
										{#each room.colors as color}
											<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
												>{color}</span
											>
										{/each}
									</div>

									<h4 class="mb-2 font-semibold text-gray-900">Direction</h4>
									<p class="text-sm text-gray-600">{room.direction}</p>
								</div>

								<!-- Visual Indicator -->
								<div class="flex items-center justify-center">
									<div
										class="flex h-24 w-24 items-center justify-center rounded-lg border-4 border-gray-200 bg-gradient-to-br {room.importance ===
										'critical'
											? 'border-red-200 from-red-50 to-red-100'
											: room.importance === 'high'
												? 'border-orange-200 from-orange-50 to-orange-100'
												: 'border-yellow-200 from-yellow-50 to-yellow-100'}"
									>
										<div class="text-2xl">🏠</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Common Issues Section -->
	<section class="bg-white py-16">
		<div class="mx-auto max-w-7xl px-8">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900">Common Home Vastu Issues</h2>
				<p class="text-gray-600">Identify and resolve typical problems in modern homes</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each commonIssues as issue}
					<div class="rounded-xl bg-gray-50 p-6">
						<div class="mb-4 flex items-start justify-between">
							<h3 class="text-lg font-bold text-gray-900">{issue.issue}</h3>
							<span
								class="rounded-full px-2 py-1 text-xs font-medium {issue.urgency === 'critical'
									? 'bg-red-100 text-red-800'
									: issue.urgency === 'high'
										? 'bg-orange-100 text-orange-800'
										: 'bg-yellow-100 text-yellow-800'}"
							>
								{issue.urgency}
							</span>
						</div>

						<div class="space-y-3">
							<div>
								<h4 class="mb-1 text-sm font-semibold text-gray-700">Impact:</h4>
								<p class="text-sm text-gray-600">{issue.impact}</p>
							</div>

							<div>
								<h4 class="mb-1 text-sm font-semibold text-gray-700">Solution:</h4>
								<p class="text-sm text-gray-600">{issue.solution}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Seasonal Tips -->
	<section class="py-16">
		<div class="mx-auto max-w-7xl px-8">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900">Seasonal Vastu Tips</h2>
				<p class="text-gray-600">Align your home with natural seasonal energies</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				{#each seasonalTips as season}
					<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
						<h3 class="mb-4 text-xl font-bold text-gray-900">{season.season}</h3>
						<ul class="space-y-2">
							{#each season.tips as tip}
								<li class="flex items-start">
									<svg
										class="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-amber-500"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414z"
											clip-rule="evenodd"
										/>
									</svg>
									<span class="text-sm text-gray-700">{tip}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Quick Assessment -->
	<section class="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
		<div class="mx-auto max-w-4xl px-8 text-center">
			<div class="rounded-2xl border border-amber-200 bg-white p-12 shadow-sm">
				<h2 class="mb-6 text-3xl font-bold text-gray-900">Get Your Home Vastu Assessment</h2>
				<p class="mx-auto mb-8 max-w-2xl text-gray-600">
					Our experts can analyze your home layout and provide personalized recommendations based on
					traditional Vastu principles and modern living needs.
				</p>

				<div class="mb-8 grid gap-6 md:grid-cols-3">
					<div class="text-center">
						<div
							class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100"
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
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h3 class="mb-1 font-bold text-gray-900">Instant Analysis</h3>
						<p class="text-sm text-gray-600">AI-powered scanning in minutes</p>
					</div>

					<div class="text-center">
						<div
							class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100"
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
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								/>
							</svg>
						</div>
						<h3 class="mb-1 font-bold text-gray-900">Expert Guidance</h3>
						<p class="text-sm text-gray-600">Certified Vastu consultants</p>
					</div>

					<div class="text-center">
						<div
							class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100"
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
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<h3 class="mb-1 font-bold text-gray-900">Practical Solutions</h3>
						<p class="text-sm text-gray-600">Actionable remedies and tips</p>
					</div>
				</div>

				<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<button
						on:click={() => goto('/scan')}
						class="rounded-xl bg-amber-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-amber-700"
					>
						Start Free Analysis
					</button>
					<button
						on:click={() => goto('/consultation')}
						class="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
					>
						Book Expert Consultation
					</button>
				</div>
			</div>
		</div>
	</section>
</div>
