import { Grid } from "./grid.js";

export class Game {
    private grid: Grid;
    private mineAmount: number = 0;
    private boardElement: HTMLElement | null = null;
    private startButton: HTMLButtonElement;
    private progressBar: HTMLElement;
    private progressBarContainer: HTMLElement;


    constructor(startButton: HTMLButtonElement) {
        this.startButton = startButton;
        this.grid = new Grid(this.endGame.bind(this), this.fillProgress.bind(this));
        this.progressBar = document.getElementById("progressBar") as HTMLElement;
        this.progressBarContainer = document.getElementById("progressBarContainer") as HTMLElement;
    }

    public renderGrid(board: HTMLElement){
        this.grid.render(board);
    }

    public startGame(mineAmount: number, board: HTMLElement){
        this.mineAmount = mineAmount;
        this.boardElement = board;
        board.style.pointerEvents = "auto";
        this.grid.setMines(mineAmount);
        this.startButton.style.opacity = "0.4";
        this.startButton.style.pointerEvents = "none";
    }

    private resetGame(){
        this.grid.resetBoard();
        this.startButton.disabled = false;
        this.startButton.style.opacity = "1";
        this.startButton.style.pointerEvents = "auto";
        this.progressBar.style.width = `0px`;
    }

    private endGame(){
        if(this.boardElement){
            this.boardElement.style.pointerEvents = "none";
        }
        this.grid.openAllSquare();
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }

    private fillProgress(){
        console.log(this.progressBar.offsetWidth);
        const addWidth = this.progressBar.offsetWidth + (this.progressBarContainer.offsetWidth / (25 - this.mineAmount));
        this.progressBar.style.width = `${addWidth}px`;
    }


}