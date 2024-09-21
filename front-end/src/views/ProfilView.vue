<template>
	<div class="profil-container">
		<div class="left-part">
			<div class="profil-picture">
				<img src="../assets/business-cat.png" alt="Photo de profil">
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
	}

	img {
		width: 100px;
	}
</style>
