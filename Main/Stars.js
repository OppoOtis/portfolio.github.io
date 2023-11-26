const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

let mouseX = 0;
let mouseY = 0;
const influenceRadius = 80;

window.addEventListener('mousemove', (event) => {
    const bounds = canvas.getBoundingClientRect();
    mouseX = event.clientX - bounds.left;
    mouseY = event.clientY - bounds.top;
});


function GenerateRandomStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    const star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random(), // Random size between 1 and 4
      color: GenerateRandomColor(),
      distance: Math.random() + 0.1, // Random direction: right or left
    };
    stars.push(star);
  }
}

GenerateRandomStars(2000);

function Update() {
    UpdateStars();
    DrawAllStars();
    requestAnimationFrame(Update);
}

function UpdateStars(){
    stars.forEach((star) => {
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const heaviness = 1.1 - star.size; // Adjust heaviness based on star size
        const finalInfluenceRadius = influenceRadius / (1+star.size);
        if (distance < finalInfluenceRadius) {
          star.x -= (dx / distance) * (finalInfluenceRadius - distance) * 0.01 * heaviness;
          star.y -= (dy / distance) * (finalInfluenceRadius - distance) * 0.01 * heaviness;
        }

        const repelFactor = 0.5; // Adjust the repelling strength
        const borderMargin = 1; // Adjust the distance from the borders to trigger repelling

        if (star.x < borderMargin) {
            star.x += repelFactor;
        } else if (star.x > canvas.width - borderMargin) {
            star.x -= repelFactor;
        }

        if (star.y < borderMargin) {
            star.y += repelFactor;
        } else if (star.y > canvas.height - borderMargin) {
            star.y -= repelFactor;
        }
    });
}

function DrawAllStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    stars.forEach((star) => {
        ctx.fillStyle = star.color; // Set the star color
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); // Draw a circle for the star
        ctx.fill();
    });
}

Update();

function GenerateRandomColor() {
    const colors = [
        'rgb(255, 255, 255)',
        /*
        'rgb(157, 180, 255)',
        'rgb(162, 185, 255)',
        'rgb(167, 188, 255)',
        'rgb(170, 191, 255)',
        'rgb(175, 195, 255)',
        'rgb(186, 204, 255)',
        'rgb(192, 209, 255)',
        'rgb(202, 216, 255)',
        'rgb(228, 232, 255)',
        'rgb(237, 238, 255)',
        'rgb(251, 248, 255)',
        'rgb(255, 255, 255)',
        'rgb(255, 249, 249)'
        /*
        'rgb(255, 245, 236)',
        'rgb(255, 244, 232)',
        'rgb(255, 241, 223)',
        'rgb(255, 235, 209)',
        'rgb(255, 215, 174)',
        'rgb(255, 198, 144)',
        'rgb(255, 190, 127)',
        'rgb(255, 187, 123)',
        'rgb(255, 187, 123)'*/
        // Add more colors as needed...
      ];
    
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
  }