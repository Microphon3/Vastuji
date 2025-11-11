<script lang="ts">
	import { goto } from '$app/navigation';
	
	const officeZones = [
		{
			zone: 'North-East (Ishaan)',
			element: 'Water',
			purpose: 'Reception, Water Features, Entrance',
			benefits: 'Prosperity, positive energy, good relationships',
			guidelines: [
				'Ideal for main entrance and reception area',
				'Place water fountain or aquarium',
				'Keep this area light and clutter-free',
				'Use white, light blue, or light green colors'
			],
			avoid: ['Heavy furniture', 'Storage rooms', 'Toilets'],
			colors: ['White', 'Light Blue', 'Light Green'],
			score: 95
		},
		{
			zone: 'North (Kubera)',
			element: 'Mercury',
			purpose: 'Cash Counter, Finance Department, Lockers',
			benefits: 'Financial growth, business prosperity, wealth attraction',
			guidelines: [
				'Perfect for accounts and finance department',
				'Place cash counter facing North',
				'Keep important documents here',
				'Ensure good lighting and ventilation'
			],
			avoid: ['Toilets', 'Heavy machinery', 'Storage of waste'],
			colors: ['Green', 'White', 'Light Yellow'],
			score: 92
		},
		{
			zone: 'East (Indra)',
			element: 'Sun',
			purpose: 'CEO/Owner Cabin, Meeting Rooms',
			benefits: 'Leadership, authority, decision-making power',
			guidelines: [
				'Ideal for senior management cabins',
				'Face East while working for success',
				'Place fresh flowers daily',
				'Ensure maximum morning sunlight'
			],
			avoid: ['Storage rooms', 'Pantry', 'Heavy equipment'],
			colors: ['Light Orange', 'White', 'Light Yellow'],
			score: 88
		},
		{
			zone: 'South-East (Agni)',
			element: 'Fire',
			purpose: 'Pantry, Electrical Room, Server Room',
			benefits: 'Energy, productivity, operational efficiency',
			guidelines: [
				'Perfect for pantry and kitchen area',
				'Place all electrical equipment here',
				'Server rooms and technical equipment',
				'Maintain high energy levels'
			],
			avoid: ['Water features', 'Cash counter', 'Reception'],
			colors: ['Red', 'Orange', 'Pink'],
			score: 85
		},
		{
			zone: 'South (Yama)',
			element: 'Mars',
			purpose: 'Marketing, Sales, Customer Relations',
			benefits: 'Business growth, customer acquisition, fame',
			guidelines: [
				'Ideal for sales and marketing teams',
				'Place promotional materials and awards',
				'Customer service department',
				'High activity and interaction zones'
			],
			avoid: ['Main entrance', 'Water features', 'Owner cabin'],
			colors: ['Red', 'Coral', 'Pink'],
			score: 78
		},
		{
			zone: 'South-West (Nirriti)',
			element: 'Rahu',
			purpose: 'Owner\'s Cabin, Heavy Storage, Strong Room',
			benefits: 'Stability, authority, security, grounding',
			guidelines: [
				'Best for owner\'s main cabin',
				'Heavy furniture and storage',
				'Strong room and valuables',
				'Sit facing North or East'
			],
			avoid: ['Main entrance', 'Reception', 'Water features'],
			colors: ['Brown', 'Maroon', 'Dark Yellow'],
			score: 90
		},
		{
			zone: 'West (Varun)',
			element: 'Saturn',
			purpose: 'Conference Rooms, Storage, Archives',
			benefits: 'Stability, long-term planning, systematic growth',
			guidelines: [
				'Conference rooms and board meetings',
				'Document storage and archives',
				'Planning and strategy departments',
				'Ensure proper lighting'
			],
			avoid: ['Main entrance', 'Water features', 'Pantry'],
			colors: ['Blue', 'Grey', 'White'],
			score: 82
		},
		{
			zone: 'North-West (Vayu)',
			element: 'Air',
			purpose: 'Guest Rooms, Waiting Area, Toilets',
			benefits: 'Movement, change, networking, communication',
			guidelines: [
				'Guest rooms and temporary stays',
				'Waiting areas and lobbies',
				'Toilet and washroom facilities',
				'Areas with high movement'
			],
			avoid: ['Important meetings', 'Cash storage', 'Owner cabin'],
			colors: ['White', 'Cream', 'Light Blue'],
			score: 75
		}
	];

	const workspaceGuidelines = [
		{
			area: 'CEO/Owner Desk',
			position: 'South-West corner facing North/East',
			importance: 'Critical',
			tips: [
				'Solid wall behind chair for support',
				'Face North or East while working',
				'Keep desk clutter-free and organized',
				'Place a small plant or crystal for positive energy'
			],
			colors: ['Dark wood', 'Brown', 'Maroon'],
			score: 95
		},
		{
			area: 'Employee Workstations',
			position: 'East and North sides of office',
			importance: 'High',
			tips: [
				'Face North or East while working',
				'Ensure adequate natural lighting',
				'Keep gangways clear in North-East',
				'Avoid sitting directly under beams'
			],
			colors: ['Light colors', 'White', 'Cream'],
			score: 85
		},
		{
			area: 'Reception Area',
			position: 'North-East entrance',
			importance: 'High',
			tips: [
				'Receptionist should face North or East',
				'Keep area well-lit and welcoming',
				'Place company logo in South or West wall',
				'Fresh flowers and plants enhance energy'
			],
			colors: ['White', 'Light Blue', 'Yellow'],
			score: 88
		},
		{
			area: 'Conference Room',
			position: 'West or North-West',
			importance: 'Medium',
			tips: [
				'Rectangular or square table preferred',
				'Head of table in South-West position',
				'Adequate ventilation and lighting',
				'Avoid mirrors facing the table'
			],
			colors: ['Neutral tones', 'Light Brown'],
			score: 80
		},
		{
			area: 'Storage Areas',
			position: 'South and West walls',
			importance: 'Medium',
			tips: [
				'Heavy storage in South-West',
				'Keep North-East area light',
				'Organized and clutter-free',
				'Regular cleaning and maintenance'
			],
			colors: ['Dark colors acceptable'],
			score: 75
		}
	];

	const businessTypes = [
		{
			type: 'Corporate Office',
			specialFocus: 'Hierarchy and systematic operations',
			keyTips: [
				'CEO in South-West, facing North',
				'Finance department in North',
				'HR in East for positive relations',
				'Reception in North-East for growth'
			],
			priority: 'Authority and structure'
		},
		{
			type: 'Startup/Creative Agency',
			specialFocus: 'Innovation and collaborative energy',
			keyTips: [
				'Open workspace in East for creativity',
				'Brainstorming area in North-East',
				'Flexible seating arrangements',
				'Abundant natural light and plants'
			],
			priority: 'Energy and innovation'
		},
		{
			type: 'Retail Store',
			specialFocus: 'Customer flow and sales optimization',
			keyTips: [
				'Entrance in North-East for prosperity',
				'Cash counter in North facing East',
				'Display areas in East and North',
				'Storage in South and West'
			],
			priority: 'Sales and customer attraction'
		},
		{
			type: 'Medical/Healthcare',
			specialFocus: 'Healing energy and patient comfort',
			keyTips: [
				'Waiting area in North-East',
				'Doctor chamber in South-West',
				'Treatment rooms in East',
				'Medicine storage in South'
			],
			priority: 'Healing and positive energy'
		}
	];

	const commonOfficeIssues = [
		{
			issue: 'Boss sitting in North-East',
			problems: 'Lack of authority, frequent changes in decisions, instability',
			solution: 'Relocate to South-West corner, face North or East while working',
			urgency: 'High',
			cost: 'Low'
		},
		{
			issue: 'Main entrance in South-West',
			problems: 'Business struggles, employee issues, financial problems',
			solution: 'Cannot change - use bright lighting, keep door heavy, place Ganesha symbol',
			urgency: 'High',
			cost: 'Low'
		},
		{
			issue: 'Toilet in North-East',
			problems: 'Blocks prosperity, negative energy, business obstacles',
			solution: 'Keep door closed, place exhaust fan, regular cleaning, heavy object above',
			urgency: 'Critical',
			cost: 'Medium'
		},
		{
			issue: 'Cash counter facing South',
			problems: 'Money outflow, payment delays, financial losses',
			solution: 'Relocate to North zone facing East, or use mirrors to reflect North',
			urgency: 'High',
			cost: 'Medium'
		},
		{
			issue: 'Cluttered North-East corner',
			problems: 'Blocked opportunities, poor business growth, mental stress',
			solution: 'Clear clutter, keep area light, place water feature or plants',
			urgency: 'Medium',
			cost: 'Low'
		},
		{
			issue: 'Employees facing South while working',
			problems: 'Lethargy, poor productivity, health issues, job dissatisfaction',
			solution: 'Rearrange seating to face North or East, use mirrors if space constraint',
			urgency: 'Medium',
			cost: 'Low'
		}
	];

	function getScoreColor(score: number) {
		if (score >= 90) return 'text-green-600';
		if (score >= 80) return 'text-yellow-600';
		return 'text-red-600';
	}

	function getImportanceColor(importance: string) {
		switch (importance.toLowerCase()) {
			case 'critical': return 'bg-red-100 text-red-800';
			case 'high': return 'bg-orange-100 text-orange-800';
			case 'medium': return 'bg-yellow-100 text-yellow-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}
</script>

<svelte:head>
	<title>Office Vastu Guide - VASTUJI</title>
</svelte:head>

<!-- Office Vastu Comprehensive Guide -->
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
					<a href="/knowledge" class="hover:text-gray-900">Knowledge</a>
					<a href="/home-vastu" class="hover:text-gray-900">Home Vastu</a>
					<span class="text-amber-600 font-medium">Office Vastu</span>
					<a href="/consultation" class="hover:text-gray-900">Consultation</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
		<div class="max-w-7xl mx-auto px-8">
			<div class="text-center mb-12">
				<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
					Office Vastu for Business Success
				</h1>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
					Optimize your workplace with ancient wisdom for modern business. 
					Create an environment that promotes productivity, prosperity, and positive energy.
				</p>
				
				<div class="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
					<div class="bg-white rounded-lg p-4 shadow-sm">
						<div class="text-2xl font-bold text-blue-600">85%</div>
						<div class="text-sm text-gray-600">Productivity Increase</div>
					</div>
					<div class="bg-white rounded-lg p-4 shadow-sm">
						<div class="text-2xl font-bold text-green-600">60%</div>
						<div class="text-sm text-gray-600">Revenue Growth</div>
					</div>
					<div class="bg-white rounded-lg p-4 shadow-sm">
						<div class="text-2xl font-bold text-purple-600">90%</div>
						<div class="text-sm text-gray-600">Employee Satisfaction</div>
					</div>
				</div>
				
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<button 
						on:click={() => goto('/scan')}
						class="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
					>
						Analyze My Office
					</button>
					<button 
						on:click={() => goto('/consultation')}
						class="border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
					>
						Expert Consultation
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Office Zones Section -->
	<section class="py-16">
		<div class="max-w-7xl mx-auto px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">8-Direction Office Vastu Layout</h2>
				<p class="text-gray-600">Optimize each zone of your office for maximum business potential</p>
			</div>
			
			<div class="space-y-6">
				{#each officeZones as zone}
					<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
						<div class="flex items-start justify-between mb-6">
							<div>
								<h3 class="text-2xl font-bold text-gray-900 mb-2">{zone.zone}</h3>
								<div class="flex items-center space-x-4 mb-2">
									<span class="text-blue-700 font-medium">Element: {zone.element}</span>
									<span class="text-amber-700 font-medium">Purpose: {zone.purpose}</span>
								</div>
								<p class="text-green-700 text-sm">{zone.benefits}</p>
							</div>
							<div class="text-right">
								<div class="text-3xl font-bold {getScoreColor(zone.score)}">{zone.score}/100</div>
								<div class="text-sm text-gray-500">Vastu Score</div>
							</div>
						</div>
						
						<div class="grid md:grid-cols-3 gap-8">
							<!-- Guidelines -->
							<div>
								<h4 class="font-semibold text-gray-900 mb-3">✅ Guidelines</h4>
								<ul class="space-y-2">
									{#each zone.guidelines as guideline}
										<li class="flex items-start">
											<span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
											<span class="text-gray-700 text-sm">{guideline}</span>
										</li>
									{/each}
								</ul>
							</div>
							
							<!-- Avoid -->
							<div>
								<h4 class="font-semibold text-gray-900 mb-3">❌ Avoid</h4>
								<ul class="space-y-2">
									{#each zone.avoid as item}
										<li class="flex items-start">
											<span class="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
											<span class="text-gray-700 text-sm">{item}</span>
										</li>
									{/each}
								</ul>
								
								<h4 class="font-semibold text-gray-900 mb-3 mt-6">🎨 Colors</h4>
								<div class="flex flex-wrap gap-2">
									{#each zone.colors as color}
										<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{color}</span>
									{/each}
								</div>
							</div>
							
							<!-- Visual -->
							<div class="flex items-center justify-center">
								<div class="w-32 h-32 border-4 border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center">
									<div class="text-3xl mb-2">🏢</div>
									<div class="text-xs text-center text-gray-600 font-medium">{zone.zone.split(' ')[0]}</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Workspace Guidelines -->
	<section class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Workspace Design Guidelines</h2>
				<p class="text-gray-600">Specific positioning for key areas in your office</p>
			</div>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each workspaceGuidelines as workspace}
					<div class="bg-gray-50 rounded-xl p-6">
						<div class="flex items-start justify-between mb-4">
							<h3 class="text-lg font-bold text-gray-900">{workspace.area}</h3>
							<span class="px-2 py-1 rounded-full text-xs font-medium {getImportanceColor(workspace.importance)}">
								{workspace.importance}
							</span>
						</div>
						
						<div class="mb-4">
							<div class="text-sm font-medium text-blue-700 mb-1">Ideal Position:</div>
							<div class="text-sm text-gray-600">{workspace.position}</div>
						</div>
						
						<div class="mb-4">
							<div class="text-sm font-semibold text-gray-700 mb-2">Key Tips:</div>
							<ul class="space-y-1">
								{#each workspace.tips as tip}
									<li class="text-xs text-gray-600 flex items-start">
										<span class="w-1 h-1 bg-amber-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
										{tip}
									</li>
								{/each}
							</ul>
						</div>
						
						<div class="flex items-center justify-between">
							<div class="text-xs text-gray-500">
								Colors: {workspace.colors.join(', ')}
							</div>
							<div class="text-lg font-bold {getScoreColor(workspace.score)}">{workspace.score}/100</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Business Types -->
	<section class="py-16">
		<div class="max-w-7xl mx-auto px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Vastu for Different Business Types</h2>
				<p class="text-gray-600">Specialized guidance based on your industry and business model</p>
			</div>
			
			<div class="grid md:grid-cols-2 gap-8">
				{#each businessTypes as business}
					<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
						<div class="mb-6">
							<h3 class="text-xl font-bold text-gray-900 mb-2">{business.type}</h3>
							<p class="text-gray-600 text-sm mb-4">{business.specialFocus}</p>
							<div class="text-sm text-amber-700 font-medium">Priority: {business.priority}</div>
						</div>
						
						<div>
							<h4 class="font-semibold text-gray-900 mb-3">Key Recommendations:</h4>
							<ul class="space-y-2">
								{#each business.keyTips as tip}
									<li class="flex items-start">
										<svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
										</svg>
										<span class="text-gray-700 text-sm">{tip}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Common Issues -->
	<section class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Common Office Vastu Issues & Solutions</h2>
				<p class="text-gray-600">Identify and resolve frequent workplace problems</p>
			</div>
			
			<div class="space-y-4">
				{#each commonOfficeIssues as issue}
					<div class="bg-gray-50 rounded-xl p-6">
						<div class="grid md:grid-cols-4 gap-6 items-start">
							<div>
								<h3 class="font-bold text-gray-900 mb-2">{issue.issue}</h3>
								<div class="flex items-center space-x-2">
									<span class="px-2 py-1 rounded-full text-xs font-medium {
										issue.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
										issue.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
										'bg-yellow-100 text-yellow-800'
									}">
										{issue.urgency}
									</span>
									<span class="px-2 py-1 rounded-full text-xs font-medium {
										issue.cost === 'Low' ? 'bg-green-100 text-green-800' :
										issue.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
										'bg-red-100 text-red-800'
									}">
										{issue.cost} Cost
									</span>
								</div>
							</div>
							
							<div>
								<h4 class="text-sm font-semibold text-gray-700 mb-2">Problems:</h4>
								<p class="text-sm text-gray-600">{issue.problems}</p>
							</div>
							
							<div>
								<h4 class="text-sm font-semibold text-gray-700 mb-2">Solution:</h4>
								<p class="text-sm text-gray-600">{issue.solution}</p>
							</div>
							
							<div class="text-center">
								<button class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
									Get Detailed Fix
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
		<div class="max-w-4xl mx-auto px-8 text-center">
			<div class="bg-white rounded-2xl p-12 shadow-sm border border-blue-200">
				<h2 class="text-3xl font-bold text-gray-900 mb-6">Transform Your Business with Office Vastu</h2>
				<p class="text-gray-600 mb-8 max-w-2xl mx-auto">
					Join thousands of successful businesses who have optimized their workspace 
					using ancient Vastu principles for modern success.
				</p>
				
				<div class="grid md:grid-cols-3 gap-6 mb-8">
					<div class="text-center">
						<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
							</svg>
						</div>
						<h3 class="font-bold text-gray-900 mb-1">Boost Revenue</h3>
						<p class="text-sm text-gray-600">Average 60% increase in 6 months</p>
					</div>
					
					<div class="text-center">
						<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
							</svg>
						</div>
						<h3 class="font-bold text-gray-900 mb-1">Improve Team Morale</h3>
						<p class="text-sm text-gray-600">Happier, more productive employees</p>
					</div>
					
					<div class="text-center">
						<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
							</svg>
						</div>
						<h3 class="font-bold text-gray-900 mb-1">Reduce Conflicts</h3>
						<p class="text-sm text-gray-600">Better workplace harmony</p>
					</div>
				</div>
				
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<button 
						on:click={() => goto('/scan')}
						class="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
					>
						Get Office Analysis
					</button>
					<button 
						on:click={() => goto('/consultation')}
						class="border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
					>
						Book Business Consultation
					</button>
				</div>
			</div>
		</div>
	</section>
</div>