import { Grid } from "./grid.js";

export class Game {
    public grid: Grid;
    private gridElement: HTMLElement | null = null;
    private startButton: HTMLButtonElement;

    constructor(startButton: HTMLButtonElement) {
        this.startButton = startButton;
        this.grid = new Grid(this.endGame.bind(this));
    }

    startGame(mineAmount: number, board: HTMLElement){
        this.gridElement = board;
        board.style.pointerEvents = "auto";
        this.grid.setMines(mineAmount);
        this.startButton.style.opacity = "0.4";
        this.startButton.style.pointerEvents = "none";
    }

    resetGame(){
        this.grid.resetBoard();
        this.startButton.disabled = false;
        this.startButton.style.opacity = "1";
        this.startButton.style.pointerEvents = "auto";
    }

    endGame(){
        if(this.gridElement){
            this.gridElement.style.pointerEvents = "none";
        }
        this.grid.openAllSquare();
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }
}