const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// MAIN SCREEN DRAWING
// Bottom bar
context.fillStyle='#979797';
context.fillRect(0, 600, 1000, 120);

// Grassy sides
context.fillStyle='#74A73D';
context.fillRect(0, 0, 250, 598);
context.fillRect(750, 0, 250, 598);

// Blue ocean
context.fillStyle='blue';
context.fillRect(250, 0, 500, 598);

// FUEL MARKER
// configs
context.lineWidth = 2.5;
context.fillStyle='black';
context.strokeStyle='black';
context.font='36px Georgia';

// box
context.strokeRect(325, 623, 350, 75);
context.strokeRect(325, 623, 350, 75);
context.strokeRect(325, 623, 350, 75);

// yellow marker
context.fillStyle='yellow';
context.fillRect(630, 638, 20, 58);
context.fillStyle='black';

// top markers
context.fillRect(350, 623, 20, 15);
context.fillRect(490, 623, 20, 15);
context.fillRect(630, 623, 20, 15);

// text
context.fillText('E', 348, 675);
context.fillText('1/2', 475, 675);
context.fillText('F', 629, 675);

// COUNTS
// lives
context.fillText('Score:', 45, 675, 200);

// points
context.fillText('Lives:', 750, 675, 200);


const plane = new Image();
plane.src='caminho';
plane.onload = function() {
    context.drawImage(plane, 0, 0, 100, 150);
};
