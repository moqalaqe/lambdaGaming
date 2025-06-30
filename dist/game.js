import { Grid } from "./grid.js";
export class Game {
    constructor(board, startButton, progressBar, progressBarContainer, randomButton, score, coefficient) {
        this.isGameStarted = false;
        this.mineAmount = 0;
        this.scoreValue = 300;
        this.coefValue = 1;
        this.cashoutValue = 0;
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
        this.isGameStarted = true;
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
        this.startButton.innerText = "Start Game";
        this.startButton.style.backgroundColor = "#2392d6";
        this.startButton.style.color = 'white';
        this.progressBar.style.width = `0px`;
        this.coefficient.textContent = `Next: 1`;
        this.coefValue = 1;
    }
    endGame() {
        this.isGameStarted = false;
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
    cashout() {
        this.score.innerText = `Score: ${this.cashoutValue + this.scoreValue}`;
        this.randomButton.style.pointerEvents = "none";
        this.startButton.disabled = true;
        this.endGame();
    }
    fillProgress() {
        const addWidth = this.progressBar.offsetWidth + (this.progressBarContainer.offsetWidth / (25 - this.mineAmount));
        this.progressBar.style.width = `${addWidth}px`;
        this.updateCoef();
        if (this.coefValue > 1) {
            this.cashoutValue = 10 * this.coefValue;
            this.startButton.textContent = `Cashout: ${this.cashoutValue.toFixed(2)}`;
            this.startButton.style.opacity = "1";
            this.startButton.style.backgroundColor = 'yellow';
            this.startButton.style.color = 'black';
            this.startButton.style.pointerEvents = "auto";
        }
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
