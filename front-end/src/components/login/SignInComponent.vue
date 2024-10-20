<template>
	<form>
		<div class="input-wrapper">
			<input type="text" v-model="username" placeholder="Nom d'utilisateur" required>
		</div>
		<div>
			<input type="password" v-model="password" placeholder="Mot de passe" required>
		</div>
		<button type="button" @click="toggleConnection">Se connecter</button>
	</form>
</template>

<script setup>
	import { ref } from 'vue';
	import { login } from '@/jspong/main';
	import { useAuthStore } from '@/stores/auth.js';
	import router from '@/router';

	const username = ref('');
	const password = ref('');
	const authStore = useAuthStore();
	
	let token;

	async function toggleConnection() {
		console.log('Logging in...');
		try {
			token = await login(username.value, password.value);
			authStore.setToken(token);
			if (token)
				router.push('/menu');
		}
		catch(error) {
			alert("Username or password incorrect dummy !");
			console.log(error);
		}
	}
</script>

<style scoped>
	.input-wrapper {
		margin-bottom: 20px;
	}

	input {
		width: 100%;
		padding: 10px;
		border: 1px solid var(--vt-c-divider-dark-1);
		background: transparent;
		color: var(--vt-c-text-dark-2);
	}

	button {
		padding: 10px;
		margin-top: 20px;
		background-color: var(--vt-c-black-soft);
	}

	button:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.2s ease;
	}

	body.light-mode input {
		border-color: var(--vt-c-divider-light-1);
		color: var(--vt-c-text-light-1);
	}

	body.light-mode button {
		background-color: var(--vt-c-white-soft);
	}

	body.light-mode button:hover {
		background-color: var(--vt-c-white-mute);
	}
</style>
