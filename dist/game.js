import { Grid } from "./grid.js";
export class Game {
    constructor(startButton) {
        this.gridElement = null;
        this.startButton = startButton;
        this.grid = new Grid(this.endGame.bind(this));
    }
    startGame(mineAmount, board) {
        this.gridElement = board;
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
    }
    endGame() {
        if (this.gridElement) {
            this.gridElement.style.pointerEvents = "none";
        }
        this.grid.openAllSquare();
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }
}
