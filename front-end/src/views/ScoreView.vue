<template>
	<div>
		<p>LEFT SCORE</p>
	</div>
	<div class="vertical-bar">
		<p>RIGHT SCORE</p>
	</div>
</template>

<style scoped>
	.vertical-bar {
		border-left: 1px;
		border-style: solid;
		border-top: none;
		border-right: none;
		border-bottom: none;
		border-color: var(--vt-c-divider-dark-1);
	}

	body.light-mode .vertical-bar {
		border-color: var(--vt-c-divider-light-1);
	}
</style>
