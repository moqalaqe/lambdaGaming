import { Grid } from "./grid.js";

export class Game {
    public isGameStarted: boolean = false;
    private mineAmount: number = 0;
    private totalCoins: number = 100;
    private coefValue: number = 1;
    private cashoutValue: number = 0;
    private isHintUsed: boolean = false;
    private betAmount: number = 10;

    private grid: Grid;
    private numberPicker: HTMLButtonElement;
    private score: HTMLElement;
    private coefficient: HTMLElement;
    private progressBarContainer: HTMLElement;
    private progressBar: HTMLElement;
    private board: HTMLElement;
    private hintButton: HTMLButtonElement;
    private randomButton: HTMLButtonElement;
    private startButton: HTMLButtonElement;

    private betContainer: HTMLElement;
    
    constructor(
        numberPicker: HTMLButtonElement,
        score: HTMLElement,
        coefficient: HTMLElement,
        progressBarContainer: HTMLElement,
        progressBar: HTMLElement,
        board: HTMLElement,
        hintButton: HTMLButtonElement,
        randomButton: HTMLButtonElement,
        startButton: HTMLButtonElement,
        betContainer: HTMLElement
    ) {
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

    public renderGrid(board: HTMLElement){
        this.grid.render(board);
    }

    public startGame(mineAmount: number, betAmount: number){
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

    private endGame(){
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

    private resetGame(){
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

    public cashout() {
        this.totalCoins = Math.floor(this.cashoutValue + this.totalCoins);
        this.score.innerText = `Score: ${this.totalCoins}`;
        this.endGame();
    }

    public clickRandomSquare() {
        this.grid.clickRandomSquare();
    }

    public checkBet(betAmount: number) {
        if(this.mineAmount > 0){
            if ((betAmount > this.totalCoins)) {
                this.startButton.style.pointerEvents = "none";
                this.startButton.disabled = true;
                this.startButton.innerText = "Not Enough Coins";
            } else {
                this.startButton.style.opacity = "1";
                this.startButton.style.pointerEvents = "auto";
                this.startButton.disabled = false;
                this.startButton.innerText = "Start Game";
            }
        }
    }

    private fillProgress(){
        if(this.isGameStarted){
            const addWidth = this.progressBar.offsetWidth + (this.progressBarContainer.offsetWidth / (25 - this.mineAmount));
            this.progressBar.style.width = `${addWidth}px`;
            this.nextCoef();
            if(this.coefValue > 1) {
                this.activateCashoutBtn();
                if(!this.isHintUsed){
                    this.activateHintBtn();
                }
            }
        }
    }

    private decreaseScore() {
        this.totalCoins = Math.max(Math.floor(this.totalCoins - this.betAmount), 0);
        this.score.textContent = `Score: ${this.totalCoins}`;
    }

    private nextCoef(){
        this.coefValue += 0.2;
        this.coefficient.textContent = `Next: ${this.coefValue.toFixed(2)}`;
    }

    private activateCashoutBtn(){
        this.cashoutValue = this.betAmount * (this.coefValue - 0.2);
        this.startButton.textContent = `Cashout: ${this.cashoutValue.toFixed(2)}`
        this.startButton.style.opacity = "1";
        this.startButton.style.backgroundColor = 'yellow';
        this.startButton.style.color = 'black';
        this.startButton.style.pointerEvents = "auto";
    }

    private activateHintBtn(){
        this.hintButton.style.opacity = "1";
        this.hintButton.style.pointerEvents = "auto";
    }

    public hint(){
        this.isHintUsed = true;
        this.grid.hint();
        this.hintButton.disabled = true;
        this.hintButton.style.opacity = "0.4";
        this.hintButton.style.pointerEvents = "none";
    }

}