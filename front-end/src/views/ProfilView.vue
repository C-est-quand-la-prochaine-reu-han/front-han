<script setup>
	import ProfilLeftView from './ProfilLeftView.vue';
	import ProfilRightView from './ProfilRightView.vue';

	import { useAuthStore } from '../stores/auth.js';
</script>

<template>
	<button class="back-button">
		<h1>←</h1>
	</button>

	<div class="profil-container">

		<ProfilLeftView />

		<ProfilRightView />

	</div>
</template>

<style scoped>
	.back-button {
		position: fixed;
		top: 100px;
		left: 50px;
		padding: 0 15px;
		border: none;
		cursor: pointer;
		z-index: 10;
	}

	.back-button:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	body.light-mode .back-button:hover {
		background-color: var(--vt-c-white-mute);
	}

	.profil-container {
		display: flex;
		flex-direction: row;
		margin: auto;
		height: 460px;
	}
</style>
