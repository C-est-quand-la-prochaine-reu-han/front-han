<template>
	<div class="ball"></div>
</template>

<style scoped>
	.ball {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: var(--vt-c-white);
	}

	body.light-mode .ball {
		background-color: var(--vt-c-indigo);
	}
</style>
