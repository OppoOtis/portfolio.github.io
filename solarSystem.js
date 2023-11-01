// solarSystem.js
import { mercury } from './planets/mercury.js';
import { venus } from './planets/venus.js';
import { earth } from './planets/earth.js';

const canvas = document.getElementById('solarSystem');
const context = canvas.getContext('2d');

// Set canvas size
canvas.width = 800; // Set a fixed canvas width
canvas.height = 600; // Set a fixed canvas height

// Function to resize the elements based on the canvas size
function resizeElements() {
    const scaleFactor = canvas.width / 800; // Adjust this value as needed

    // Define the sun and planets
    const sun = { x: canvas.width / 2, y: canvas.height / 2, radius: 50 * scaleFactor, color: 'yellow' };
    const planets = [mercury, venus, earth]; // Add more planets as needed

    planets.forEach((planet) => {
        planet.radius = planet.initialRadius * scaleFactor;
        planet.distance = planet.initialDistance * scaleFactor;
    });

    return { sun, planets };
}

// Function to draw a planet
function drawPlanet(planet) {
    context.beginPath();
    context.arc(
        planet.sun.x + planet.distance * Math.cos(planet.angle),
        planet.sun.y + planet.distance * Math.sin(planet.angle),
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

    const { sun, planets } = resizeElements();

    // Draw the sun
    context.beginPath();
    context.arc(sun.x, sun.y, sun.radius, 0, 2 * Math.PI);
    context.fillStyle = sun.color;
    context.fill();

    // Update and draw the planets
    planets.forEach((planet) => {
        planet.angle += planet.speed;
        planet.sun = sun; // Update the sun position
        drawPlanet(planet);
    });
}

// Initialize the elements with appropriate scaling
const { sun, planets } = resizeElements();

animate();