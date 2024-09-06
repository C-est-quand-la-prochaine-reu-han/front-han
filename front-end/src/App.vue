<script setup>
	import { RouterLink, RouterView } from 'vue-router'
	import { ref } from 'vue'
	import GameView from './views/GameView.vue'

	const isLightMode = ref(false)
	const scoreLeft = ref(0)
	const scoreRight = ref(0)

	function toggleTheme() {
		isLightMode.value = !isLightMode.value
		document.body.classList.toggle('light-mode')
	}

	function handleScoreUpdate(scores) {
		scoreLeft.value = scores.left
		scoreRight.value = scores.right
	}
</script>

<template>
	<header>
		<nav>
			<RouterLink to="/">
				<img v-if="!isLightMode" src="/src/assets/menu-burger-white.png" alt="Menu" class="icon">
				<img v-else src="/src/assets/menu-burger-black.png" alt="Menu" class="icon">
			</RouterLink>
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

	<main>
		<div>
			<RouterLink to="/game"></RouterLink>
		</div>
		<RouterView @score-update="handleScoreUpdate" />
	</main>

	<footer>
		<div>
			<p>Gauche: {{ scoreLeft }} - Droite : {{ scoreRight }}</p>
		</div>
	</footer>
</template>
