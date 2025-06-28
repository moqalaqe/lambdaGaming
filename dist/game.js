import { Grid } from "./grid.js";
export class Game {
    constructor(startButton) {
        this.mineAmount = 0;
        this.boardElement = null;
        this.startButton = startButton;
        this.grid = new Grid(this.endGame.bind(this), this.fillProgress.bind(this));
        this.progressBar = document.getElementById("progressBar");
        this.progressBarContainer = document.getElementById("progressBarContainer");
    }
    renderGrid(board) {
        this.grid.render(board);
    }
    startGame(mineAmount, board) {
        this.mineAmount = mineAmount;
        this.boardElement = board;
        board.style.pointerEvents = "auto";
        this.grid.setMines(mineAmount);
        this.startButton.style.opacity = "0.4";
        this.startButton.style.pointerEvents = "none";
    }
    resetGame() {
        this.grid.resetBoard();
        this.startButton.disabled = false;
        this.startButton.style.opacity = "1";
        this.startButton.style.pointerEvents = "auto";
        this.progressBar.style.width = `0px`;
    }
    endGame() {
        if (this.boardElement) {
            this.boardElement.style.pointerEvents = "none";
        }
        this.grid.openAllSquare();
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }
    fillProgress() {
        console.log(this.progressBar.offsetWidth);
        const addWidth = this.progressBar.offsetWidth + (this.progressBarContainer.offsetWidth / (25 - this.mineAmount));
        this.progressBar.style.width = `${addWidth}px`;
    }
}
