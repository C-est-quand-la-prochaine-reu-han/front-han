<script setup>
	import { RouterLink, RouterView } from 'vue-router';

	let token;

	function testEmits(receivedToken) {
		token = receivedToken;
		console.log('Token recu : ', token);
		emit('isConnected', token);
	}
</script>

<template>
	<div class="wrapper">
		<nav>
			<RouterLink to="/">Se connecter</RouterLink>
			<RouterLink to="/signup">S'inscrire</RouterLink>
		</nav>

		<RouterView @isConnected="testEmits"/>
	</div>
</template>

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
