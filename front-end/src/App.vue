<script setup>
	import { ref } from 'vue'
	import GameView from './views/GameView.vue'

	const isLightMode = ref(false)

	function toggleTheme() {
		isLightMode.value = !isLightMode.value
		document.body.classList.toggle('light-mode')
	}
</script>

<template>
	<header>
		<nav>
			<button @click="toggleMenu">
				<img v-if="!isLightMode" src="/src/assets/menu-burger-white.png" alt="Menu" class="icon">
				<img v-else src="/src/assets/menu-burger-black.png" alt="Menu" class="icon">
			</button>
		</nav>
		<div>
			<h1>ft_transcendence</h1>
		</div>
		<div>
			<button @click="toggleTheme">
				<img v-if="!isLightMode" src="/src/assets/switch-on.png" alt="Mode clair" class="icon">
				<img v-else src="/src/assets/switch-off.png" alt="Mode sombre" class="icon">
			</button>
			<img src="/src/assets/moon.png" alt="Moon" class="icon">
		</div>
	</header>

	<GameView />
</template>
