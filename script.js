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
