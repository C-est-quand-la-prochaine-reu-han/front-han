<script setup>
	import ScoreView from './ScoreView.vue';
	import PongView from './PongView.vue';
</script>

<template>
	<Suspense>
		<PongView />
	</Suspense>

	<ScoreView />
</template>
