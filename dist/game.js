import { Grid } from "./grid.js";
export class Game {
    constructor(numberPicker, score, coefficient, progressBarContainer, progressBar, board, hintButton, randomButton, startButton, betContainer) {
        this.isGameStarted = false;
        this.mineAmount = 0;
        this.totalCoins = 100;
        this.coefValue = 1;
        this.cashoutValue = 0;
        this.isHintUsed = false;
        this.betAmount = 10;
        this.numberPicker = numberPicker;
        this.board = board;
        this.startButton = startButton;
        this.progressBar = progressBar;
        this.progressBarContainer = progressBarContainer;
        this.randomButton = randomButton;
        this.score = score;
        this.coefficient = coefficient;
        this.grid = new Grid(this.endGame.bind(this), this.fillProgress.bind(this));
        this.hintButton = hintButton;
        this.betContainer = betContainer;
    }
    renderGrid(board) {
        this.grid.render(board);
    }
    startGame(mineAmount, betAmount) {
        this.isGameStarted = true;
        this.mineAmount = mineAmount;
        this.betAmount = betAmount;
        this.numberPicker.disabled = true;
        this.numberPicker.style.pointerEvents = "none";
        this.board.style.pointerEvents = "auto";
        this.hintButton.disabled = false;
        this.randomButton.style.opacity = "1";
        this.randomButton.style.pointerEvents = "auto";
        this.randomButton.disabled = false;
        this.startButton.style.opacity = "0.4";
        this.startButton.style.pointerEvents = "none";
        this.betContainer.style.pointerEvents = "none";
        this.betContainer.style.opacity = "0.4";
        this.grid.setMines(mineAmount);
        this.decreaseScore();
    }
    endGame() {
        this.isGameStarted = false;
        this.isHintUsed = false;
        this.hintButton.disabled = true;
        this.hintButton.style.opacity = "0.4";
        this.hintButton.style.pointerEvents = "none";
        this.randomButton.disabled = true;
        this.randomButton.style.opacity = "0.4";
        this.randomButton.style.pointerEvents = "none";
        this.startButton.disabled = true;
        this.startButton.style.opacity = "0.4";
        this.startButton.style.pointerEvents = "none";
        this.grid.openAllSquare();
        this.board.style.pointerEvents = "none";
        setTimeout(() => {
            this.resetGame();
        }, 2000);
    }
    resetGame() {
        this.grid.resetBoard();
        this.numberPicker.disabled = false;
        this.numberPicker.style.pointerEvents = "auto";
        this.coefficient.textContent = `Next: 1`;
        this.progressBar.style.width = `0px`;
        this.startButton.disabled = false;
        this.startButton.innerText = "Start Game";
        this.startButton.style.backgroundColor = "#2392d6";
        this.startButton.style.color = 'white';
        this.startButton.style.opacity = "1";
        this.startButton.style.pointerEvents = "auto";
        this.betContainer.style.pointerEvents = "auto";
        this.betContainer.style.opacity = "1";
        this.coefValue = 1;
        this.checkBet(this.betAmount);
    }
    cashout() {
        this.totalCoins = Math.floor(this.cashoutValue + this.totalCoins);
        this.score.innerText = `Score: ${this.totalCoins}`;
        this.endGame();
    }
    clickRandomSquare() {
        this.grid.clickRandomSquare();
    }
    checkBet(betAmount) {
        if (this.mineAmount > 0) {
            if ((betAmount > this.totalCoins)) {
                this.startButton.style.pointerEvents = "none";
                this.startButton.disabled = true;
                this.startButton.innerText = "Not Enough Coins";
            }
            else {
                this.startButton.style.opacity = "1";
                this.startButton.style.pointerEvents = "auto";
                this.startButton.disabled = false;
                this.startButton.innerText = "Start Game";
            }
        }
    }
    fillProgress() {
        if (this.isGameStarted) {
            const addWidth = this.progressBar.offsetWidth + (this.progressBarContainer.offsetWidth / (25 - this.mineAmount));
            this.progressBar.style.width = `${addWidth}px`;
            this.nextCoef();
            if (this.coefValue > 1) {
                this.activateCashoutBtn();
                if (!this.isHintUsed) {
                    this.activateHintBtn();
                }
            }
            const percent = (this.progressBar.offsetWidth / this.progressBarContainer.offsetWidth) * 100;
            if (percent > 98) {
                this.cashout();
            }
        }
    }
    decreaseScore() {
        this.totalCoins = Math.max(Math.floor(this.totalCoins - this.betAmount), 0);
        this.score.textContent = `Score: ${this.totalCoins}`;
    }
    nextCoef() {
        this.coefValue += 0.2;
        this.coefficient.textContent = `Next: ${this.coefValue.toFixed(2)}`;
    }
    activateCashoutBtn() {
        this.cashoutValue = this.betAmount * (this.coefValue - 0.2);
        this.startButton.textContent = `Cashout: ${this.cashoutValue.toFixed(2)}`;
        this.startButton.style.opacity = "1";
        this.startButton.style.backgroundColor = 'yellow';
        this.startButton.style.color = 'black';
        this.startButton.style.pointerEvents = "auto";
    }
    activateHintBtn() {
        this.hintButton.style.opacity = "1";
        this.hintButton.style.pointerEvents = "auto";
    }
    hint() {
        this.isHintUsed = true;
        this.grid.hint();
        this.hintButton.disabled = true;
        this.hintButton.style.opacity = "0.4";
        this.hintButton.style.pointerEvents = "none";
    }
}
