<script lang="ts">
	import { goto } from '$app/navigation';

	const knowledgeCategories = [
		{
			title: 'Vastu Fundamentals',
			description: 'Core principles of Vastu Shastra',
			topics: [
				{ name: 'Introduction to Vastu', slug: 'introduction', difficulty: 'beginner' },
				{ name: '16 Zone Attributes', slug: '16-zones', difficulty: 'intermediate' },
				{ name: '8 Direction Analysis', slug: '8-directions', difficulty: 'beginner' },
				{ name: '45 Devta System', slug: '45-devta', difficulty: 'advanced' },
				{ name: 'How Vastu Works', slug: 'how-it-works', difficulty: 'beginner' }
			]
		},
		{
			title: 'Property Selection',
			description: 'Choosing the right space',
			topics: [
				{ name: 'Plot Selection Guide', slug: 'plot-selection', difficulty: 'intermediate' },
				{ name: 'Flat Selection Criteria', slug: 'flat-selection', difficulty: 'intermediate' },
				{ name: 'Commercial Property Tips', slug: 'commercial-selection', difficulty: 'advanced' }
			]
		},
		{
			title: 'Room-Specific Vastu',
			description: 'Guidelines for each space',
			topics: [
				{ name: 'Kitchen Vastu', slug: 'kitchen', difficulty: 'intermediate' },
				{ name: 'Bedroom Guidelines', slug: 'bedroom', difficulty: 'beginner' },
				{ name: 'Bathroom & Toilet', slug: 'bathroom', difficulty: 'beginner' },
				{ name: 'Home Temple/Pooja', slug: 'temple', difficulty: 'intermediate' },
				{ name: 'Study Room', slug: 'study-room', difficulty: 'beginner' },
				{ name: 'Living Room', slug: 'living-room', difficulty: 'beginner' }
			]
		},
		{
			title: 'Elements & Remedies',
			description: 'Balancing and correction techniques',
			topics: [
				{ name: '5 Elements Balance', slug: '5-elements', difficulty: 'intermediate' },
				{ name: 'Color Therapy', slug: 'colors', difficulty: 'beginner' },
				{ name: 'Yantra & Symbols', slug: 'yantras', difficulty: 'advanced' },
				{ name: 'Plants & Vastu', slug: 'plants', difficulty: 'beginner' },
				{ name: 'Crystal Healing', slug: 'crystals', difficulty: 'intermediate' }
			]
		}
	];

	const featuredArticles = [
		{
			title: 'The Science Behind Vastu: Ancient Wisdom Meets Modern Physics',
			excerpt:
				'Understanding how traditional Vastu principles align with contemporary scientific research on space and energy.',
			readTime: '8 min read',
			category: 'fundamentals',
			image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop'
		},
		{
			title: 'Kitchen Placement: The Heart of Vastu Compliance',
			excerpt:
				'Why kitchen direction matters more than any other room and how to optimize for health and prosperity.',
			readTime: '6 min read',
			category: 'rooms',
			image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop'
		},
		{
			title: 'Common Vastu Mistakes in Modern Apartments',
			excerpt:
				'Identifying and fixing the most frequent Vastu violations in contemporary urban living spaces.',
			readTime: '10 min read',
			category: 'selection',
			image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=200&fit=crop'
		}
	];

	function navigateToTopic(categoryIndex: number, topicSlug: string) {
		goto(`/knowledge/${categoryIndex}/${topicSlug}`);
	}
</script>

<svelte:head>
	<title>Vastu Knowledge Hub - VASTUJI</title>
</svelte:head>

<!-- Knowledge Hub -->
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
					<span class="font-medium text-amber-600">Knowledge</span>
					<a href="/scan" class="hover:text-gray-900">Analysis</a>
					<a href="#consultation" class="hover:text-gray-900">Consultation</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="bg-white py-16">
		<div class="mx-auto max-w-7xl px-8 text-center">
			<h1 class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Vastu Knowledge Hub</h1>
			<p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
				Master the ancient science of space with our comprehensive guides, practical tips, and
				expert insights into traditional Vastu principles.
			</p>

			<!-- Search Bar -->
			<div class="mx-auto max-w-lg">
				<div class="relative">
					<input
						type="text"
						placeholder="Search topics, remedies, room types..."
						class="w-full rounded-xl border border-gray-200 px-6 py-4 pl-12 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
					/>
					<svg
						class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
			</div>
		</div>
	</section>

	<!-- Featured Articles -->
	<section class="py-16">
		<div class="mx-auto max-w-7xl px-8">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900">Featured Articles</h2>
				<p class="text-gray-600">Expert insights and practical guides</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				{#each featuredArticles as article}
					<article
						class="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
					>
						<div class="relative aspect-video overflow-hidden bg-gray-100">
							<div
								class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100"
							>
								<svg
									class="h-16 w-16 text-amber-300"
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
						</div>
						<div class="p-6">
							<div class="mb-2 text-xs font-semibold tracking-wide text-amber-600 uppercase">
								{article.category}
							</div>
							<h3
								class="mb-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-amber-600"
							>
								{article.title}
							</h3>
							<p class="mb-4 text-sm leading-relaxed text-gray-600">
								{article.excerpt}
							</p>
							<div class="text-xs text-gray-500">
								{article.readTime}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Knowledge Categories -->
	<section class="bg-white py-16">
		<div class="mx-auto max-w-7xl px-8">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900">Browse by Category</h2>
				<p class="text-gray-600">Comprehensive guides organized by topic</p>
			</div>

			<div class="grid gap-8 lg:grid-cols-2">
				{#each knowledgeCategories as category, categoryIndex}
					<div class="rounded-xl bg-gray-50 p-8">
						<div class="mb-6">
							<h3 class="mb-2 text-2xl font-bold text-gray-900">{category.title}</h3>
							<p class="text-gray-600">{category.description}</p>
						</div>

						<div class="space-y-3">
							{#each category.topics as topic}
								<button
									on:click={() => navigateToTopic(categoryIndex, topic.slug)}
									class="group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-amber-500 hover:bg-amber-50"
								>
									<div class="flex-1">
										<div class="font-semibold text-gray-900 group-hover:text-amber-800">
											{topic.name}
										</div>
									</div>

									<div class="flex items-center space-x-2">
										<span
											class="rounded-full px-2 py-1 text-xs {topic.difficulty === 'beginner'
												? 'bg-green-100 text-green-800'
												: topic.difficulty === 'intermediate'
													? 'bg-yellow-100 text-yellow-800'
													: 'bg-red-100 text-red-800'}"
										>
											{topic.difficulty}
										</span>

										<svg
											class="h-4 w-4 text-gray-400 group-hover:text-amber-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</div>
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Quick Tips -->
	<section class="py-16">
		<div class="mx-auto max-w-7xl px-8">
			<div
				class="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-12 text-center"
			>
				<h2 class="mb-4 text-3xl font-bold text-gray-900">Daily Vastu Tips</h2>
				<p class="mx-auto mb-8 max-w-2xl text-gray-600">
					Get practical, actionable Vastu tips delivered to your inbox. Transform your space with
					simple daily practices.
				</p>

				<div class="mx-auto flex max-w-md">
					<input
						type="email"
						placeholder="Enter your email"
						class="flex-1 rounded-l-lg border border-amber-300 px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
					/>
					<button
						class="rounded-r-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
					>
						Subscribe
					</button>
				</div>

				<p class="mt-3 text-xs text-gray-500">Join 50,000+ subscribers • Unsubscribe anytime</p>
			</div>
		</div>
	</section>
</div>
