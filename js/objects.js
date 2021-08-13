class Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        this.canvas = canvas;
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.image = image;
    }    
}

class Player extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);                
    }
    
    movePlayer(key, planeSpeed) {
        switch(key) {
            case 'arrowleft':
                if (this.posX <= 260) return;
                this.posX -= planeSpeed;                
                break;
            case 'arrowright':
                if (this.posX >= 685) return;
                this.posX += planeSpeed;                
                break;
            default:
                this.posX += 0;
        }
    }

    drawPlayer() {
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }    
}

class Helicopter extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);        
        this.images = [];        
    }

    drawHeli() {
        setInterval(() => {
            switch(this.image) {
                case this.images[0]:                    
                    this.image = this.images[1];
                    break;
                case this.images[1]:
                    this.image = this.images[0];
                    break;
                case this.images[2]:
                    this.image = this.images[3];
                    break;
                case this.images[3]:
                    this.image = this.images[2];
                    break;
            }
        }, 300)
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }    
}

class Field extends Object {
    constructor(canvas, context) {
        super(canvas, context);
    }

    drawField() {
        // Bottom grey bar
        this.context.fillStyle='#979797';
        this.context.fillRect(0, 600, 1000, 120);
    
        // Grassy sides
        this.context.fillStyle='#74A73D';
        this.context.fillRect(0, 0, 250, 598);
        this.context.fillRect(750, 0, 250, 598);
    
        // Blue ocean
        this.context.fillStyle='blue';
        this.context.fillRect(250, 0, 500, 598);
    
        // FUEL MARKER
        // configs
        this.context.lineWidth = 2.5;
        this.context.fillStyle='black';
        this.context.strokeStyle='black';
        this.context.font='36px Georgia';
    
        // box
        this.context.strokeRect(325, 623, 350, 75);
        this.context.strokeRect(325, 623, 350, 75);
        this.context.strokeRect(325, 623, 350, 75);
    
        // yellow marker
        this.context.fillStyle='yellow';
        this.context.fillRect(630, 638, 20, 58);
        this.context.fillStyle='black';
    
        // top markers
        this.context.fillRect(350, 623, 20, 15);
        this.context.fillRect(490, 623, 20, 15);
        this.context.fillRect(630, 623, 20, 15);
    
        // text
        this.context.fillText('E', 348, 675);
        this.context.fillText('1/2', 475, 675);
        this.context.fillText('F', 629, 675);
    
        // COUNTS
        // lives
        this.context.fillText('Score:', 45, 675, 200);
    
        // points
        this.context.fillText('Lives:', 750, 675, 200);
    }    
}