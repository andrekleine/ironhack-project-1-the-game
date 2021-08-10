const canvas = document.getElementById('game');
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
context.fillStyle='#3632CB';
context.fillRect(250, 0, 500, 598);

// Fuel marker
context.strokeStyle='black';
context.strokeRect(325, 623, 350, 75);
context.strokeRect(325, 623, 350, 75);
context.strokeRect(325, 623, 350, 75);