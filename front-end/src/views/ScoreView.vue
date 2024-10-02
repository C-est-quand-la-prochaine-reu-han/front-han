<template>
	<div class="score-container">
		<div>
			<p>Meow</p>
		</div>
		<div class="vertical-bar">
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

	.score-container div {
		width: 100%;
	}

	.score-container p {
		text-align: center;
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
