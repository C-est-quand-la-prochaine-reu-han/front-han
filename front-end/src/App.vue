<script setup>
	import { ref, computed } from 'vue'
	import MenuView from './views/MenuView.vue'
	import LogInView from './views/LogInView.vue'

	const isLightMode = ref(false)
	const isConnected = ref(true)

	const flagImages = {
		0: '/src/assets/france.svg',
		1: '/src/assets/australia-aboriginal.svg',
		2: '/src/assets/normandie.svg',
		3: '/src/assets/nord-pas-de-calais.svg',
		4: '/src/assets/picardie.svg',
		5: '/src/assets/black-cat.svg'
	};

	const currentIndex = ref(0);
	const currentFlag = computed(() => flagImages[currentIndex.value]);

	const nextImage = () => {
		currentIndex.value = (currentIndex.value + 1) % Object.keys(flagImages).length;
	};

	function toggleTheme() {
		isLightMode.value = !isLightMode.value
		document.body.classList.toggle('light-mode')
	}

	function toggleConnection() {
		isConnected.value = !isConnected.value
	}
</script>

<template>
	<header>
		<div>
			<button @click="nextImage">
				<img :src="currentFlag" alt="Easter egg" class="icon">
			</button>
		</div>
		<div>
			<h1>ft_transcendence</h1>
		</div>
		<div>
			<button @click="toggleTheme">
				<img v-if="isLightMode" src="/src/assets/sun.svg" alt="Mode clair" class="icon">
				<img v-else src="/src/assets/moon.svg" alt="Mode sombre" class="icon">
			</button>
		</div>
	</header>

	<MenuView v-if="isConnected" />

	<LogInView v-else />
</template>
