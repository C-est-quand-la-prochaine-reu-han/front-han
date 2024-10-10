<script setup>
	import { useAuthStore } from '/src/stores/auth.js'
	import { ref, computed } from 'vue'
	import MenuView from './views/MenuView.vue'
	import LogInView from './views/LogInView.vue'

	import franceFlag from '@/assets/france.svg'
	import australiaFlag from '@/assets/australia-aboriginal.svg'
	import normandieFlag from '@/assets/normandie.svg'
	import nordPasDeCalaisFlag from '@/assets/nord-pas-de-calais.svg'
	import picardieFlag from '@/assets/picardie.svg'
	import blackCatFlag from '@/assets/black-cat.svg'
	import sunIcon from '@/assets/sun.svg'
	import moonIcon from '@/assets/moon.svg'

	const authStore = useAuthStore()
	
	const isLightMode = ref(false)
	const isConnected = computed(() => authStore.isConnected);

	const flagImages = {
		0: franceFlag,
		1: australiaFlag,
		2: normandieFlag,
		3: nordPasDeCalaisFlag,
		4: picardieFlag,
		5: blackCatFlag
	};

	const currentIndex = ref(0);
	const currentFlag = computed(() => flagImages[currentIndex.value]);

	const nextImage = () => {
		currentIndex.value = (currentIndex.value + 1) % Object.keys(flagImages).length;
	};

	let token;

	function toggleTheme() {
		isLightMode.value = !isLightMode.value
		document.body.classList.toggle('light-mode')
	}

	function toggleConnection(receivedToken) {
		console.log('Function Toggle Connection App.vue!');
	}

	// function toggleConnection(receivedToken) {
	// 	token = receivedToken;
	// 	isConnected.value = true;
	// 	console.log('haaaaaaa!');
	// }
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
				<img v-if="isLightMode" :src="sunIcon" alt="Mode clair" class="icon">
				<img v-else :src="moonIcon" alt="Mode sombre" class="icon">
			</button>
		</div>
	</header>

	<MenuView v-if="isConnected" />
	<LogInView v-else />
</template>

<style scoped>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}

	.icon {
		width: 40px;
		height: 40px;
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
	}

	h1 {
		font-family: 'VT323';
		margin: 0;
	}
</style>
