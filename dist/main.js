import { Game } from "./game.js";
window.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const start = document.getElementById("startButton");
    const numberPicker = document.getElementById("numberPicker");
    const tamashi = new Game(start);
    tamashi.renderGrid(board);
    start.addEventListener("click", () => {
        const selectedMineValue = parseInt(numberPicker.value);
        if (selectedMineValue) {
            tamashi.startGame(selectedMineValue, board);
            start.disabled = true;
        }
        else {
            console.log('select amount of mines!');
        }
    });
});
