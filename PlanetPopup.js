const planetPopups = [];

class PlanetPopup {
    constructor(planet) {
        this.planet = planet;
        this.Start();
    }

    Start() {
        console.log('Created a planet popup!');
    }

    Popup() {
        console.log('Popup animation start');
        let popupSize = 0;

        const popupInterval = setInterval(() => {
            popupSize += 2; // Adjust the size increment as needed

            if (popupSize >= 30) {
                console.log('Popup animation complete');
                clearInterval(popupInterval);
            }
        }, 20); // Adjust the interval as needed
    }

    Popdown() {
        console.log('Down');
    }
}