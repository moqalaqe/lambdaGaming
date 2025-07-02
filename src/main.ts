import { Game } from "./game.js";

window.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board") as HTMLElement;
    const start = document.getElementById("startButton") as HTMLButtonElement;
    const numberPicker = document.getElementById("numberPicker") as HTMLButtonElement;
    const randomButton = document.getElementById("randomButton") as HTMLButtonElement;
    const progressBar = document.getElementById("progressBar") as HTMLElement;
    const progressBarContainer = document.getElementById("progressBarContainer") as HTMLElement;
    const totalCoins = document.getElementById("totalCoins") as HTMLElement;
    const coef = document.getElementById("coefficient") as HTMLElement;
    const hintButton = document.getElementById("hintButton") as HTMLButtonElement;
    const betAmountElement = document.getElementById("betValue") as HTMLElement;
    const betContainer = document.getElementById("betContainer") as HTMLElement;

    const tamashi = new Game(numberPicker, totalCoins, coef, progressBarContainer, progressBar, board, hintButton, randomButton, start, betContainer);
    tamashi.renderGrid(board);

    start.addEventListener("click", () => {
        const selectedMineValue = parseInt(numberPicker.value);
        if (selectedMineValue){
            if(!tamashi.isGameStarted) {
                const betAmount = parseInt(betAmountElement.textContent || "10");
                tamashi.startGame(selectedMineValue, betAmount);
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
