class PlanetsManager {
    constructor() {
        this.Start();
    }

    Start() {
        CreatePlanets();
        planetsPopup.Start();
    }

    Update() {
        RotatePlanets();
        ChangePlanetsTime();
        CheckHoveredPlanet();
    }

    Draw() {
        DrawPlanets();
        planetsPopup.Draw();
    }
}

function CreatePlanets() {
    var planetsAmount = projects.length;
    for (var i = 0; i < planetsAmount; i++) {
        planetsData.push(new Planet(
            i, 15, 'red', ((canvas.height - canvas.height / 2) / planetsAmount) * (i + 1), canvas.width / 2, canvas.height / 2, 0, 1, 0, "test text"));
    }
}

const planetsPopup = new PlanetPopup(0, 0, 0, 0,0,0, "", new Image(), 0,0, "", false);


function RotatePlanets() {
    const sun = { positionX: canvas.width / 2, positionY: canvas.height / 2 };
    //const rotationSpeed = 0.005; // Adjust the rotation speed as needed

    for (let i = 0; i < planetsData.length; i++) {
        const planet = planetsData[i];

        // Update the angle continuously for each planet
        planet.angle += ((planet.rotationSpeed / 1000)/ (i + 1))*planetOveralSpeed;

        // Calculate the new position based on rotation around the sun
        const newX = sun.positionX + planet.offset * Math.cos(planet.angle);
        const newY = sun.positionY + planet.offset * Math.sin(planet.angle);

        planet.positionX = newX;
        planet.positionY = newY;
    }
}

function ChangePlanetsTime(){
    if(planetsPopup.open){
        if(planetOveralSpeed > 0.05) planetOveralSpeed = planetOveralSpeed - 0.007;
    }
    else{
        planetOveralSpeed = planetOveralSpeed + 0.004;
        if(planetOveralSpeed >= 1) planetOveralSpeed = 1;
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
    planetsPopup.SetData(planet);
    planetsPopup.Update(planet);
    planetsPopup.open = true;
}

function MouseOnPlanet(planet) {
    //console.log('Mouse on planet:', planet.index);
    planetsPopup.Update(planet);
}

function MouseExitPlanet(planet) {
    console.log('Mouse exited planet:', planet.index);
    planet.radius = planet.radius - 5;
    planetsPopup.open = false;
}

function DrawPlanets() {
    for (var i = 0; i < planetsData.length; i++) {
        context.fillStyle = planetsData[i].color;
        context.beginPath();
        context.arc(planetsData[i].positionX, planetsData[i].positionY, planetsData[i].radius, 0, 2 * Math.PI);
        context.fill();
    }
}