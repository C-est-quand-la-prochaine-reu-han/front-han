<script setup>
	import { get_user_by_id } from '/src/jspong/main.js';
	let id = 0;
	let me = get_user_by_id(id);
	function updateProfile() {
		get();
	}
</script>

<template>
	<div class="left-part">
		<button class="back-button" @click="$emit('close')">
			<h1>←</h1>
		</button>
		<div class="resume-container">
			<button class="profile-image-container">
				<img src="../assets/business-cat.png" alt="Photo de profil">
				<p class="overlay">Modifier</p>
			</button>
			<div class="resume-name">
				<h1>{{ me.user_nick }}</h1>
				<h2>{{ me.user.username }}</h2>
			</div>
		</div>
		<div class="modif-data">
			<form class="modif-form">
				<h2 class="form-title">Modifier le surnom</h2>
				<div class="form-group">
					<input type="text" id="nickname" name="nickname" placeholder="Nouveau surnom">
					<button type="submit">Soumettre</button>
				</div>
			</form>
			<form class="modif-form">
				<h2 class="form-title">Modifier le nom d'utilisateur</h2>
				<div class="form-group">
					<input type="text" id="username" name="username" placeholder="Nouveau nom d'utilisateur">
					<button type="submit">Soumettre</button>
				</div>
			</form>
			<form class="modif-form">
				<h2 class="form-title">Modifier le mot de passe</h2>
				<div class="form-group">
					<input type="password" id="new-password" name="new-password" placeholder="Nouveau mot de passe">
					<button @click="updateProfile">Soumettre</button>
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped>
	.left-part {
		width: 50%;
		padding-right: 25px;
		box-sizing: border-box;
	}

	.back-button {
		position: absolute;
		padding: 0 15px;
		border: none;
		cursor: pointer;
		z-index: 10;
	}

	.back-button:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	body.light-mode .back-button:hover {
		background-color: var(--vt-c-white-mute);
	}

	.resume-container {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.resume-container button {
		margin-bottom: 20px;
		border-radius: 100px;
	}

	.resume-container img {
		border-radius: 100px;
	}

	.resume-name {
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.resume-name h1, h2 {
		margin: 0;
	}

	.resume-name h1 {
		font-size: 1.6em;
	}

	.resume-name h2 {
		font-size: 1em;
		color: var(--vt-c-text-dark-2);
	}

	body.light-mode .resume-name h2 {
		color: var(--vt-c-text-light-2);
	}

	img {
		width: 100px;
	}

	.profile-image-container {
		position: relative;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
	}

	.profile-image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: filter 0.3s ease;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0;
		transition: opacity 0.3s linear;
	}

	body.light-mode .overlay {
		background-color: rgba(200, 200, 200, 0.2);
		color: var(--vt-c-text-dark-1);
	}

	.overlay img {
		height: 50px;
		width: 50px;
		object-fit: contain;
	}

	.profile-image-container:hover img {
		filter: brightness(50%);
	}

	.profile-image-container:hover .overlay {
		opacity: 1;
	}

	.modif-data {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		width: 100%;
		max-width: 800px; /* Ajustez selon vos besoins */
		margin: 0 auto;
	}

	.modif-form {
		display: flex;
		flex-direction: column;
	}

	.form-title {
		margin-bottom: 10px;
		font-size: 1.2em;
	}

	.form-group {
		display: flex;
		gap: 10px;
	}

	input {
		flex: 1;
		padding: 10px;
		border: 1px solid var(--vt-c-divider-dark-1);
		background: transparent;
		color: var(--vt-c-text-dark-2);
	}

	body.light-mode input {
		border-color: var(--vt-c-divider-light-1);
		color: var(--vt-c-text-light-2);
	}

	.form-group button {
		width: 100px;
		padding: 10px;
		background-color: var(--vt-c-black-soft);
		border: none;
		cursor: pointer;
		white-space: nowrap;
	}

	body.light-mode .form-group button {
		background-color: var(--vt-c-white-soft);
	}

	.form-group button:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	body.light-mode .form-group button:hover {
		background-color: var(--vt-c-white-mute);
	}
</style>
