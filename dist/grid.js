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
    render(container) {
        container.innerHTML = "";
        container.style.display = "grid";
        container.style.gridTemplateColumns = "repeat(5, 1fr)";
        container.style.gridTemplateRows = "repeat(5, 1fr)";
        container.style.gap = "10px";
        container.style.width = "100%";
        container.style.height = "400px";
        container.style.pointerEvents = "none";
        this.squares.forEach(square => {
            square.element.style.alignSelf = "center";
            square.element.style.justifySelf = "center";
            container.appendChild(square.element);
        });
    }
    generateSquareArray() {
        this.squares = [];
        for (let i = 0; i < 25; i++) {
            this.squares.push(new Square(this.onMineClick, this.onSafeClick));
        }
    }
}
