import { Game } from "./game.js";

window.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board") as HTMLElement;
    const start = document.getElementById("startButton") as HTMLButtonElement;
    const numberPicker = document.getElementById("numberPicker") as HTMLSelectElement;

    const tamashi = new Game(start);
    tamashi.renderGrid(board);

    start.addEventListener("click", () => {
        const selectedMineValue = parseInt(numberPicker.value);

        if (selectedMineValue){
            tamashi.startGame(selectedMineValue, board);
            start.disabled = true;
        } else {
            console.log('select amount of mines!');
        }
    });
    
});
