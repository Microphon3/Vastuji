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
			excerpt: 'Understanding how traditional Vastu principles align with contemporary scientific research on space and energy.',
			readTime: '8 min read',
			category: 'fundamentals',
			image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop'
		},
		{
			title: 'Kitchen Placement: The Heart of Vastu Compliance', 
			excerpt: 'Why kitchen direction matters more than any other room and how to optimize for health and prosperity.',
			readTime: '6 min read',
			category: 'rooms',
			image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop'
		},
		{
			title: 'Common Vastu Mistakes in Modern Apartments',
			excerpt: 'Identifying and fixing the most frequent Vastu violations in contemporary urban living spaces.',
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
				
				<nav class="hidden md:flex items-center space-x-8 text-sm text-gray-600">
					<a href="/" class="hover:text-gray-900">Home</a>
					<span class="text-amber-600 font-medium">Knowledge</span>
					<a href="/scan" class="hover:text-gray-900">Analysis</a>
					<a href="#consultation" class="hover:text-gray-900">Consultation</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="bg-white py-16">
		<div class="max-w-7xl mx-auto px-8 text-center">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
				Vastu Knowledge Hub
			</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
				Master the ancient science of space with our comprehensive guides, 
				practical tips, and expert insights into traditional Vastu principles.
			</p>
			
			<!-- Search Bar -->
			<div class="max-w-lg mx-auto">
				<div class="relative">
					<input 
						type="text" 
						placeholder="Search topics, remedies, room types..."
						class="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 pl-12"
					/>
					<svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
					</svg>
				</div>
			</div>
		</div>
	</section>

	<!-- Featured Articles -->
	<section class="py-16">
		<div class="max-w-7xl mx-auto px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
				<p class="text-gray-600">Expert insights and practical guides</p>
			</div>
			
			<div class="grid md:grid-cols-3 gap-8">
				{#each featuredArticles as article}
					<article class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
						<div class="aspect-video bg-gray-100 relative overflow-hidden">
							<div class="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
								<svg class="w-16 h-16 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
								</svg>
							</div>
						</div>
						<div class="p-6">
							<div class="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-2">
								{article.category}
							</div>
							<h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
								{article.title}
							</h3>
							<p class="text-gray-600 text-sm mb-4 leading-relaxed">
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
	<section class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
				<p class="text-gray-600">Comprehensive guides organized by topic</p>
			</div>
			
			<div class="grid lg:grid-cols-2 gap-8">
				{#each knowledgeCategories as category, categoryIndex}
					<div class="bg-gray-50 rounded-xl p-8">
						<div class="mb-6">
							<h3 class="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
							<p class="text-gray-600">{category.description}</p>
						</div>
						
						<div class="space-y-3">
							{#each category.topics as topic}
								<button
									on:click={() => navigateToTopic(categoryIndex, topic.slug)}
									class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all group text-left"
								>
									<div class="flex-1">
										<div class="font-semibold text-gray-900 group-hover:text-amber-800">
											{topic.name}
										</div>
									</div>
									
									<div class="flex items-center space-x-2">
										<span class="text-xs px-2 py-1 rounded-full {
											topic.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
											topic.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
											'bg-red-100 text-red-800'
										}">
											{topic.difficulty}
										</span>
										
										<svg class="w-4 h-4 text-gray-400 group-hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
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
		<div class="max-w-7xl mx-auto px-8">
			<div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-12 text-center">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Daily Vastu Tips</h2>
				<p class="text-gray-600 mb-8 max-w-2xl mx-auto">
					Get practical, actionable Vastu tips delivered to your inbox. 
					Transform your space with simple daily practices.
				</p>
				
				<div class="max-w-md mx-auto flex">
					<input 
						type="email" 
						placeholder="Enter your email"
						class="flex-1 px-4 py-3 border border-amber-300 rounded-l-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
					/>
					<button class="bg-amber-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-amber-700 transition-colors">
						Subscribe
					</button>
				</div>
				
				<p class="text-xs text-gray-500 mt-3">
					Join 50,000+ subscribers • Unsubscribe anytime
				</p>
			</div>
		</div>
	</section>
</div>