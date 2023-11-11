const planetsData = [];

class Planet{
    constructor(radius, color, offset, positionX, positionY, angle, rotationSpeed) {
        this.radius = radius;
        this.color = color;
        this.offset = offset;
        this.positionX = positionX;
        this.positionY = positionY;
        this.angle = angle;
        this.rotationSpeed = rotationSpeed;
    }
}

class PlanetsManager {
    constructor() {
        this.Start();
    }

    Start() {
        CreatePlanets();
    }

    Update() {
        RotatePlanets();
    }

    Draw() {
        DrawPlanets();
    }
}

function CreatePlanets() {
    var planetsAmount = 16;
    for (var i = 0; i < planetsAmount; i++) {
        planetsData.push(new Planet(15, 'red', ((canvas.height - canvas.height / 2) / planetsAmount) * (i + 1), canvas.width / 2, canvas.height / 2, 0, 10));
    }
}

function RotatePlanets() {
    const sun = { positionX: canvas.width / 2, positionY: canvas.height / 2 };
    //const rotationSpeed = 0.005; // Adjust the rotation speed as needed

    for (let i = 0; i < planetsData.length; i++) {
        const planet = planetsData[i];

        // Update the angle continuously for each planet
        planet.angle += (planet.rotationSpeed / 1000)/ (i + 1);

        // Calculate the new position based on rotation around the sun
        const newX = sun.positionX + planet.offset * Math.cos(planet.angle);
        const newY = sun.positionY + planet.offset * Math.sin(planet.angle);

        planet.positionX = newX;
        planet.positionY = newY;
    }
    console.log("rotated");
}

function DrawPlanets() {
    for (var i = 0; i < planetsData.length; i++) {
        context.fillStyle = planetsData[i].color;
        context.beginPath();
        context.arc(planetsData[i].positionX, planetsData[i].positionY, planetsData[i].radius, 0, 2 * Math.PI);
        context.fill();
    }
}