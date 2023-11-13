const planetsData = [];

class Planet{
    constructor(index, radius, color, offset, positionX, positionY, angle, rotationSpeed) {
        this.index = index;
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
        CheckHoveredPlanet();
    }

    Draw() {
        DrawPlanets();
    }
}

function CreatePlanets() {
    var planetsAmount = 6;
    for (var i = 0; i < planetsAmount; i++) {
        planetsData.push(new Planet(i, 15, 'red', ((canvas.height - canvas.height / 2) / planetsAmount) * (i + 1), canvas.width / 2, canvas.height / 2, 0, 1));
        planetPopups.push(new PlanetPopup(planetsData[i]));
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
}

let hoveredPlanet = null;

function CheckHoveredPlanet() {
    const currentlyHoveredPlanet = planetsData.find((planet) => IsMouseOverPlanet(planet));

    if (hoveredPlanet && !currentlyHoveredPlanet) {
        MouseExitPlanet(hoveredPlanet);
        hoveredPlanet = null;
    } else if (currentlyHoveredPlanet && !hoveredPlanet) {
        MouseEnterPlanet(currentlyHoveredPlanet);
        hoveredPlanet = currentlyHoveredPlanet;
    } else if (currentlyHoveredPlanet && hoveredPlanet && currentlyHoveredPlanet === hoveredPlanet) {
        MouseOnPlanet(currentlyHoveredPlanet);
    }
}

function IsMouseOverPlanet(planet) {
    const distance = Math.sqrt(
        Math.pow(mouse.x - planet.positionX, 2) +
        Math.pow(mouse.y - planet.positionY, 2)
    );
    return distance <= planet.radius;
}

function MouseEnterPlanet(planet) {
    console.log('Mouse enter planet:', planet.index);
    planet.radius = planet.radius + 5;
    planetPopups[planet.index].Popup();
}

function MouseOnPlanet(planet) {
    console.log('Mouse on planet:', planet.index);
}

function MouseExitPlanet(planet) {
    console.log('Mouse exited planet:', planet.index);
    planet.radius = planet.radius - 5;
    planetPopups[planet.index].Popdown();
}

function DrawPlanets() {
    for (var i = 0; i < planetsData.length; i++) {
        context.fillStyle = planetsData[i].color;
        context.beginPath();
        context.arc(planetsData[i].positionX, planetsData[i].positionY, planetsData[i].radius, 0, 2 * Math.PI);
        context.fill();
    }
}