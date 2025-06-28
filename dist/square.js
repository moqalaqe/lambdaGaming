export class Square {
    constructor(onMineClick, onSafeClick) {
        this.isFlipped = false;
        this.isMine = false;
        this.onMineClick = null;
        this.onSafeClick = null;
        this.element = this.createSquare();
        this.onMineClick = onMineClick || null;
        this.onSafeClick = onSafeClick || null;
        this.element.addEventListener("click", () => {
            console.log(`Square clicked`);
            this.flipSquare();
            if (!this.isMine) {
                if (this.onSafeClick) {
                    this.onSafeClick();
                }
                this.element.style.backgroundColor = 'green';
            }
            else {
                this.element.style.backgroundColor = 'red';
                if (this.onMineClick) {
                    this.onMineClick();
                }
            }
        });
    }
    flipSquare() {
        this.isFlipped = true;
        this.element.classList.add("flipped");
        if (!this.isMine) {
            this.element.style.backgroundColor = 'green';
        }
        else {
            this.element.style.backgroundColor = 'red';
        }
    }
    setMine() {
        this.isMine = true;
    }
    reset() {
        this.isFlipped = false;
        this.isMine = false;
        this.element.classList.remove("flipped");
        this.element.style.backgroundColor = '#123463';
    }
    createSquare() {
        const square = document.createElement("div");
        square.style.width = `50px`;
        square.style.height = `50px`;
        square.style.backgroundColor = '#123463';
        square.style.borderRadius = "10%";
        square.style.cursor = "pointer";
        return square;
    }
}
