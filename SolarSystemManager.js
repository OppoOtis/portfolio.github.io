const canvas = document.getElementById('solarSystem');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sun = new Sun(30, 'orange', canvas.width / 2, canvas.height / 2);
const planetsManager = new PlanetsManager();

function Update() {
    planetsManager.Update();

    Draw();
    requestAnimationFrame(Update);
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    sun.Draw();
    planetsManager.Draw();
}

Update()