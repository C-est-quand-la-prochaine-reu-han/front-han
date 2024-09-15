<template>
	<div class="game-container">
		<canvas ref="gameCanvas" width="600" height="400"></canvas>
		<div v-if="gameOver" class="overlay game-over-overlay">
			<h2>Game Over</h2>
			<p>{{ winner }} wins!</p>
			<button @click="$emit('restart-game')">Play Again</button>
		</div>
	</div>
</template>

<script>
	export default {
		emits: ['score-update', 'game-over', 'restart-game'],
		props: ['isMenuOpen', 'isPaused'],
		data() {
			return {
				canvas: null,
				ctx: null,
				ball: { x: 300, y: 200, radius: 10, dx: 4, dy: 4 },
				paddle1: { x: 10, y: 150, width: 10, height: 100 },
				paddle2: { x: 580, y: 150, width: 10, height: 100 },
				keys: { w: false, s: false, ArrowUp: false, ArrowDown: false },
				scoreLeft: 0,
				scoreRight: 0,
				gamePaused: false,
				gameOver: false,
				winner: '',
				animationFrameId: null
			};
		},
		watch: {
			isPaused(newValue) {
				this.gamePaused = newValue
			}
		},
		mounted() {
			this.canvas = this.$refs.gameCanvas;
			this.ctx = this.canvas.getContext('2d');
			this.setupEventListeners();
			this.gameLoop();
		},
		methods: {
			setupEventListeners() {
				window.addEventListener('keydown', this.handleKeyDown);
				window.addEventListener('keyup', this.handleKeyUp);
			},
			handleKeyDown(e) {
				if (e.key in this.keys) {
					this.keys[e.key] = true;
				}
			},
			handleKeyUp(e) {
				if (e.key in this.keys) {
					this.keys[e.key] = false;
				}
			},
			togglePause() {
				if (!this.gameOver && !this.isMenuOpen) {
					this.gamePaused = !this.gamePaused;
				}
			},
			resumeGame() {
				this.gamePaused = false;
			},
			update() {
				if (!this.isPaused && !this.gameOver) {
					this.movePaddles();
					this.moveBall();
					this.checkCollisions();
				}
			},
			movePaddles() {
				if (this.keys.w && this.paddle1.y > 0) this.paddle1.y -= 5;
				if (this.keys.s && this.paddle1.y < this.canvas.height - this.paddle1.height) this.paddle1.y += 5;
				if (this.keys.ArrowUp && this.paddle2.y > 0) this.paddle2.y -= 5;
				if (this.keys.ArrowDown && this.paddle2.y < this.canvas.height - this.paddle2.height) this.paddle2.y += 5;
			},
			moveBall() {
				this.ball.x += this.ball.dx;
				this.ball.y += this.ball.dy;
			},
			checkCollisions() {
				// Ball collision with top and bottom walls
				if (this.ball.y + this.ball.radius > this.canvas.height || this.ball.y - this.ball.radius < 0) {
					this.ball.dy *= -1;
				}

				// Ball collision with paddles
				if (
					(this.ball.x - this.ball.radius < this.paddle1.x + this.paddle1.width &&
					this.ball.y > this.paddle1.y &&
					this.ball.y < this.paddle1.y + this.paddle1.height) ||
					(this.ball.x + this.ball.radius > this.paddle2.x &&
					this.ball.y > this.paddle2.y &&
					this.ball.y < this.paddle2.y + this.paddle2.height)
				) {
					this.ball.dx *= -1;
				}

				// Score points
				if (!this.gameOver) {
					if (this.ball.x + this.ball.radius < 0) {
						this.scoreRight++;
						this.resetBall();
					} else if (this.ball.x - this.ball.radius > this.canvas.width) {
						this.scoreLeft++;
						this.resetBall();
					}

					this.$emit('score-update', { left: this.scoreLeft, right: this.scoreRight });

					// Check for game over
					if (this.scoreLeft >= 11 || this.scoreRight >= 11) {
						this.gameOver = true;
						this.winner = this.scoreLeft >= 11 ? 'Left player' : 'Right player';
						this.$emit('game-over', this.winner);
					}
				}
			},
			resetBall() {
				this.ball.x = this.canvas.width / 2;
				this.ball.y = this.canvas.height / 2;
				this.ball.dx = Math.random() > 0.5 ? 4 : -4;
				this.ball.dy = Math.random() > 0.5 ? 4 : -4;
			},
			draw() {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

				// Draw middle line
				this.ctx.beginPath();
				this.ctx.setLineDash([5, 15]);
				this.ctx.moveTo(this.canvas.width / 2, 0);
				this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
				this.ctx.strokeStyle = 'white';
				this.ctx.lineWidth = 2;
				this.ctx.stroke();
				this.ctx.setLineDash([]);

				// Draw paddles
				this.ctx.fillStyle = 'white';
				this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);
				this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);

				// Draw ball
				this.ctx.beginPath();
				this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
				this.ctx.fillStyle = 'white';
				this.ctx.fill();
				this.ctx.closePath();
			},
			gameLoop() {
				this.update();
				this.draw();
				this.animationFrameId = requestAnimationFrame(this.gameLoop);
			},
			restartGame() {
				this.scoreLeft = 0;
				this.scoreRight = 0;
				this.gameOver = false;
				this.winner = '';
				this.resetBall();
				this.paddle1.y = 150;
				this.paddle2.y = 150;
			}
		},
		watch: {
			isMenuOpen(newValue) {
				if (!newValue && this.gamePaused) {
					this.resumeGame();
				}
			}
		},
		beforeUnmount() {
			window.removeEventListener('keydown', this.handleKeyDown);
			window.removeEventListener('keyup', this.handleKeyUp);
			cancelAnimationFrame(this.animationFrameId);
		}
	};
</script>

<style scoped>
.game-container {
	position: relative;
	width: 600px;
	height: 400px;
}

canvas {
	background-color: var(--vt-c-black);
	border-style: solid;
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
}

.pause-overlay, .game-over-overlay {
	z-index: 10;
}

button {
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
	background-color: #4CAF50;
	color: white;
	border: none;
	border-radius: 5px;
	margin-top: 10px;
}

button:hover {
	background-color: #45a049;
}
</style>
