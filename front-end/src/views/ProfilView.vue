<template>
	<div class="profil-container">
		<div class="left-part">
			<div class="resume-container">
				<button class="profile-image-container">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<div class="overlay">
						<p>Modifier</p>
					</div>
				</button>
				<div class="resume-name">
					<p>SURNOM</p>
					<p>NOM D'UTILISATEUR</p>
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
						<button type="submit">Soumettre</button>
					</div>
				</form>
		</div>

		</div>
		<div class="right-part">
			<div>
				<p>Liste d'ami(s) :</p>
				<div>
					<!-- Liste deroulante -->
				</div>
			</div>
			<div>
				<p>Liste d'ami(s) en attente :</p>
				<div>
					<!-- Liste deroulante -->
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.profil-container {
		display: flex;
		flex-direction: row;
		margin: auto;
	}

	.left-part {
		width: 50%;
	}

	.right-part {
		width: 50%;
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

	.resume-container button:hover {
		background-color: rgba(0, 0, 0, 0.2);
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

	.resume-name p {
		margin: 0;
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

	.left-part {
		width: 50%;
		padding-right: 20px; /* Ajoute un peu d'espace à droite */
		box-sizing: border-box; /* Inclut le padding dans la largeur */
	}

	.modif-data {
		max-width: 100%; /* Change de 500px à 100% */
		margin: 0 auto;
	}

	.form-group {
		display: flex;
		gap: 10px;
		flex-direction: row;
	}

	input {
		flex: 1; /* Permet à l'input de prendre tout l'espace disponible */
		padding: 10px;
		border: 1px solid var(--vt-c-divider-dark-1);
		background: transparent;
		color: var(--vt-c-text-dark-2);
	}

	.form-group button {
		width: 100px;
		padding: 10px;
		background-color: var(--vt-c-black-soft);
		border: none;
		color: var(--vt-c-text-dark-1);
		cursor: pointer;
		white-space: nowrap; /* Empêche le texte de passer à la ligne */
	}
</style>
