const mouse = { x: 0, y: 0, out: true};

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

        canvas.addEventListener('mouseout', () => {
            mouse.out = true;
            //console.log('Mouse exited the canvas');
        });

        canvas.addEventListener('mouseover', () => {
            mouse.out = false;
            //console.log('Mouse entered the canvas');
        });
    }
}


