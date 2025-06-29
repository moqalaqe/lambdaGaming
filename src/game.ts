import { Grid } from "./grid.js";

export class Game {
    private grid: Grid;
    private mineAmount: number = 0;
    private scoreValue: number = 300;
    private coefValue: number = 1;

    private board: HTMLElement;
    private startButton: HTMLButtonElement;
    private progressBar: HTMLElement;
    private progressBarContainer: HTMLElement;
    private randomButton: HTMLElement;
    private score: HTMLElement;
    private coefficient: HTMLElement;

    constructor(
        board: HTMLElement,
        startButton: HTMLButtonElement,
        progressBar: HTMLElement,
        progressBarContainer: HTMLElement,
        randomButton: HTMLElement,
        score: HTMLElement,
        coefficient: HTMLElement
    ) {
        this.board = board;
        this.startButton = startButton;
        this.progressBar = progressBar;
        this.progressBarContainer = progressBarContainer;
        this.randomButton = randomButton;
        this.score = score;
        this.coefficient = coefficient;
        this.grid = new Grid(this.endGame.bind(this), this.fillProgress.bind(this));
    }

    public renderGrid(board: HTMLElement){
        this.grid.render(board);
    }

    public startGame(mineAmount: number){
        this.mineAmount = mineAmount;
        this.board.style.pointerEvents = "auto";        
        this.grid.setMines(mineAmount);
        this.startButton.style.opacity = "0.4";
        this.startButton.style.pointerEvents = "none";
        this.updateScore();
    }

    private resetGame(){
        this.grid.resetBoard();
        this.startButton.disabled = false;
        this.startButton.style.opacity = "1";
        this.startButton.style.pointerEvents = "auto";
        this.progressBar.style.width = `0px`;
        this.coefficient.textContent = `Next: 1`;
        this.coefValue = 1;
    }

    private endGame(){
        this.board.style.pointerEvents = "none";
        this.randomButton.style.opacity = "0.4";
        this.randomButton.style.pointerEvents = "none";
        this.grid.openAllSquare();
        setTimeout(() => {
            this.resetGame();
        }, 2000);
    }

    public clickRandomSquare() {
        this.grid.clickRandomSquare();
    }

    private fillProgress(){
        const addWidth = this.progressBar.offsetWidth + (this.progressBarContainer.offsetWidth / (25 - this.mineAmount));
        this.progressBar.style.width = `${addWidth}px`;
        this.updateCoef();
    }

    private updateScore(){
        this.scoreValue = Math.max(this.scoreValue - 10, 0);
        this.score.textContent = `Score: ${this.scoreValue}`;
    }

    private updateCoef(){
        this.coefValue += 0.2;
        this.coefficient.textContent = `Next: ${this.coefValue.toFixed(2)}`;
    }

}