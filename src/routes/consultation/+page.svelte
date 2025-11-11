<script lang="ts">
	import { goto } from '$app/navigation';
	
	let currentStep = 1;
	let formData = {
		// Consultation Type
		consultationType: '',
		urgency: '',
		duration: '',
		
		// Contact Information
		name: '',
		phone: '',
		email: '',
		preferredTime: '',
		timezone: '',
		
		// Property Details
		propertyType: '',
		location: '',
		issues: '',
		previousConsultation: false,
		
		// Payment
		selectedPackage: null
	};

	const consultationTypes = [
		{
			id: 'property-analysis',
			name: 'Complete Property Analysis',
			description: 'Comprehensive Vastu assessment of your entire space',
			duration: '90-120 minutes',
			price: 4999
		},
		{
			id: 'specific-issues',
			name: 'Specific Issue Resolution',
			description: 'Focused consultation for particular Vastu problems',
			duration: '45-60 minutes',
			price: 2999
		},
		{
			id: 'new-construction',
			name: 'New Construction Planning',
			description: 'Vastu guidance for upcoming projects and renovations',
			duration: '60-90 minutes',
			price: 7999
		},
		{
			id: 'business-commercial',
			name: 'Business & Commercial Vastu',
			description: 'Specialized consultation for offices, shops, and factories',
			duration: '90-120 minutes',
			price: 8999
		}
	];

	const urgencyOptions = [
		{ id: 'immediate', name: 'Immediate (Within 24 hours)', extra: '+₹1000' },
		{ id: 'urgent', name: 'Urgent (Within 3 days)', extra: '+₹500' },
		{ id: 'normal', name: 'Standard (Within 7 days)', extra: '' },
		{ id: 'flexible', name: 'Flexible (Within 2 weeks)', extra: '-₹200' }
	];

	const experts = [
		{
			id: 'dr-sharma',
			name: 'Dr. Rajesh Sharma',
			title: 'Senior Vastu Consultant',
			experience: '25+ years',
			specialization: 'Residential & Commercial Vastu',
			rating: 4.9,
			reviews: 1247,
			languages: ['Hindi', 'English', 'Sanskrit'],
			image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face'
		},
		{
			id: 'acharya-gupta',
			name: 'Acharya Vikram Gupta',
			title: 'Traditional Vastu Acharya',
			experience: '30+ years',
			specialization: 'Ancient Texts & Remedies',
			rating: 4.8,
			reviews: 892,
			languages: ['Hindi', 'English', 'Bengali'],
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
		},
		{
			id: 'dr-priya',
			name: 'Dr. Priya Mehta',
			title: 'Modern Vastu Specialist',
			experience: '15+ years',
			specialization: 'Urban Planning & Apartments',
			rating: 4.9,
			reviews: 674,
			languages: ['English', 'Hindi', 'Gujarati'],
			image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
		}
	];

	function nextStep() {
		if (currentStep < 4) currentStep++;
	}

	function prevStep() {
		if (currentStep > 1) currentStep--;
	}

	function selectConsultationType(type: string) {
		formData.consultationType = type;
		formData.selectedPackage = consultationTypes.find(t => t.id === type);
	}

	function calculateTotal() {
		if (!formData.selectedPackage) return 0;
		
		let total = formData.selectedPackage.price;
		
		// Add urgency fees
		const urgencyFee = {
			'immediate': 1000,
			'urgent': 500,
			'normal': 0,
			'flexible': -200
		}[formData.urgency] || 0;
		
		return total + urgencyFee;
	}

	function bookConsultation() {
		console.log('Booking consultation:', formData);
		// Navigate to payment or confirmation page
		goto('/consultation/confirm');
	}
</script>

<svelte:head>
	<title>Expert Consultation - VASTUJI</title>
</svelte:head>

