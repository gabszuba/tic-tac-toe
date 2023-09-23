const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const renderBoard = () => {
        const gameBoardElement = document.getElementById("game-board");
        board.forEach((cell) => {
            const cellElement = document.createElement("div");
            cellElement.textContent = cell;
            cellElement.classList.add("cell");
            gameBoardElement.appendChild(cellElement);
        });
    };

    const getBoard = () => board;
    
    return {
        renderBoard,
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

const gameController = (() => {
    const startButton = document.getElementById("start-button");
    const board = gameBoard.getBoard();
    
    let player1 = Player("Player 1", "X");
    let player2 = Player("Player2", "O");
    currentPlayer = player1; 

    startButton.addEventListener("click", () => {
        gameBoard.renderBoard(); 
        startButton.disabled = true; 

        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                if (cell.textContent === "") {
                    board[index] = cell.textContent = currentPlayer.getMarker();
                    console.log(board);
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                }
            });
        });
    });
})();




