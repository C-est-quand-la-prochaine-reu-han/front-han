<script>
	import ProfilView from './ProfilView.vue';
	import StatsView from './StatsView.vue';
</script>

<template>
	<div class="menu-container">
		<div class="menu-item">
			<button>PROFIL</button>
		</div>
		<div class="menu-item">
			<button>STATISTIQUES</button>
		</div>
		<div class="menu-item">
			<button>PARTIE RAPIDE (IA)</button>
		</div>
		<div class="menu-item">
			<button>PARTIE RAPIDE (INVITE)</button>
		</div>
		<div class="menu-item">
			<button>TOURNOIS</button>
		</div>
	</div>
</template>

<style scoped>
	.menu-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
	}

	.menu-item {
		background-color: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.menu-item:nth-child(3) {
		grid-column: 1 / span 2;
	}

	button {
		height: 100%;
		width: 100%;
	}

	button:hover {
		background-color: var(--vt-c-black-mute);
	}
</style>
