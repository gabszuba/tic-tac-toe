const gameBoard = (() => {
    const gameBoardElement = document.getElementById("game-board");
    
    let board = ["", "", "", "", "", "", "", "", ""]; // Use let instead of const

    const renderBoard = () => {
        board.forEach((cell) => {
            const cellElement = document.createElement("div");
            cellElement.textContent = cell;
            cellElement.classList.add("cell");
            gameBoardElement.appendChild(cellElement);
        });
    };

    const getBoard = () => board;

    const clearBoard = () => { 
        const cellElements = gameBoardElement.querySelectorAll(".cell");
        cellElements.forEach((cell, index) => {
            board[index] = ""; 
            cell.textContent = "";
        });
    }
      
    return {
        renderBoard, 
        clearBoard,
        getBoard   
    };
})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    
    return { 
        getName, 
        getMarker
    }
};

function checkForWin(board, marker) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (board[a] === marker && board[b] === marker && board[c] === marker) {
            return true; 
        }
    }
    return false; 
}

function displayWinner(winner) {
    const winnerText = document.createElement("p");
    winnerText.textContent = `${winner.getName()} wins!`;
    document.body.insertBefore(winnerText, document.getElementById("game-board"));
}


const gameController = (() => {
    const startButton = document.getElementById("start-button");
    const board = gameBoard.getBoard();
    let winner = false; 

    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");

    let currentPlayer = player1;

    startButton.addEventListener("click", () => {
        gameBoard.renderBoard();
        startButton.style.display = "none";

        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                if (!winner && cell.textContent === "") {
                    board[index] = cell.textContent = currentPlayer.getMarker();
                    console.log(board);
                    winner = checkForWin(board, currentPlayer.getMarker());
                    if (winner) {
                        displayWinner(currentPlayer);
                        createRestartButton();
                    } else {
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                    }
                }
            });
        });
    });

    function createRestartButton() {
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart Game";
        restartButton.id = "restart-button";
        restartButton.addEventListener("click", () => {
            restartGame();
        });
        document.body.insertBefore(restartButton, document.getElementById("game-board"));
    }

    const restartGame = () => {
        winner = false; 
        gameBoard.clearBoard();

        const restartButton = document.getElementById("restart-button");
        if (restartButton) {
            restartButton.remove();
        }

        const winnerText = document.querySelector("p");
        winnerText.remove();
    };
})();
