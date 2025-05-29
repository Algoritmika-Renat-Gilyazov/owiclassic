document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('container');
    const player = document.getElementById('player');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart-button');

    const gameWidth = gameContainer.offsetWidth;
    const gameHeight = gameContainer.offsetHeight;
    const playerSize = player.offsetWidth;
    const dotSize = 15;

    let playerX, playerY;
    let score = 0;
    let gameOver = false;
    let dots = [];
    let moveInterval;

    const numDots = 3;


    function initGame() {
        gameOver = false;
        score = 0;
        player.style.backgroundColor = 'red';
        scoreDisplay.textContent = score;
        restartButton.style.display = 'none';

        dots.forEach(dot => dot.remove());
        dots = [];

        playerX = gameWidth / 2 - playerSize / 2;
        playerY = gameHeight / 2 - playerSize / 2;
        player.style.left = `${playerX}px`;
        player.style.top = `${playerY}px`;

        generateDots();

        if (moveInterval) clearInterval(moveInterval);
        moveInterval = setInterval(() => {
            if (!gameOver) {
                score++;
                scoreDisplay.textContent = score;
            }
        }, 100);

        document.addEventListener('keydown', handleKeyPress);
    }

    function generateDots() {
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');

            let dotX = Math.random() * (gameWidth - dotSize);
            let dotY = Math.random() * (gameHeight - dotSize);

            dot.style.left = `${dotX}px`;
            dot.style.top = `${dotY}px`;
            gameContainer.appendChild(dot);
            dots.push(dot);
        }
    }

    const moveSpeed = 10;

    function handleKeyPress(event) {
        if (gameOver) return;

        let newPlayerX = playerX;
        let newPlayerY = playerY;

        switch (event.key) {
            case 'w': // Up
            case 'W':
                newPlayerY -= moveSpeed;
                break;
            case 's': // Down
            case 'S':
                newPlayerY += moveSpeed;
                break;
            case 'a': // Left
            case 'A':
                newPlayerX -= moveSpeed;
                break;
            case 'd': // Right
            case 'D':
                newPlayerX += moveSpeed;
                break;
            default:
                return;
        }

        newPlayerX = Math.max(0, Math.min(newPlayerX, gameWidth - playerSize));
        newPlayerY = Math.max(0, Math.min(newPlayerY, gameHeight - playerSize));

        playerX = newPlayerX;
        playerY = newPlayerY;

        player.style.left = `${playerX}px`;
        player.style.top = `${playerY}px`;

        checkCollision();
    }

    function checkCollision() {
        dots.forEach(dot => {
            const dotRect = dot.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();

            if (
                playerRect.left < dotRect.right &&
                playerRect.right > dotRect.left &&
                playerRect.top < dotRect.bottom &&
                playerRect.bottom > dotRect.top
            ) {
                endGame();
            }
        });
    }

    function endGame() {
        if (gameOver) return;
        gameOver = true;
        clearInterval(moveInterval);
        document.removeEventListener('keydown', handleKeyPress);

        player.style.backgroundColor = 'black';
        alert(`Game Over! Score: ${score}.`);
        restartButton.style.display = 'block';
    }

    restartButton.addEventListener('click', initGame);

    initGame();
});