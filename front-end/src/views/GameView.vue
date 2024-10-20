<template>
	<Suspense>
		<PongView @close-game="$emit('close-game')" />
	</Suspense>

	<ScoreView />
</template>

<script setup>
	import { reactive, provide, defineEmits } from 'vue';
	import ScoreView from '@/components/game/ScoreComponent.vue';
	import PongView from '@/components/game/PongComponent.vue';

	defineEmits(['close-game']);

	const globalState = reactive({
		leftPlayerScore: 0,
		rightPlayerScore: 0
	});

	provide('globalState', globalState);
</script>
