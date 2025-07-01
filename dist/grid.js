import { Square } from "./square.js";
export class Grid {
    constructor(onMineClick, onSafeClick) {
        this.squares = [];
        this.onMineClick = onMineClick || (() => { });
        this.onSafeClick = onSafeClick || (() => { });
        this.generateSquareArray();
    }
    setMines(amount) {
        const mineSet = new Set();
        while (mineSet.size < amount) {
            const randomId = Math.floor(Math.random() * this.squares.length);
            mineSet.add(randomId);
        }
        mineSet.forEach(id => {
            this.squares[id].setMine();
        });
    }
    resetBoard() {
        this.squares.forEach(square => {
            square.reset();
        });
    }
    openAllSquare() {
        this.squares.forEach(square => {
            square.flipSquare();
        });
    }
    clickRandomSquare() {
        const unflipped = this.squares.filter(square => !square["isFlipped"]);
        if (unflipped.length === 0)
            return;
        const randId = Math.floor(Math.random() * unflipped.length);
        const square = unflipped[randId];
        square.element.click();
    }
    render(board) {
        board.innerHTML = "";
        board.style.display = "grid";
        board.style.gridTemplateColumns = "repeat(5, 1fr)";
        board.style.gridTemplateRows = "repeat(5, 1fr)";
        board.style.width = "455px";
        board.style.height = "365px";
        board.style.pointerEvents = "none";
        board.style.margin = "10px auto 15px";
        this.squares.forEach(square => {
            square.element.style.alignSelf = "center";
            square.element.style.justifySelf = "center";
            board.appendChild(square.element);
        });
    }
    hint() {
        const available = this.squares.filter(square => !square["isFlipped"] && !square["isMine"]);
        if (available.length === 0)
            return;
        const randomIndex = Math.floor(Math.random() * available.length);
        const hintSquare = available[randomIndex];
        hintSquare.hint();
    }
    generateSquareArray() {
        this.squares = [];
        for (let i = 0; i < 25; i++) {
            this.squares.push(new Square(this.onMineClick, this.onSafeClick));
        }
    }
}
