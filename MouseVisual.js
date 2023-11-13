class MouseVisual {
    constructor(size, color, shape, x, y, allowedToDraw) {
        this.size = size;
        this.color = color;
        this.shape = shape;
        this.x = x;
        this.y = y;
        this.allowedToDraw = allowedToDraw;
        this.Start();
    }

    Start() {
        HideMouse();
    }

    Update() {
        UpdateMouse();
    }

    Draw() {
        DrawMouse();
    }
}

function HideMouse() {
    document.body.style.cursor = 'none';
}

function ShowMouse() {
    document.body.style.cursor = 'auto';
}

function UpdateMouse() {
    mouseVisual.x = mouse.x;
    mouseVisual.y = mouse.y;
    if (mouse.out) {
        mouseVisual.allowedToDraw = false;
    } else {
        mouseVisual.allowedToDraw = true;
    }
}

function DrawMouse() {
    if (mouseVisual.allowedToDraw) {
        context.fillStyle = mouseVisual.color;
        context.beginPath();
        context.rect(mouseVisual.x - (mouseVisual.size / 2), mouseVisual.y - (mouseVisual.size / 2), mouseVisual.size, mouseVisual.size);
        context.fill();
    }
}