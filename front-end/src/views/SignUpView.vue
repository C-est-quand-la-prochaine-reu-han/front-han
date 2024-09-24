<script>
	// const handleSubmit() {
		
	// }
</script>
<!-- @submit.prevent="handleSubmit" -->
<template>
	<form >
		<div class="input-wrapper">
			<input type="text" placeholder="Nom d'utilisateur" required>
		</div>
		<div class="input-wrapper">
			<input type="text" placeholder="Surnom" required>
		</div>
		<div>
			<input type="password" placeholder="Mot de passe" required>
		</div>
		<button type="submit">S'inscrire</button>
	</form>
</template>

<style scoped>
	.input-wrapper {
		margin-bottom: 20px;
	}

	input {
		width: 100%;
		padding: 10px;
		border: 1px solid var(--vt-c-divider-dark-1);
		background: transparent;
		color: var(--vt-c-text-dark-2);
	}

	button {
		padding: 10px;
		margin-top: 20px;
		background-color: var(--vt-c-black-soft);
	}

	button:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.2s ease;
	}

	body.light-mode input {
		border-color: var(--vt-c-divider-light-1);
		color: var(--vt-c-text-light-1);
	}

	body.light-mode button {
		background-color: var(--vt-c-white-soft);
	}

	body.light-mode button:hover {
		background-color: var(--vt-c-white-mute);
	}
</style>
