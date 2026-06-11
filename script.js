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

// Botões para iniciar/reiniciar
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);

function startGame() {
    score = 0;
    health = 100;
    playerX = 275;
    gameActive = true;
    keysPressed = {};
    
    scoreDisplay.innerText = score;
    healthDisplay.innerText = health;
    player.style.left = `${playerX}px`;

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Limpa elementos de partidas anteriores
    document.querySelectorAll('.threat, .capsule').forEach(el => el.remove());

    // Inicializa os loops do motor do jogo
    gameLoopInterval = setInterval(updateGame, 1000 / 60); // 60 FPS
    spawnInterval = setInterval(spawnThreat, 900); // Nova ameaça a cada 0.9s
}

// Lógica Principal de Atualização
function updateGame() {
    if (!gameActive) return;

    // Movimentação da Nave
    if (keysPressed['ArrowLeft'] && playerX > 10) {
        playerX -= playerSpeed;
        player.style.left = `${playerX}px`;
    }
    if (keysPressed['ArrowRight'] && playerX < 540) {
        playerX += playerSpeed;
        player.style.left = `${playerX}px`;
    }

    // Disparo (Garante que só atira uma vez por clique na barra de espaço)
    if (keysPressed['Space']) {
        createCapsule();
        keysPressed['Space'] = false; // Evita rajada contínua segurando o botão
    }

    // Mover as Cápsulas Ecológicas (Subindo)
    const capsules = document.querySelectorAll('.capsule');
    capsules.forEach(capsule => {
        let currentBottom = parseFloat(capsule.style.bottom);
        if (currentBottom > 700) {
            capsule.remove();
        } else {
            capsule.style.bottom = `${currentBottom + 10}px`;
        }
    });

    // Mover Ameaças Ambientais (Descendo)
    const activeThreats = document.querySelectorAll('.threat');
    activeThreats.forEach(threat => {
        let currentTop = parseFloat(threat.style.top);
        
        if (currentTop > 650) { 
            // Ameaça não neutralizada chegou à base (Impacto ambiental negativo)
            health -= 15;
            if (health < 0) health = 0;
            healthDisplay.innerText = health;
            threat.remove();
            
            if (health <= 0) {
                endGame();
            }
        } else {
            threat.style.top = `${currentTop + 4}px`;
        }

        // Detectar colisões entre Cápsulas e Ameaças
        capsules.forEach(capsule => {
            if (isColliding(capsule, threat)) {
                capsule.remove();
                threat.remove();
                score += 10;
                scoreDisplay.innerText = score;
            }
        });
    });
}

// Criar Cápsula de Semente / Biofertilizante
function createCapsule() {
    const capsule = document.createElement('div');
    capsule.classList.add('capsule');
    capsule.style.left = `${playerX + 21}px`; // Centraliza o disparo na nave
    capsule.style.bottom = '80px';
    container.appendChild(capsule);
}

// Criar Ameaças na parte superior
function spawnThreat() {
    if (!gameActive) return;

    const threat = document.createElement('div');
    threat.classList.add('threat');
    threat.innerText = threats[Math.floor(Math.random() * threats.length)];
    threat.style.top = '0px';
    threat.style.left = `${Math.random() * 550 + 10}px`;
    
    container.appendChild(threat);
}

// Função para checar colisão (AABB)
function isColliding(rect1, rect2) {
    const r1 = rect1.getBoundingClientRect();
    const r2 = rect2.getBoundingClientRect();

    return !(
        r1.top > r2.bottom ||
        r1.bottom < r2.top ||
        r1.right < r2.left ||
        r1.left > r2.right
    );
}

// Finalizar o Jogo
function endGame() {
    gameActive = false;
    clearInterval(gameLoopInterval);
    clearInterval(spawnInterval);
    finalScoreDisplay.innerText = score;
    gameOverScreen.classList.remove('hidden');
}
