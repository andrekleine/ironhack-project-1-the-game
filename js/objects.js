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

    top() {
    return this.posY;
    }

    bottom() {
    return this.posY + this.height;
    }

    left() {
    return this.posX;
    }

    right() {
    return this.posX + this.width;
    }

    crashWith(enemy) {
        return !(this.bottom() < enemy.top() || this.top() > enemy.bottom() || this.right() < enemy.left() || this.left() > enemy.right());
    }
}

class Player extends Object {
    constructor(canvas, context, posX, posY, width, height, image, speed) {
        super(canvas, context, posX, posY, width, height, image, speed);
        this.images = [];        
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
                this.image = this.images[0];
        }        
    }

    draw() {
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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

class FuelMarker extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);        
    }

    draw() {        
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}

class MarkerBar extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);
        this.xAxisLength = 248;
    }

    move(fuelDuration, isOverFuel) {
        if (isOverFuel) {
            this.posX <= 612 ? this.posX += (this.xAxisLength / fuelDuration) * 3.5 : this.posX = 612;
        }
        else {
            this.posX >= 364 ? this.posX -= this.xAxisLength / fuelDuration : this.posX = 364;
        }        
    }

    draw(fuelDuration, isOverFuel) {
        this.move(fuelDuration, isOverFuel);
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    empty() {
        if (this.posX < 364) return true;
    }
}

class Panel extends Object {
    constructor(canvas, context) {
        super(canvas, context);
    }

    drawPanel() {
        this.context.fillStyle='#979797';
        this.context.fillRect(0, 590, 1000, 220);
        this.context.fillStyle='#000';
        this.context.fillRect(0, 590, 1000, 2);
    }
}

class Field extends Object {
    constructor(canvas, context) {
        super(canvas, context);
    }

    drawField() {
        // Grassy sides
        this.context.fillStyle='#74A73D';
        this.context.fillRect(0, 0, 250, 598);
        this.context.fillRect(750, 0, 250, 598);
    
        // Blue ocean
        this.context.fillStyle='blue';
        this.context.fillRect(250, 0, 500, 598);
    }
}