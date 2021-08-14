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
    
    drawObject() {
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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
        this.shoot();
    }

    // shoot() {
    //     const shotImg = new Image();
    //     shotImg.src = './images/shot.png';
    //     document.onkeydown = (event) => {
    //         if (event.key.toLowerCase() === 'ctrl') {
    //             const shot = new Shot(this.canvas, this.context, this.posX, this.posY, 7, 25,shotImg);                
    //         }
    //     }

    // }
}

class Helicopter extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);        
        this.images = [];        
    }

    moveHeli(heliSpeed) {
        if (this.image === (this.images[0] || this.images[1])) {
            if (this.posX < 700) {
                this.posX += heliSpeed;
            }
            else {
                this.posX -= heliSpeed;
                this.image = this.images[2];
            }  
        }
        else if (this.image === (this.images[2] || this.images[3])) {
            if (this.posX > 250) {
                this.posX -= heliSpeed;
            }
            else {
                this.posX += heliSpeed;
                this.image = this.images[0];
            }  

        }
    }

    drawHeli(heliSpeed) {
        this.moveHeli(heliSpeed);        
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
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }    
}

class Ship extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);        
        this.images = [];        
    }

    moveShip(shipSpeed) {
        if (this.image === this.images[0]) {
            if (this.posX < 650) {
                this.posX += shipSpeed;
            }
            else {
                this.posX -= shipSpeed;
                this.image = this.images[1];
            }  
        }
        else if (this.image === this.images[1]) {
            if (this.posX > 250) {
                this.posX -= shipSpeed;
            }
            else {
                this.posX += shipSpeed;
                this.image = this.images[0];
            }
        }
    }

    drawShip(shipSpeed) {
        this.moveShip(shipSpeed);
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }    
}

class Jet extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);        
        this.images = [];        
    }

    moveJet(jetSpeed) {
        this.image === this.images[0] ? this.posX += jetSpeed : this.posX -= jetSpeed;
    }

    drawJet(jetSpeed) {
        this.moveJet(jetSpeed);
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.removeJet();
    }

    removeJet() {
        if (this.posX < 0 || this.posX > 1000) delete this;
    }
}

class Fuel extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);
    }    
}

class House extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);
    }
}

class Shot extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super(canvas, context, posX, posY, width, height, image);
    }

    moveShot(shotSpeed) {
        this.posY -= shotSpeed;
        this.removeShot();
    }

    removeShot() {
        if (this.posY < 0) delete this;
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