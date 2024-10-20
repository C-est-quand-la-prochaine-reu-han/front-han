<template>
	<div class="wrapper">
		<nav>
			<button :class="{ active: toSignIn }" @click="toggleSignIn">
				Se connecter
			</button>
			<button :class="{ active: toSignUp }" @click="toggleSignUp">
				S'inscrire
			</button>
		</nav>

		<SignInComponent v-if="toSignIn" />
		<SignUpComponent v-if="toSignUp" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import SignInComponent from '@/components/login/SignInComponent.vue';
import SignUpComponent from '@/components/login/SignUpComponent.vue';

const toSignIn = ref(true);
const toSignUp = ref(false);

function toggleSignIn() {
	if (toSignIn.value) return;
	toSignIn.value = !toSignIn.value;
	toSignUp.value = !toSignUp.value;
}

function toggleSignUp() {
	if (toSignUp.value) return;
	toSignIn.value = !toSignIn.value;
	toSignUp.value = !toSignUp.value;
}
</script>

<style scoped>
.wrapper {
	margin: auto;
	width: 300px;
	height: 300px;
}

nav {
	margin-bottom: 20px;
	display: flex;
	width: 100%;
}

nav button {
	text-decoration: none;
	padding: 10px;
	transition: background-color 0.3s ease;
	flex: 1;
	text-align: center;
}

nav button:hover {
	background-color: var(--vt-c-black-mute);
}

nav button.active {
	background-color: var(--vt-c-black-soft);
}

body.light-mode nav button:hover {
	background-color: var(--vt-c-white-mute);
}

body.light-mode nav button.active {
	background-color: var(--vt-c-white-soft);
}
</style>
