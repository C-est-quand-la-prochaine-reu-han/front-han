<script setup>

import { ref } from 'vue';	
import { useAuthStore } from '../stores/auth.js';
import { request_pending_friend, get_id_by_username } from '/src/jspong/main.js';

const friend_username = ref('');
const authStore = useAuthStore();
const token = authStore.token;

async function submitFriendRequest() {
	try {
		console.log('submit friend request');
		console.log(friend_username.value);
		if (friend_username.value === '') {
			alert('Username cannot be empty');
			return;
		}
		let friend_id;
		friend_id = await get_id_by_username(friend_username.value, token);
		if (friend_id === -1) {
			alert('User not found');
			return;
		}
		console.log(friend_id);
		let response = await request_pending_friend(friend_id, token);
		console.log(response);
	} catch (error) {
		console.error(error);
		alert('An error occured');
	}
}

</script>

<template>
	<div class="find-new-friends-container">
		<div class="find-new-friends">
			<button class="back-button" @click="$emit('close')">
				<h1>←</h1>
			</button>
			<div class="input-container">
				<input type="text" v-model="friend_username" placeholder="Rechercher un nom d'utilisateur">
				<button type="button" @click="submitFriendRequest">Rechercher</button>
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
		background-color: var(--vt-c-black-soft);
	}

	body.light-mode .input-container button {
		background-color: var(--vt-c-white-soft);
	}

	.input-container button:hover {
		background-color: var(--vt-c-black-mute);
	}

	input {
		flex: 1;
		padding: 10px;
		border: 1px solid var(--vt-c-divider-dark-1);
		background: var(--vt-c-black-soft);
		color: var(--vt-c-text-dark-2);
	}
</style>
