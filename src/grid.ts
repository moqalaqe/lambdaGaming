import { Square } from "./square.js";

export class Grid {
    private squares: Square[] = [];
    private onMineClick: () => void;

    constructor(onMineClick?: () => void) {
        this.onMineClick = onMineClick || (() => {});
        this.generateSquareArray();
    }

    public setMines(amount: number){
        const mineSet = new Set<number>();
        while (mineSet.size < amount) {
            const randomId = Math.floor(Math.random() * this.squares.length);
            mineSet.add(randomId);
        }
        mineSet.forEach(id => {
            this.squares[id].setMine()
        })
    }
    
    public resetBoard() {
        this.squares.forEach(square => {
            square.reset();
        });
    }


    public openAllSquare(){
        this.squares.forEach(square => {
            square.flipSquare();
        });
    }

    public render(container: HTMLElement) {
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

    private generateSquareArray(){
        this.squares = [];
        for (let i = 0; i < 25; i++) {
            this.squares.push(new Square(this.onMineClick));
        }
    }
}