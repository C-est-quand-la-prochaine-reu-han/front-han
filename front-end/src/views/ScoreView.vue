<template>
	<div class="score-container">
		<div class="score-item">
			<p>Meow</p>
		</div>
		<div class="score-item vertical-bar">
			<p>Woof</p>
		</div>
	</div>
</template>

<style scoped>
	.score-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 50px;
	}

	.score-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.score-item p {
		text-align: center;
		margin: auto;
	}

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
