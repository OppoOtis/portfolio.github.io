// solarSystem.js
import { mercury } from './planets/mercury.js';
import { venus } from './planets/venus.js';
import { earth } from './planets/earth.js';

const canvas = document.getElementById('solarSystem');
const context = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the sun and planets
const sun = { x: canvas.width / 2, y: canvas.height / 2, radius: 50, color: 'yellow' };
const planets = [mercury, venus, earth]; // Add more planets as needed

// Function to draw a planet
function drawPlanet(planet) {
    context.beginPath();
    context.arc(
        sun.x + planet.distance * Math.cos(planet.angle),
        sun.y + planet.distance * Math.sin(planet.angle),
        planet.radius,
        0,
        2 * Math.PI
    );
    context.fillStyle = planet.color;
    context.fill();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the sun
    context.beginPath();
    context.arc(sun.x, sun.y, sun.radius, 0, 2 * Math.PI);
    context.fillStyle = sun.color;
    context.fill();

    // Update and draw the planets
    planets.forEach((planet) => {
        planet.angle += planet.speed;
        drawPlanet(planet);
    });
}

animate();