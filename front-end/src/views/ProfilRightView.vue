<template>
	<div class="right-part">
		<div class="friends-list-container">
			<div>
				<h2>Liste d'ami(s)</h2>
			</div>
			<div class="friends-list">
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
				</div>
			</div>
		</div>
		<div class="pending-list-container">
			<div>
				<h2>Liste d'ami(s) en attente</h2>
			</div>
			<div class="friends-list">
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
					<button>Oui</button>
					<button>Non</button>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
					<button>Oui</button>
					<button>Non</button>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
					<button>Oui</button>
					<button>Non</button>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
					<button>Oui</button>
					<button>Non</button>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
					<button>Oui</button>
					<button>Non</button>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
					<button>Oui</button>
					<button>Non</button>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
					<button>Oui</button>
					<button>Non</button>
				</div>
				<div class="data-profil">
					<img src="../assets/business-cat.png" alt="Photo de profil">
					<p>Gisele</p>
					<button>Oui</button>
					<button>Non</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.right-part {
		width: 50%;
		padding-left: 25px;
		display: grid;
		grid-template-rows: 3fr 2fr;
	}

	h2 {
		font-size: 1.2em;
	}

	.friends-list-container {
		height: 276px;
		display: flex;
		flex-direction: column;
		padding-bottom: 20px;
	}

	.pending-list-container {
		height: 184px;
		display: flex;
		flex-direction: column;
	}

	.friends-list {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		border: 1px solid var(--vt-c-divider-dark-1);
	}

	body.light-mode .friends-list {
		border-color: var(--vt-c-divider-light-1);
	}

	.data-profil {
		display: flex;
		flex-direction: row;
		padding: 10px;
	}

	.data-profil:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	body.light-mode .data-profil:hover {
		background-color: var(--vt-c-white-mute);
	}

	.data-profil img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.data-profil p {
		width: 100%;
		margin: auto;
		margin-left: 20px;
		margin-right: 20px;
	}
</style>
