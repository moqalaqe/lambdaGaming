import { Game } from "./game.js";

window.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board") as HTMLElement;
    const start = document.getElementById("startButton") as HTMLButtonElement;
    const numberPicker = document.getElementById("numberPicker") as HTMLButtonElement;
    const randomButton = document.getElementById("randomButton") as HTMLButtonElement;
    const progressBar = document.getElementById("progressBar") as HTMLElement;
    const progressBarContainer = document.getElementById("progressBarContainer") as HTMLElement;
    const score = document.getElementById("score") as HTMLElement;
    const coef = document.getElementById("coefficient") as HTMLElement;
    const hintButton = document.getElementById("hintButton") as HTMLButtonElement;

    const tamashi = new Game(numberPicker, board, start, progressBar, progressBarContainer, randomButton, score, coef, hintButton);
    tamashi.renderGrid(board);

    start.addEventListener("click", () => {
        const selectedMineValue = parseInt(numberPicker.value);
        if (selectedMineValue){
            if(!tamashi.isGameStarted) {
                tamashi.startGame(selectedMineValue);
            } else {
                tamashi.cashout();
            }
        }
    });

    numberPicker.addEventListener("change", () => {
        const selectedValue = parseInt(numberPicker.value);
        if (selectedValue) {
            start.style.opacity = "1";
            start.style.pointerEvents = "auto";
            start.disabled = false;
        } else {
            start.style.opacity = "0.4";
            start.style.pointerEvents = "none";
            start.disabled = true;
        }
    });

    randomButton.disabled = true;
    randomButton.addEventListener("click", () => {
        tamashi.clickRandomSquare();
    });

    hintButton.disabled = true;
    hintButton.addEventListener("click", ()=> {
        tamashi.hint();
    })
    
});
