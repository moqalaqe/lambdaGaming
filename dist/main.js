import { Game } from "./game.js";
window.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const start = document.getElementById("startButton");
    const numberPicker = document.getElementById("numberPicker");
    const randomButton = document.getElementById("randomButton");
    const progressBar = document.getElementById("progressBar");
    const progressBarContainer = document.getElementById("progressBarContainer");
    const score = document.getElementById("score");
    const coef = document.getElementById("coefficient");
    const hintButton = document.getElementById("hintButton");
    const tamashi = new Game(numberPicker, board, start, progressBar, progressBarContainer, randomButton, score, coef, hintButton);
    tamashi.renderGrid(board);
    start.addEventListener("click", () => {
        const selectedMineValue = parseInt(numberPicker.value);
        if (selectedMineValue) {
            if (!tamashi.isGameStarted) {
                tamashi.startGame(selectedMineValue);
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
            start.disabled = false;
        }
        else {
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
    hintButton.addEventListener("click", () => {
        tamashi.hint();
    });
});
