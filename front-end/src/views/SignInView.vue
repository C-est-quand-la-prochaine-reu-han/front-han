<script setup>
	import { ref, defineEmits } from 'vue';
	import { login } from '/src/jspong/main.js';

	const username = ref('');
	const password = ref('');
	
	const emit = defineEmits(['isConnected']);

	let token;

	async function toggleConnection() {
		try {
			token = await login(username.value, password.value);
			alert("You are connected ! Congrats !");
			emit('isConnected', token);
		}
		catch(error) {
			alert("Username or password incorrect dummy !");
			console.error(error);
		}
	}
</script>

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
