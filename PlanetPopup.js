const planetPopups = [];

class PlanetPopup {
    constructor(planet, x, y, width, length, color, open) {
        this.planet = planet;
        this.x = x;
        this.y = y;
        this.width = width;
        this.length = length;
        this.color = color;
        this.open = open;
        this.Start();
    }

    Start() {
        console.log('Created a planet popup!');
    }

    Popup() {
        console.log('Popup animation start');
        this.open = true;
        this.length = 0;

        const popupInterval = setInterval(() => {
            this.length += 2; // Adjust the size increment as needed

            if (this.length >= 20) {
                console.log('Popup animation complete');
                clearInterval(popupInterval);
            }
        }, 20); // Adjust the interval as needed
    }

    Popdown() {
        console.log('Popdown animation start');
        this.open = true;

        const popupInterval = setInterval(() => {
            this.length -= 2; // Adjust the size increment as needed

            if (this.length <= 0) {
                this.length = 0;
                console.log('Popdown animation complete');
                clearInterval(popupInterval);
            }
        }, 20);
    }
}

class PlanetPopupManager {
    constructor() {

    };

    Update() {
        UpdatePopup();
    }

    Draw() {
        DrawPopups();
    }

}

function UpdatePopup() {
    for (var i = 0; i < planetPopups.length; i++) {
        const planet = planetPopups[i];
        planet.x = planetsData[i].positionX;
        planet.y = planetsData[i].positionY;
    }
}

function DrawPopups() {
    for (var i = 0; i < planetPopups.length; i++) {
        const planet = planetPopups[i];
        if (planet.open) {
            context.fillStyle = planet.color;
            context.beginPath();
            context.rect(planet.x, planet.y, planet.width, planet.length);
            context.fill();
        }
    }
}

