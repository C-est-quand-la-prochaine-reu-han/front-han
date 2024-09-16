<script setup>
	// import ProfilView from './ProfilView.vue'
	// import StatsView from './StatsView.vue'

	// const isProfilOpened = ref(false)
	// const isStatsOpened = ref(false)

	// function toggleProfil() {
	// 	isProfilOpened = !isProfilOpened
	// }

	// function toggleStats() {
	// 	isStatsOpened = !isStatsOpened
	// }
</script>

<template>
	<div class="menu-overlay" v-if="!isProfilOpened && !isStatsOpened">
		<div>
			<button @click="toggleProfil">Profil</button>
		</div>
		<div>
			<button @click="toggleStats">Statistiques</button>
		</div>
	</div>
<!-- 
	<ProfilView v-if="isVisible && isProfilOpened && !isStatsOpened"></ProfilView>

	<StatsView v-if="isVisible && !isProfilOpened && isStatsOpened"></StatsView> -->
</template>

<style scoped>
	.menu-overlay {
		position: fixed;
		top: 50px;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 100;
		display: flex;
		justify-content: center;
	}

	.menu-overlay > div {
		width: 100%;
	}

	button {
		height: 100%;
		width: 100%;
	}

	button:hover {
		background-color: rgba(100, 100, 100, 0.5);
		transition: background-color 0.5s;
	}
</style>
