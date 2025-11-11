<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let { children } = $props();
	
	let isAuthenticated = $state(false);
	let showPasswordModal = $state(true);
	let password = $state('');
	let errorMessage = $state('');
	
	onMount(() => {
		// Check if already authenticated in session
		if (browser) {
			const auth = sessionStorage.getItem('vastuji_auth');
			if (auth === 'authenticated') {
				isAuthenticated = true;
				showPasswordModal = false;
			}
		}
	});
	
	function handlePasswordSubmit() {
		if (password === 'yogesh') {
			isAuthenticated = true;
			showPasswordModal = false;
			errorMessage = '';
			if (browser) {
				sessionStorage.setItem('vastuji_auth', 'authenticated');
			}
		} else {
			errorMessage = 'Incorrect password. Please try again.';
			password = '';
		}
	}
	
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handlePasswordSubmit();
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if !isAuthenticated && showPasswordModal}
	<!-- Password Protection Modal -->
	<div class="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
		<div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
			<div class="text-center mb-6">
				<!-- Logo -->
				<div class="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center mx-auto mb-4">
					<span class="text-white font-bold text-3xl">V</span>
				</div>
				
				<h1 class="text-2xl font-bold text-gray-900 mb-2">VASTUJI</h1>
				<p class="text-sm text-gray-500 uppercase tracking-wide">The Sacred Science of Space</p>
			</div>
			
			<div class="mb-6">
				<p class="text-gray-600 text-center mb-4">Please enter the password to continue</p>
				
				<input 
					type="password"
					bind:value={password}
					onkeypress={handleKeyPress}
					placeholder="Enter password"
					class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
					autofocus
				/>
				
				{#if errorMessage}
					<p class="text-red-600 text-sm mt-2 text-center">{errorMessage}</p>
				{/if}
			</div>
			
			<button 
				onclick={handlePasswordSubmit}
				class="w-full bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
			>
				Enter Site
			</button>
			
			<p class="text-xs text-gray-400 text-center mt-4">
				Protected access • Authorized users only
			</p>
		</div>
	</div>
{:else}
	<!-- Main App Content -->
	{@render children?.()}
{/if}
