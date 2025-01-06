const columns = 7;
const rows = 6;
let currentPlayer = 'red';
let gameBoard = [];

const gameBoardDiv = document.getElementById('gameBoard');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

function createBoard() {
    gameBoardDiv.innerHTML = '';
    gameBoard = [];
    
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.column = c;
            cell.addEventListener('click', handleCellClick);
            gameBoardDiv.appendChild(cell);
            row.push('');
        }
        gameBoard.push(row);
    }
}

function handleCellClick(event) {
    const column = event.target.dataset.column;

    for (let r = rows - 1; r >= 0; r--) {
        if (gameBoard[r][column] === '') {
            gameBoard[r][column] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row="${r}"][data-column="${column}"]`);
            cell.classList.add(currentPlayer);
            if (checkWin(r, column)) {
                statusDiv.textContent = `${capitalize(currentPlayer)} wins!`;
                endGame();
                return;
            } else if (checkDraw()) {
                statusDiv.textContent = "It's a draw!";
                endGame();
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            statusDiv.textContent = `${capitalize(currentPlayer)}'s turn`;
            break;
        }
    }
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||
        checkDirection(row, col, 0, 1) ||
        checkDirection(row, col, 1, 1) ||
        checkDirection(row, col, 1, -1)
    );
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 0;

    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;

        if (r >= 0 && r < rows && c >= 0 && c < columns && gameBoard[r][c] === currentPlayer) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    return false;
}

function checkDraw() {
    return gameBoard.every(row => row.every(cell => cell !== ''));
}

function endGame() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

resetButton.addEventListener('click', createBoard);

createBoard();