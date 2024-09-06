<template>
	<div id="game-container">
		<div v-if="gameState === 'menu'" id="menu">
			<h1>Pong Game</h1>
			<button @click="startGame">Start Game</button>
		</div>
		<div v-else-if="gameState === 'playing'" id="game">
			<div id="ball" :style="ballStyle"></div>
			<div id="paddle-left" :style="paddleLeftStyle"></div>
			<div id="paddle-right" :style="paddleRightStyle"></div>
			<div id="score">{{ scoreLeft }} - {{ scoreRight }}</div>
			<div v-if="isPaused" id="pause-screen">
				<h2>Game Paused</h2>
				<p>Press ESC to resume</p>
			</div>
		</div>
		<div v-else-if="gameState === 'gameOver'" id="game-over">
			<h2>Game Over!</h2>
			<p>{{ winner }} wins!</p>
			<button @click="restartGame">Play Again</button>
			<button @click="goToMenu">Main Menu</button>
		</div>
	</div>
</template>

<script>
	import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

	export default {
		setup(props, { emit }) {
			const ballX = ref(300)
			const ballY = ref(200)
			const ballSpeedX = ref(5)
			const ballSpeedY = ref(5)
			const paddleLeftY = ref(150)
			const paddleRightY = ref(150)
			const scoreLeft = ref(0)
			const scoreRight = ref(0)
			const paddleSpeed = 5
			const keys = ref({
				w: false,
				s: false,
				ArrowUp: false,
				ArrowDown: false
			})
			const gameState = ref('menu')
			const winner = ref('')
			const isPaused = ref(false)

			const ballStyle = computed(() => ({
				left: `${ballX.value}px`,
				top: `${ballY.value}px`
			}))

			const paddleLeftStyle = computed(() => ({
				top: `${paddleLeftY.value}px`
			}))

			const paddleRightStyle = computed(() => ({
				top: `${paddleRightY.value}px`
			}))

			const moveBall = () => {
				ballX.value += ballSpeedX.value
				ballY.value += ballSpeedY.value
			}

			const checkCollision = () => {
				if (ballY.value <= 0 || ballY.value >= 390) {
					ballSpeedY.value = -ballSpeedY.value
				}

				if (
					(ballX.value <= 20 && ballY.value >= paddleLeftY.value && ballY.value <= paddleLeftY.value + 100) ||
					(ballX.value >= 570 && ballY.value >= paddleRightY.value && ballY.value <= paddleRightY.value + 100)
				) {
					ballSpeedX.value = -ballSpeedX.value
				}

				if (ballX.value <= 0) {
					scoreRight.value++
					resetBall()
				} else if (ballX.value >= 590) {
					scoreLeft.value++
					resetBall()
				}
			}

			const resetBall = () => {
				ballX.value = 300
				ballY.value = 200
				ballSpeedX.value = -ballSpeedX.value
			}

			const updatePaddles = () => {
				if (keys.value.w && paddleLeftY.value > 0) {
					paddleLeftY.value -= paddleSpeed
				}
				if (keys.value.s && paddleLeftY.value < 300) {
					paddleLeftY.value += paddleSpeed
				}
				if (keys.value.ArrowUp && paddleRightY.value > 0) {
					paddleRightY.value -= paddleSpeed
				}
				if (keys.value.ArrowDown && paddleRightY.value < 300) {
					paddleRightY.value += paddleSpeed
				}
			}

			const gameLoop = () => {
				if (gameState.value === 'playing' && !isPaused.value) {
					moveBall()
					checkCollision()
					updatePaddles()
					requestAnimationFrame(gameLoop)
				}
			}

			const handleKeyDown = (e) => {
				if (e.key in keys.value) {
					e.preventDefault()
					keys.value[e.key] = true
				} else if (e.key === 'Escape' && gameState.value === 'playing') {
					togglePause()
				}
			}

			const handleKeyUp = (e) => {
				if (e.key in keys.value) {
					keys.value[e.key] = false
				}
			}

			const togglePause = () => {
				isPaused.value = !isPaused.value
				if (!isPaused.value) {
					gameLoop()
				}
			}

			const startGame = () => {
				gameState.value = 'playing'
				resetGame()
				gameLoop()
			}

			const resetGame = () => {
				scoreLeft.value = 0
				scoreRight.value = 0
				winner.value = ''
				isPaused.value = false
				resetBall()
			}

			const restartGame = () => {
				resetGame()
				gameState.value = 'playing'
				gameLoop()
			}

			const goToMenu = () => {
				gameState.value = 'menu'
			}

			watch([scoreLeft, scoreRight], ([newScoreLeft, newScoreRight]) => {
				if (newScoreLeft === 11) {
					gameState.value = 'gameOver'
					winner.value = 'Left player'
				} else if (newScoreRight === 11) {
					gameState.value = 'gameOver'
					winner.value = 'Right player'
				}

				// HERE !

				emit('score-update', { left: newScoreLeft, right: newScoreRight})
			})


			onMounted(() => {
				window.addEventListener('keydown', handleKeyDown)
				window.addEventListener('keyup', handleKeyUp)
			})

			onUnmounted(() => {
				window.removeEventListener('keydown', handleKeyDown)
				window.removeEventListener('keyup', handleKeyUp)
			})

			return {
				ballStyle,
				paddleLeftStyle,
				paddleRightStyle,
				scoreLeft,
				scoreRight,
				gameState,
				winner,
				isPaused,
				startGame,
				restartGame,
				goToMenu
			}
		}
	}
</script>

<style scoped>
	#game-container {
		width: 600px;
		height: 400px;
		background-color: black;
		position: relative;
		margin: auto;
	}

	#ball {
		width: 10px;
		height: 10px;
		background-color: white;
		position: absolute;
		border-radius: 50%;
	}

	#paddle-left, #paddle-right {
		width: 10px;
		height: 100px;
		background-color: white;
		position: absolute;
	}

	#paddle-left {
		left: 10px;
	}

	#paddle-right {
		right: 10px;
	}

	#score {
		color: white;
		font-size: 24px;
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
	}

	#menu, #game-over, #pause-screen {
		color: white;
		text-align: center;
		padding-top: 100px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.8);
	}

	button {
		background-color: white;
		color: black;
		border: none;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		margin: 10px;
	}

	h1 {
		font-size: 48px;
		margin-bottom: 20px;
	}

	h2 {
		font-size: 36px;
		margin-bottom: 20px;
	}
</style>
