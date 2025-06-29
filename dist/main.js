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
    const tamashi = new Game(board, start, progressBar, progressBarContainer, randomButton, score, coef);
    tamashi.renderGrid(board);
    start.style.opacity = "0.4";
    start.style.pointerEvents = "none";
    randomButton.style.opacity = "0.4";
    randomButton.style.pointerEvents = "none";
    randomButton.disabled = true;
    start.addEventListener("click", () => {
        const selectedMineValue = parseInt(numberPicker.value);
        if (selectedMineValue) {
            tamashi.startGame(selectedMineValue);
            randomButton.style.opacity = "1";
            randomButton.style.pointerEvents = "auto";
            randomButton.disabled = false;
        }
        else {
            console.log('select amount of mines!');
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
    randomButton.addEventListener("click", () => {
        tamashi.clickRandomSquare();
    });
});
