import { Grid } from "./grid.js";
export class Game {
    constructor(board, startButton, progressBar, progressBarContainer, randomButton, score, coefficient) {
        this.mineAmount = 0;
        this.scoreValue = 300;
        this.coefValue = 1;
        this.board = board;
        this.startButton = startButton;
        this.progressBar = progressBar;
        this.progressBarContainer = progressBarContainer;
        this.randomButton = randomButton;
        this.score = score;
        this.coefficient = coefficient;
        this.grid = new Grid(this.endGame.bind(this), this.fillProgress.bind(this));
    }
    renderGrid(board) {
        this.grid.render(board);
    }
    startGame(mineAmount) {
        this.mineAmount = mineAmount;
        this.board.style.pointerEvents = "auto";
        this.grid.setMines(mineAmount);
        this.startButton.style.opacity = "0.4";
        this.startButton.style.pointerEvents = "none";
        this.updateScore();
    }
    resetGame() {
        this.grid.resetBoard();
        this.startButton.disabled = false;
        this.startButton.style.opacity = "1";
        this.startButton.style.pointerEvents = "auto";
        this.progressBar.style.width = `0px`;
        this.coefficient.textContent = `Next: 1`;
        this.coefValue = 1;
    }
    endGame() {
        this.board.style.pointerEvents = "none";
        this.randomButton.style.opacity = "0.4";
        this.randomButton.style.pointerEvents = "none";
        this.grid.openAllSquare();
        setTimeout(() => {
            this.resetGame();
        }, 2000);
    }
    clickRandomSquare() {
        this.grid.clickRandomSquare();
    }
    fillProgress() {
        const addWidth = this.progressBar.offsetWidth + (this.progressBarContainer.offsetWidth / (25 - this.mineAmount));
        this.progressBar.style.width = `${addWidth}px`;
        this.updateCoef();
    }
    updateScore() {
        this.scoreValue = Math.max(this.scoreValue - 10, 0);
        this.score.textContent = `Score: ${this.scoreValue}`;
    }
    updateCoef() {
        this.coefValue += 0.2;
        this.coefficient.textContent = `Next: ${this.coefValue.toFixed(2)}`;
    }
}
