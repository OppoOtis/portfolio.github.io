const mouse = { x: 0, y: 0 };

class Input {
    constructor(canvas) {
        this.canvas = canvas;
        this.Start();
    }

    Start() {
        canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX - canvas.getBoundingClientRect().left;
            mouse.y = e.clientY - canvas.getBoundingClientRect().top;
        });
    }
}


