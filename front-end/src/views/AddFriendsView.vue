<script setup>
</script>

<template>
	<div class="find-new-friends-container">
		<div class="find-new-friends">
			<button class="back-button" @click="$emit('close')">
				<h1>←</h1>
			</button>
			<div class="input-container">
				<input type="text" placeholder="Rechercher un nom d'utilisateur">
				<button>Rechercher</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.find-new-friends-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.find-new-friends {
		position: absolute;
		background-color: rgb(from var(--vt-c-black-soft) r g b / 0.8);
		width: 500px;
	}

	.back-button {
		margin: 10px;
		border: none;
		cursor: pointer;
	}

	.back-button:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	.input-container {
		display: flex;
		flex-direction: row;
		gap: 10px;
		padding: 20px;
	}

	.input-container button {
		padding: 10px;
		background-color: red;
	}

	input {
		flex: 1;
		padding: 10px;
		border: 1px solid var(--vt-c-divider-dark-1);
		background: var(--vt-c-black-soft);
		color: var(--vt-c-text-dark-2);
	}
</style>
