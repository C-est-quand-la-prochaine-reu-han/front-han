<script setup>
	import { reactive, provide } from 'vue';
	import ScoreView from './ScoreView.vue';
	import PongView from './PongView.vue';

	// Create a global reactive state
	const globalState = reactive({
	  leftPlayerScore: 0,
	  rightPlayerScore: 0
	});

	// Provide the global state to child components
	provide('globalState', globalState);
</script>

<template>
	<Suspense>
		<PongView @close="$emit('close')" />
	</Suspense>

	<ScoreView />
</template>