<!-- Professional Consultation Booking -->
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
				
				<!-- Progress Indicator -->
				<div class="flex items-center space-x-2">
					<div class="flex items-center space-x-1">
						{#each Array(4) as _, i}
							<div class="w-8 h-1 rounded-full {i + 1 <= currentStep ? 'bg-amber-600' : 'bg-gray-200'}"></div>
						{/each}
					</div>
					<span class="text-sm text-gray-500 ml-3">Step {currentStep} of 4</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-6xl mx-auto px-8 py-12">
		
		{#if currentStep === 1}
		<!-- Step 1: Consultation Type -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
			<div class="mb-8">
				<h1 class="text-3xl font-bold text-gray-900 mb-2">Choose Your Consultation</h1>
				<p class="text-gray-600">Select the type of Vastu consultation that best fits your needs</p>
			</div>
			
			<div class="grid md:grid-cols-2 gap-6 mb-8">
				{#each consultationTypes as consultation}
					<button
						on:click={() => selectConsultationType(consultation.id)}
						class="text-left p-6 border-2 rounded-xl transition-all hover:border-amber-200 hover:bg-amber-50 {formData.consultationType === consultation.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}"
					>
						<div class="flex items-start justify-between mb-4">
							<div class="flex-1">
								<h3 class="text-xl font-bold text-gray-900 mb-2">{consultation.name}</h3>
								<p class="text-gray-600 text-sm mb-3">{consultation.description}</p>
								<div class="text-sm text-gray-500">Duration: {consultation.duration}</div>
							</div>
							{#if formData.consultationType === consultation.id}
								<svg class="w-6 h-6 text-amber-600 ml-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
								</svg>
							{/if}
						</div>
						
						<div class="text-right">
							<div class="text-2xl font-bold text-gray-900">₹{consultation.price.toLocaleString()}</div>
							<div class="text-sm text-gray-500">Starting from</div>
						</div>
					</button>
				{/each}
			</div>
			
			<!-- Urgency Selection -->
			{#if formData.consultationType}
				<div class="mb-8">
					<label class="block text-sm font-semibold text-gray-700 mb-4">Scheduling Preference</label>
					<div class="grid md:grid-cols-2 gap-3">
						{#each urgencyOptions as option}
							<button
								on:click={() => formData.urgency = option.id}
								class="text-left p-4 border rounded-lg transition-all hover:border-amber-200 {formData.urgency === option.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}"
							>
								<div class="flex justify-between items-center">
									<span class="font-medium text-gray-900">{option.name}</span>
									{#if option.extra}
										<span class="text-sm {option.extra.startsWith('+') ? 'text-red-600' : 'text-green-600'}">{option.extra}</span>
									{/if}
								</div>
							</button>
						{/each}
					</div>
				</div>
			{/if}
			
			<div class="flex justify-end">
				<button 
					on:click={nextStep}
					disabled={!formData.consultationType || !formData.urgency}
					class="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Continue to Expert Selection
				</button>
			</div>
		</div>
		{/if}

		{#if currentStep === 2}
		<!-- Step 2: Expert Selection -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
			<div class="mb-8">
				<h1 class="text-3xl font-bold text-gray-900 mb-2">Choose Your Expert</h1>
				<p class="text-gray-600">All our consultants are certified Vastu experts with years of experience</p>
			</div>
			
			<div class="space-y-6 mb-8">
				{#each experts as expert}
					<div class="border border-gray-200 rounded-lg p-6 hover:border-amber-200 hover:bg-amber-50 transition-all cursor-pointer">
						<div class="flex items-start space-x-4">
							<div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
								<div class="w-full h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
									<span class="text-amber-800 font-bold text-lg">{expert.name.split(' ').map(n => n[0]).join('')}</span>
								</div>
							</div>
							
							<div class="flex-1">
								<div class="flex items-start justify-between mb-2">
									<div>
										<h3 class="text-xl font-bold text-gray-900">{expert.name}</h3>
										<p class="text-amber-700 font-medium">{expert.title}</p>
									</div>
									<div class="text-right">
										<div class="flex items-center space-x-1 mb-1">
											<svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
											</svg>
											<span class="font-bold text-gray-900">{expert.rating}</span>
										</div>
										<div class="text-xs text-gray-500">{expert.reviews} reviews</div>
									</div>
								</div>
								
								<div class="mb-3">
									<p class="text-gray-600 text-sm mb-2">
										<strong>Experience:</strong> {expert.experience} | 
										<strong>Specialization:</strong> {expert.specialization}
									</p>
									<div class="flex items-center space-x-1">
										<span class="text-sm text-gray-500">Languages:</span>
										{#each expert.languages as language, i}
											<span class="text-sm text-gray-700">{language}{i < expert.languages.length - 1 ? ',' : ''}</span>
										{/each}
									</div>
								</div>
								
								<div class="flex items-center justify-between">
									<button class="bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
										Select Expert
									</button>
									<button class="text-amber-600 hover:text-amber-700 font-medium">
										View Profile
									</button>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
			
			<div class="flex justify-between">
				<button 
					on:click={prevStep}
					class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
				>
					Back
				</button>
				<button 
					on:click={nextStep}
					class="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
				>
					Continue to Details
				</button>
			</div>
		</div>
		{/if}

		{#if currentStep === 3}
		<!-- Step 3: Contact & Property Details -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
			<div class="mb-8">
				<h1 class="text-3xl font-bold text-gray-900 mb-2">Your Details</h1>
				<p class="text-gray-600">Help us prepare for your consultation</p>
			</div>
			
			<div class="grid md:grid-cols-2 gap-8">
				<!-- Contact Information -->
				<div class="space-y-6">
					<h3 class="text-lg font-bold text-gray-900">Contact Information</h3>
					
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
						<input 
							bind:value={formData.name}
							type="text" 
							class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
							placeholder="Enter your full name"
						/>
					</div>
					
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
						<input 
							bind:value={formData.phone}
							type="tel" 
							class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
							placeholder="+91 XXXXX XXXXX"
						/>
					</div>
					
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
						<input 
							bind:value={formData.email}
							type="email" 
							class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
							placeholder="your@email.com"
						/>
					</div>
					
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
						<select 
							bind:value={formData.preferredTime}
							class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
						>
							<option value="">Select preferred time</option>
							<option value="morning">Morning (9 AM - 12 PM)</option>
							<option value="afternoon">Afternoon (12 PM - 4 PM)</option>
							<option value="evening">Evening (4 PM - 8 PM)</option>
							<option value="flexible">Flexible</option>
						</select>
					</div>
				</div>
				
				<!-- Property Information -->
				<div class="space-y-6">
					<h3 class="text-lg font-bold text-gray-900">Property Information</h3>
					
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
						<select 
							bind:value={formData.propertyType}
							class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
						>
							<option value="">Select property type</option>
							<option value="home">Home/Residence</option>
							<option value="apartment">Apartment</option>
							<option value="office">Office Space</option>
							<option value="shop">Retail/Shop</option>
							<option value="factory">Factory/Industrial</option>
							<option value="plot">Vacant Plot</option>
						</select>
					</div>
					
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-2">Location</label>
						<input 
							bind:value={formData.location}
							type="text" 
							class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
							placeholder="City, State"
						/>
					</div>
					
					<div>
						<label class="block text-sm font-semibold text-gray-700 mb-2">Specific Issues or Concerns</label>
						<textarea 
							bind:value={formData.issues}
							class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
							rows="4"
							placeholder="Describe any specific Vastu issues, problems you're facing, or areas of focus for the consultation..."
						></textarea>
					</div>
					
					<div class="flex items-center">
						<input 
							bind:checked={formData.previousConsultation}
							type="checkbox" 
							class="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
						/>
						<label class="ml-2 text-sm text-gray-700">I have had a Vastu consultation before</label>
					</div>
				</div>
			</div>
			
			<div class="flex justify-between mt-8">
				<button 
					on:click={prevStep}
					class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
				>
					Back
				</button>
				<button 
					on:click={nextStep}
					disabled={!formData.name || !formData.phone || !formData.email}
					class="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Review & Confirm
				</button>
			</div>
		</div>
		{/if}

		{#if currentStep === 4}
		<!-- Step 4: Review & Payment -->
		<div class="grid lg:grid-cols-3 gap-8">
			<!-- Main Content -->
			<div class="lg:col-span-2">
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
					<div class="mb-8">
						<h1 class="text-3xl font-bold text-gray-900 mb-2">Review Your Consultation</h1>
						<p class="text-gray-600">Please verify your details before confirming</p>
					</div>
					
					<!-- Consultation Summary -->
					<div class="space-y-6">
						<div class="border-b border-gray-200 pb-6">
							<h3 class="text-lg font-bold text-gray-900 mb-3">Consultation Details</h3>
							{#if formData.selectedPackage}
								<div class="bg-gray-50 rounded-lg p-4">
									<div class="flex justify-between items-start mb-2">
										<div>
											<h4 class="font-semibold text-gray-900">{formData.selectedPackage.name}</h4>
											<p class="text-sm text-gray-600">{formData.selectedPackage.description}</p>
											<p class="text-sm text-gray-500 mt-1">Duration: {formData.selectedPackage.duration}</p>
										</div>
										<div class="text-right">
											<div class="text-lg font-bold text-gray-900">₹{formData.selectedPackage.price.toLocaleString()}</div>
										</div>
									</div>
								</div>
							{/if}
							
							{#if formData.urgency}
								<div class="mt-3 text-sm text-gray-600">
									<strong>Scheduling:</strong> {urgencyOptions.find(o => o.id === formData.urgency)?.name}
									{#if urgencyOptions.find(o => o.id === formData.urgency)?.extra}
										<span class="ml-2 text-amber-600 font-medium">{urgencyOptions.find(o => o.id === formData.urgency)?.extra}</span>
									{/if}
								</div>
							{/if}
						</div>
						
						<div class="border-b border-gray-200 pb-6">
							<h3 class="text-lg font-bold text-gray-900 mb-3">Contact Information</h3>
							<div class="space-y-2 text-sm text-gray-600">
								<p><strong>Name:</strong> {formData.name}</p>
								<p><strong>Phone:</strong> {formData.phone}</p>
								<p><strong>Email:</strong> {formData.email}</p>
								{#if formData.preferredTime}
									<p><strong>Preferred Time:</strong> {formData.preferredTime}</p>
								{/if}
							</div>
						</div>
						
						{#if formData.propertyType}
							<div class="border-b border-gray-200 pb-6">
								<h3 class="text-lg font-bold text-gray-900 mb-3">Property Details</h3>
								<div class="space-y-2 text-sm text-gray-600">
									<p><strong>Type:</strong> {formData.propertyType}</p>
									{#if formData.location}
										<p><strong>Location:</strong> {formData.location}</p>
									{/if}
									{#if formData.issues}
										<div>
											<strong>Issues/Concerns:</strong>
											<p class="mt-1 text-gray-700">{formData.issues}</p>
										</div>
									{/if}
								</div>
							</div>
						{/if}
						
						<div class="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
							<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
							<p class="text-sm text-blue-800">You will receive a confirmation email with video call details within 2 hours of booking.</p>
						</div>
					</div>
					
					<div class="flex justify-between mt-8">
						<button 
							on:click={prevStep}
							class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
						>
							Back
						</button>
						<button 
							on:click={bookConsultation}
							class="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
						>
							Confirm & Pay ₹{calculateTotal().toLocaleString()}
						</button>
					</div>
				</div>
			</div>
			
			<!-- Sidebar -->
			<div class="space-y-6">
				<!-- Price Breakdown -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 class="text-lg font-bold text-gray-900 mb-4">Price Breakdown</h3>
					
					<div class="space-y-3">
						{#if formData.selectedPackage}
							<div class="flex justify-between">
								<span class="text-gray-600">Consultation Fee</span>
								<span class="font-medium">₹{formData.selectedPackage.price.toLocaleString()}</span>
							</div>
						{/if}
						
						{#if formData.urgency && urgencyOptions.find(o => o.id === formData.urgency)?.extra}
							<div class="flex justify-between">
								<span class="text-gray-600">Scheduling Fee</span>
								<span class="font-medium">{urgencyOptions.find(o => o.id === formData.urgency)?.extra}</span>
							</div>
						{/if}
						
						<div class="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
							<span>Total</span>
							<span>₹{calculateTotal().toLocaleString()}</span>
						</div>
					</div>
				</div>
				
				<!-- Guarantee -->
				<div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
					<h3 class="text-lg font-bold text-gray-900 mb-2">100% Satisfaction Guaranteed</h3>
					<p class="text-green-800 text-sm mb-4">
						Not satisfied with your consultation? Get a full refund within 24 hours.
					</p>
					<div class="text-xs text-green-700">
						• Expert certified consultants<br/>
						• Detailed written report included<br/>
						• Follow-up support for 30 days
					</div>
				</div>
				
				<!-- Support -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 class="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
					<p class="text-gray-600 text-sm mb-4">Our support team is here to assist you</p>
					<div class="space-y-2 text-sm text-gray-600">
						<p>📞 +91 98765 43210</p>
						<p>✉️ support@vastuji.com</p>
						<p>💬 Live chat available</p>
					</div>
				</div>
			</div>
		</div>
		{/if}
	</main>
</div>