import { Game } from "./game.js";

window.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board") as HTMLElement;
    const start = document.getElementById("startButton") as HTMLButtonElement;
    const numberPicker = document.getElementById("numberPicker") as HTMLSelectElement;

    const tamashi = new Game(start);

    tamashi.grid.render(board);

    start.addEventListener("click", () => {
        console.log("Start button clicked!");
        const selectedValue = parseInt(numberPicker.value);
        if (selectedValue){
            console.log("Mineamont:", selectedValue);
            tamashi.startGame(selectedValue, board);
            start.disabled = true;
        } else {
            console.log('select amount of mines!');
        }
    });
    
});
