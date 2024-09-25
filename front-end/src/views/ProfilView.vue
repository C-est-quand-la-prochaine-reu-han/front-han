<script setup>
	import ProfilLeftView from './ProfilLeftView.vue';
	import ProfilRightView from './ProfilRightView.vue';
</script>

<template>
	<div class="profil-container">

		<ProfilLeftView />

		<ProfilRightView />

	</div>
</template>

<style scoped>
	.profil-container {
		display: flex;
		flex-direction: row;
		margin: auto;
		height: 460px;
	}
</style>
