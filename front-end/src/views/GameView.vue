<script setup>
	import { reactive, provide, inject, defineEmits } from 'vue';
	import ScoreView from './ScoreView.vue';
	import PongView from './PongView.vue';

	defineEmits(['close-game']);

	const globalState = reactive({
	  leftPlayerScore: 0,
	  rightPlayerScore: 0
	});

	provide('globalState', globalState);
</script>

<template>
	<Suspense>
		<PongView @close-game="$emit('close-game')" />
	</Suspense>

	<ScoreView />
</template>
