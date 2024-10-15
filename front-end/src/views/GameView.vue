<script setup>
	import { reactive, provide } from 'vue';
	import ScoreView from './ScoreView.vue';
	import PongView from './PongView.vue';

	// Create a global reactive state
	const globalState = reactive({
	  controlledPlayerScore: 0,
	  otherPlayerScore: 0
	});

	// Provide the global state to child components
	provide('globalState', globalState);
</script>

<template>
	<Suspense>
		<PongView />
	</Suspense>

	<ScoreView />
</template>
