export class Square {
    constructor(onMineClick, onSafeClick) {
        this.isFlipped = false;
        this.isMine = false;
        this.backDiv = null;
        this.onMineClick = null;
        this.onSafeClick = null;
        this.element = this.createSquare();
        this.onMineClick = onMineClick || null;
        this.onSafeClick = onSafeClick || null;
        this.element.addEventListener("click", () => {
            if (!this.isFlipped) {
                this.flipSquare();
                if (!this.isMine) {
                    if (this.onSafeClick)
                        this.onSafeClick();
                }
                else {
                    if (this.onMineClick)
                        this.onMineClick();
                }
            }
        });
    }
    flipSquare() {
        this.isFlipped = true;
        this.element.classList.add("flipped");
        this.element.classList.add("flip");
        if (!this.isMine) {
            this.element.style.backgroundColor = '#d7a611';
        }
        else {
            this.element.style.backgroundColor = '#a82626';
        }
    }
    setMine() {
        this.isMine = true;
        if (this.backDiv)
            this.backDiv.style.backgroundImage = "url('assets/bomb.png')";
    }
    reset() {
        this.isFlipped = false;
        this.isMine = false;
        this.element.classList.remove("flipped");
        this.element.classList.remove("flip");
        this.element.style.backgroundColor = '#123463';
        if (this.backDiv)
            this.backDiv.style.backgroundImage = "url('assets/star.ico')";
    }
    hint() {
        this.element.classList.add("flipped");
    }
    createSquare() {
        const square = document.createElement("div");
        square.style.width = `80px`;
        square.style.height = `60px`;
        square.style.backgroundColor = '#123463';
        square.style.borderRadius = "10%";
        square.style.cursor = "pointer";
        square.className = 'card-inner';
        const front = document.createElement("div");
        const back = document.createElement("div");
        front.className = "front";
        back.className = "back";
        this.backDiv = back;
        square.appendChild(front);
        square.appendChild(back);
        return square;
    }
}
