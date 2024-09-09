<script setup>
import { ref } from 'vue'
import GameView from './views/GameView.vue'

const isLightMode = ref(false)
const scoreLeft = ref(0)
const scoreRight = ref(0)
const gameWinner = ref('')
const gameStarted = ref(false)

function toggleTheme() {
  isLightMode.value = !isLightMode.value
  document.body.classList.toggle('light-mode')
}

function updateScore(scores) {
  scoreLeft.value = scores.left
  scoreRight.value = scores.right
}

function handleGameOver(winner) {
  gameWinner.value = winner
  gameStarted.value = false
}

function startGame() {
  scoreLeft.value = 0
  scoreRight.value = 0
  gameWinner.value = ''
  gameStarted.value = true
}
</script>

<template>
	<header>
		<nav>
			<RouterLink to="/">
				<img v-if="!isLightMode" src="/src/assets/menu-burger-white.png" alt="Menu" class="icon">
				<img v-else src="/src/assets/menu-burger-black.png" alt="Menu" class="icon">
			</RouterLink>
		</nav>
		<div>
			<h1>ft_transcendence</h1>
		</div>
		<div>
			<button @click="toggleTheme">
				<img v-if="!isLightMode" src="/src/assets/switch-on.png" alt="Mode clair" class="icon">
				<img v-else src="/src/assets/switch-off.png" alt="Mode sombre" class="icon">
			</button>
			<img src="/src/assets/moon.png" alt="Moon" class="icon">
		</div>
	</header>

  <main>
    <div v-if="!gameStarted" class="game-start">
      <button @click="startGame">Start Game</button>
      <p v-if="gameWinner">{{ gameWinner }} a gagné la partie !</p>
    </div>
    <GameView v-if="gameStarted" 
      @score-update="updateScore" 
      @game-over="handleGameOver" 
    />
  </main>

  <footer>
    <div>
      <p>{{ scoreLeft }}</p>
    </div>
    <div class="vertical-bar">
      <p>{{ scoreRight }}</p>
    </div>
	</footer>
</template>
