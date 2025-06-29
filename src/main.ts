import { Game } from "./game.js";

window.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board") as HTMLElement;
    const start = document.getElementById("startButton") as HTMLButtonElement;
    const numberPicker = document.getElementById("numberPicker") as HTMLSelectElement;
    const randomButton = document.getElementById("randomButton") as HTMLButtonElement;
    const progressBar = document.getElementById("progressBar") as HTMLElement;
    const progressBarContainer = document.getElementById("progressBarContainer") as HTMLElement;
    const score = document.getElementById("score") as HTMLElement;
    const coef = document.getElementById("coefficient") as HTMLElement;

    const tamashi = new Game(board, start, progressBar, progressBarContainer, randomButton, score, coef);
    tamashi.renderGrid(board);

    start.style.opacity = "0.4";
    start.style.pointerEvents = "none";
    randomButton.style.opacity = "0.4";
    randomButton.style.pointerEvents = "none";
    randomButton.disabled = true;

    start.addEventListener("click", () => {
        const selectedMineValue = parseInt(numberPicker.value);

        if (selectedMineValue){
            if(!tamashi.isGameStarted) {
                tamashi.startGame(selectedMineValue);
                randomButton.style.opacity = "1";
                randomButton.style.pointerEvents = "auto";
                randomButton.disabled = false;
            } else {
                tamashi.cashout();
            }
        } else {
            console.log('select amount of mines!');
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

    randomButton.addEventListener("click", () => {
        tamashi.clickRandomSquare();
    });
    
});
