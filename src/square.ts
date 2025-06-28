export class Square {
    private isFlipped: boolean = false;
    private isMine: boolean = false;
    public element: HTMLDivElement;
    private onMineClick: (()=>void) | null = null;

    constructor(onMineClick?: () => void){
        this.element = this.createSquare();
        this.onMineClick = onMineClick || null;

        this.element.addEventListener("click", () => {
            console.log(`Square clicked`);
            this.flipSquare();
            if(!this.isMine){
                this.element.style.backgroundColor = 'green';
            } else {
                this.element.style.backgroundColor = 'red';
                if(this.onMineClick){
                    this.onMineClick();
                }
            }
        });
    }

    public flipSquare(){
        this.isFlipped = true;
        this.element.classList.add("flipped");
        if(!this.isMine){
            this.element.style.backgroundColor = 'green';
        } else {
            this.element.style.backgroundColor = 'red';
        }
    }

    public setMine(){
        this.isMine = true;
    }

    public reset() {
        this.isFlipped = false;
        this.isMine = false;
        this.element.classList.remove("flipped");
        this.element.style.backgroundColor = '#123463';
    }

    private createSquare(): HTMLDivElement {
        const square = document.createElement("div");
        square.style.width = `50px`;
        square.style.height = `50px`;
        square.style.backgroundColor = '#123463';
        square.style.borderRadius = "10%";
        square.style.cursor = "pointer";

        return square;
    }
}