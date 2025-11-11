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
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 backdrop-blur-sm"
	>
		<div class="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
			<div class="mb-6 text-center">
				<!-- Logo -->
				<div
					class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-amber-600 to-orange-700"
				>
					<span class="text-3xl font-bold text-white">V</span>
				</div>

				<h1 class="mb-2 text-2xl font-bold text-gray-900">VASTUJI</h1>
				<p class="text-sm tracking-wide text-gray-500 uppercase">The Sacred Science of Space</p>
			</div>

			<div class="mb-6">
				<p class="mb-4 text-center text-gray-600">Please enter the password to continue</p>

				<input
					type="password"
					bind:value={password}
					onkeypress={handleKeyPress}
					placeholder="Enter password"
					class="w-full rounded-lg border border-gray-200 px-4 py-3 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
					autofocus
				/>

				{#if errorMessage}
					<p class="mt-2 text-center text-sm text-red-600">{errorMessage}</p>
				{/if}
			</div>

			<button
				onclick={handlePasswordSubmit}
				class="w-full rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
			>
				Enter Site
			</button>

			<p class="mt-4 text-center text-xs text-gray-400">Protected access • Authorized users only</p>
		</div>
	</div>
{:else}
	<!-- Main App Content -->
	{@render children?.()}
{/if}
