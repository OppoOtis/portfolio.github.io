class Sun {
    constructor(radius, color, positionX, positionY) {
        this.radius = radius;
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    Draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}