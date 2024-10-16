<script setup>
	import { reactive, provide, inject, defineEmits } from 'vue';
	import ScoreView from './ScoreView.vue';
	import PongView from './PongView.vue';

	defineEmits(['close-game']);

	// Create a global reactive state
	const globalState = reactive({
	  leftPlayerScore: 0,
	  rightPlayerScore: 0
	});

	const otherPlayerName = inject('otherPlayerName');

	// Provide the global state to child components
	provide('globalState', globalState);
	provide('otherPlayerName', otherPlayerName);
</script>

<template>
	<Suspense>
		<PongView @close-game="$emit('close-game')" />
	</Suspense>

	<ScoreView />
</template>
