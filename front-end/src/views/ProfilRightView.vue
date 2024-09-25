<template>
	<div class="right-part">
		<div>
			<h2>Liste d'ami(s)</h2>
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
		<div>
			<h2>Liste d'ami(s) en attente</h2>
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

	.friends-list {
		width: 100%;
		height: 50%;
		overflow-y: auto;
		border: 10px solid green;
		background-color: red;
	}

	.data-profil {
		display: flex;
		flex-direction: row;
	}

	.data-profil img {
		width: 20px;
		height: 20px;
	}
</style>
