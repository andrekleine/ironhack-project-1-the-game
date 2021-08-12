/* objetos:
Jato: image, width, height, posX, posY, context, canvas, drawObject, move, collision, points
Helicoptero:
Navio:
Fuel:
Player: image, width, height, posX, posY, context, canvas, drawObject, move, collision
*/

class Object {
    constructor(canvas, context, width, height, posX, posY, image) {
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.image = image;
    }

    draw() {
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    move(speed) {
        this.posY += speed;
    }
}

class Jet extends Object {
    constructor(canvas, context, width, height, posX, posY, image) {
        super(canvas, context, width, height, posX, posY, image);
    }
}

class Ship extends Object {
    constructor(canvas, context, width, height, posX, posY, image) {
        super(canvas, context, width, height, posX, posY, image);
    }
}

class Helicopter extends Object {
    constructor(canvas, context, width, height, posX, posY, image) {
        super(canvas, context, width, height, posX, posY, image);
    }
}

class Fuel extends Object {
    constructor(canvas, context, width, height, posX, posY, image) {
        super(canvas, context, width, height, posX, posY, image);
    }
}

class House extends Object {
    constructor(canvas, context, width, height, posX, posY, image) {
        super(canvas, context, width, height, posX, posY, image);
    }
}

class Player extends Object {
    constructor(canvas, context, width, height, posX, posY, image) {
        super(canvas, context, width, height, posX, posY, image);
    }
}

class Field extends Object {
    constructor(canvas, context) {
        super(canvas, context);
    }

    drawField() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

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
    }    
}