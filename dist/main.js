import { Game } from "./game.js";
window.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const start = document.getElementById("startButton");
    const numberPicker = document.getElementById("numberPicker");
    const randomButton = document.getElementById("randomButton");
    const progressBar = document.getElementById("progressBar");
    const progressBarContainer = document.getElementById("progressBarContainer");
    const totalCoins = document.getElementById("totalCoins");
    const coef = document.getElementById("coefficient");
    const hintButton = document.getElementById("hintButton");
    const betAmountElement = document.getElementById("betValue");
    const betContainer = document.getElementById("betContainer");
    const tamashi = new Game(numberPicker, totalCoins, coef, progressBarContainer, progressBar, board, hintButton, randomButton, start, betContainer);
    tamashi.renderGrid(board);
    start.addEventListener("click", () => {
        const selectedMineValue = parseInt(numberPicker.value);
        if (selectedMineValue) {
            if (!tamashi.isGameStarted) {
                const betAmount = parseInt(betAmountElement.textContent || "10");
                tamashi.startGame(selectedMineValue, betAmount);
            }
            else {
                tamashi.cashout();
            }
        }
    });
    numberPicker.addEventListener("change", () => {
        const selectedValue = parseInt(numberPicker.value);
        if (selectedValue) {
            start.style.opacity = "1";
            start.style.pointerEvents = "auto";
        }
        else {
            start.style.opacity = "0.4";
            start.style.pointerEvents = "none";
        }
    });
    randomButton.disabled = true;
    randomButton.addEventListener("click", () => {
        tamashi.clickRandomSquare();
    });
    hintButton.disabled = true;
    hintButton.addEventListener("click", () => {
        tamashi.hint();
    });
    betContainer.addEventListener("click", (event) => {
        const target = event.target;
        const betAmount = parseInt(betAmountElement.textContent || "10");
        if (target.id === "increaseBtn" || target.id === "decreaseBtn") {
            tamashi.checkBet(betAmount);
        }
    });
});
