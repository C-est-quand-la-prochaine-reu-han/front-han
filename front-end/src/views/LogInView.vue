<template>
	<div class="wrapper">
		<nav>
			<button @click="toggleSignIn">Se connecter</button>
			<button @click="toggleSignUp">S'inscrire</button>
		</nav>

		<SignInComponent v-if="toSignIn" />
		<SignUpComponent v-if="toSignUp" />
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import SignInComponent from '@/components/login/SignInComponent.vue';
	import SignUpComponent from '@/components/login/SignUpComponent.vue';

	let token;

	const toSignIn = ref(true);
	const toSignUp = ref(false);

	function test(receivedToken) {
		token = receivedToken;
		console.log('Token recu : ', token);
	}

	function toggleSignIn() {
		if (toSignIn.value) return;
		toSignIn.value = !toSignIn.value;
		toSignUp.value = !toSignUp.value;
	}

	function toggleSignUp() {
		if (toSignUp.value) return;
		toSignIn.value = !toSignIn.value;
		toSignUp.value = !toSignUp.value;
	}
</script>

<style scoped>
	.wrapper {
		margin: auto;
		width: 300px;
		height: 300px;
	}

	nav {
		margin-bottom: 20px;
		display: flex;
		width: 100%;
	}

	nav a {
		text-decoration: none;
		padding: 10px;
		transition: background-color 0.3s ease;
		flex: 1;
		text-align: center;
	}

	nav a:hover {
		background-color: var(--vt-c-black-mute);
	}

	nav a.router-link-active {
		background-color: var(--vt-c-black-soft);
	}

	body.light-mode nav a:hover {
		background-color: var(--vt-c-white-mute);
	}

	body.light-mode nav a.router-link-active {
		background-color: var(--vt-c-white-soft);
	}
</style>
