<template>
	<div class="profil-container">
		<div class="left-part">
			<div class="profil-picture">
				<button class="profile-image-container">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<div class="overlay">
						<img src="../assets/pencil.svg" alt="">
					</div>
				</button>
				<p>DISPLAYNAME</p>
			</div>
			<div class="personal-data">
				<div>
					<p>Username : USERNAME</p>
				</div>
				<div>
					<p>Modifier le surnom :</p>
					<input type="text" placeholder="Nouveau surnom">
				</div>
				<div>
					<p>Modifier le nom d'utilisateur :</p>
					<input type="text" placeholder="Nouveau nom d'utilisateur">
				</div>
				<div>
					<p>Modifier le mot de passe :</p>
					<input type="password" placeholder="Mot de passe actuel">
					<input type="password" placeholder="Nouveau mot de passe">
				</div>
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

	.profil-picture {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.profil-picture button {
		margin-bottom: 20px;
		border-radius: 100px;
	}

	.profil-picture button:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}

	.profil-picture img {
		border-radius: 100px;
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

</style>
