class Object {
    constructor(canvas, context, posX, posY, width, height, image, speed) {
        this.canvas = canvas;
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.image = image;
        this.speed = speed;
    }
    
    draw() {
        this.move();
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}

class Player extends Object {
    constructor(canvas, context, posX, posY, width, height, image, speed) {
        super(canvas, context, posX, posY, width, height, image, speed);                
    }
    
    move(key) {
        switch(key) {
            case 'arrowleft':
                if (this.posX <= 260) return;
                this.posX -= this.speed;
                break;
            case 'arrowright':                
                if (this.posX >= 685) return;
                this.posX += this.speed;                
                break;
            default:
                this.posX += 0;
        }        
    }
}

class Helicopter extends Object {
    constructor(canvas, context, posX, posY, width, height, image, speed) {
        super(canvas, context, posX, posY, width, height, image, speed);        
        this.images = [];
    }

    move() {
        switch (this.image) {
            case this.images[0]:
                if (this.posX < 700) {
                    this.posX += this.speed;
                    this.image = this.images[1];
                }
                else {
                    this.posX -= this.speed;
                    this.image = this.images[2];
                }
                break;
            case this.images[1]:
                if (this.posX < 700) {
                    this.posX += this.speed;
                    this.image = this.images[0];
                }
                else {
                    this.posX -= this.speed;
                    this.image = this.images[2];
                }
                break;
            case this.images[2]:
                if (this.posX > 250) {
                    this.posX -= this.speed;
                    this.image = this.images[3];
                }
                else {
                    this.posX += this.speed;
                    this.image = this.images[0];
                }
                break;
            case this.images[3]:
                if (this.posX > 250) {
                    this.posX -= this.speed;
                    this.image = this.images[2];
                }
                else {
                    this.posX += this.speed;
                    this.image = this.images[0];
                }
                break;
            default:
                console.log('ERROR!!');
        }
    }    
}

class Ship extends Object {
    constructor(canvas, context, posX, posY, width, height, image, speed) {
        super(canvas, context, posX, posY, width, height, image, speed);        
        this.images = [];        
    }

    move() {
        if (this.image === this.images[0]) {
            if (this.posX < 650) {
                this.posX += this.speed;
            }
            else {
                this.posX -= this.speed;
                this.image = this.images[1];
            }  
        }
        else if (this.image === this.images[1]) {
            if (this.posX > 250) {
                this.posX -= this.speed;
            }
            else {
                this.posX += this.speed;
                this.image = this.images[0];
            }
        }
    }    
}

class Jet extends Object {
    constructor(canvas, context, posX, posY, width, height, image, speed) {
        super(canvas, context, posX, posY, width, height, image, speed);
        this.images = [];        
    }

    move() {
        this.image === this.images[0] ? this.posX += this.speed : this.posX -= this.speed;
    }
}

class Shot extends Object {
    constructor(canvas, context, posX, posY, width, height, image, speed) {
        super(canvas, context, posX, posY, width, height, image, speed);
    }

    move() {        
        if (this.posY > 0) this.posY -= this.speed;
    }
}

class Fuel extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);
    }

    draw() {        
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}

class House extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);
    }

    draw() {        
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