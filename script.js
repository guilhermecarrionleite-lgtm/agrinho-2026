const container = document.getElementById('game-container');
const player = document.getElementById('player-ship');
const scoreDisplay = document.getElementById('score');
const healthDisplay = document.getElementById('health');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreDisplay = document.getElementById('final-score');

// Configurações do Jogo
let score = 0;
let health = 100;
let gameActive = false;
let playerX = 275;
const playerSpeed = 15;
let keysPressed = {};

// Loops (Intervalos)
let gameLoopInterval;
let spawnInterval;

// Emojis que representam ameaças ao Agro Sustentável
// ☁️ (Poluição), 🚜 (Maquinário desregulado/Antigo), 🪵 (Desmatamento)
const threats = ['☁️', '🚜', '🪵'];

// Ouvintes de Eventos (Teclado)
window.addEventListener('keydown', (e) => { keysPressed[e.code] = true; });
window.addEventListener('keyup', (e) => { keysPressed[e.code] = false; });
