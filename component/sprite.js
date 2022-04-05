class Sprite {
    constructor({ position, velocity, name }) {
        this.position = position;
        this.velocity = velocity;
        this.name = name;
        this.element = document.getElementsByClassName(name)[0];
        this.jumping = false;
        this.lastKey = '';
        this.draw();
        this.currentMove = 'idle';
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        if (this.velocity.x != 0) {
            let moveWay = this.velocity.x > 0 ? 'walkForward' : 'walkBack';
            if (!this.element.classList.contains(moveWay)) {
                this.element.classList.add(moveWay);
            }
        }
        else {
            this.element.classList.remove('walkForward');
            this.element.classList.remove('walkBack');
        }

        if (this.left() >= 0) {
            this.position.x += this.velocity.x;
            if (this.position.x < 0) {
                this.position.x = 0 + margin;
            }
            if (this.position.x > stageWidth - this.width()) {
                this.position.x = stageWidth - this.width() - margin;
            }
        }

        if (this.position.y + this.height() >= stage.clientHeight - floorHeight && this.element.classList.contains('dragonPunch')) {
            let changeV = stage.clientHeight - floorHeight - this.height();
            if (Math.abs(this.position.y - changeV) > 0) {
               this.position.y = changeV;
            }
        }

        if (this.position.y + this.height() + this.velocity.y >= stage.clientHeight - floorHeight
        ) {
            this.element.classList.remove('jumping');
            this.jumping = false;
            this.velocity.y = 0;
        } else {
            if (!this.element.classList.contains('dragonPunch'))
            {
                console.log('跳跳跳齁依勇');
                this.element.classList.add('jumping');
                this.jumping = true;
            }
            else{
                this.element.classList.remove('jumping');
            }
            this.velocity.y += gravity;
        }

        if (this.element.offsetLeft > 70) {
            let scrollX = this.element.offsetLeft - 70;
            view.scrollLeft = scrollX <= 100 ? scrollX : view.scrollLeft;
        }
    }
    draw() {
        this.element.style.left = this.position.x;
        this.element.style.top = this.position.y;
    }
    left() {
        return this.element.offsetLeft;
    }
    height() {
        return this.element.clientHeight;
    }
    width() {
        return this.element.clientWidth;
    }
    ready() {
        this.fireball = false;
        this.element.classList.add('idle');
    }
    idle() {
        this.lastKey = '';
        this.velocity.x = 0;
        this.currentMove = 'idle';
    }
    punch() {
        console.log('前手拳');
        this.element.classList.add('punch');
        this.velocity.x = 0.05;
        setTimeout(() => {
            this.element.classList.remove('punch');
        }, 350);
    }
    punchM() {
        console.log('後手拳');
        this.element.classList.add('punchM');
        this.element.classList.remove('idle');
        this.velocity.x = 0.05;
        setTimeout(() => {
            this.idle();
            this.velocity.x = 0;
        }, 500);
    }
    dragonPunch() {
        console.log('昇龍拳');
        this.element.classList.remove('idle');
        this.element.classList.add('dragonPunch');
        this.currentMove = 'dragonPunch';
        setTimeout(() => {
            //this.idle();
            this.element.classList.remove('dragonPunch');
            this.element.classList.add('idle');
            this.position.y=view.clientHeight-floorHeight-this.height();
        }, 550);
        setTimeout(() => {
            this.position.y = this.position.y - 3;
        }, 150);
        setTimeout(() => {
            this.position.y = this.position.y - 5;
        }, 250);


    }
    kick(type = '') {
        console.log('下段踢');
        this.element.classList.add('kick' + type);
        this.element.classList.remove('idle');
        this.currentMove = 'kick' + type;
        this.velocity.x = 0.05;
        setTimeout(() => {
            this.idle();
        }, type == '' ? 500 : 500);
    }

    skuat() {
        console.log('skuat');
        if (!this.jumping) {
            this.element.classList.add('skuat');
        }
    }
    hadoken() {
        console.log('發氣功');
        this.fireball = true;
        this.element.classList.add('hadoken');
        setTimeout(() => {
            this.element.classList.remove('hadoken');
        }, 600);
        const element = this.element;
        const me = this;
        setTimeout(function () {
            let fireball = document.createElement('div');
            fireball.classList.add('fireball');
            element.appendChild(fireball);

            var isFireballColision = function () {
                return element.offsetLeft - view.scrollLeft + fireball.offsetLeft + fireball.clientWidth > view.clientWidth - margin * 3.5 ? true : false;
            };

            var explodeIfColision = setInterval(function () {

                //console.log('氣功球移動:', fireball.offsetLeft);

                if (isFireballColision()) {
                    fireball.classList.add('explode');
                    fireball.classList.remove('moving');
                    fireball.style.marginLeft += 20;

                    clearInterval(explodeIfColision);
                    setTimeout(function () { element.removeChild(fireball); me.fireball = false; }, 150);
                }

            }, 50);

            setTimeout(function () { fireball.classList.add('moving'); }, 20);

            setTimeout(function () {
                clearInterval(explodeIfColision);
            }, 3020);

        }, (250));
    }
}



class Stage {

    constructor(img, width, src) {
        this.img = img;
        this.width = width;
        this.img.onload = this.draw.bind(this);
        this.img.src = src;
    };

    setSrc(src) {
        this.img.src = src;
    }

    draw() {
        canvas.width = this.width;
        canvas.height = canvas.width * this.img.naturalHeight / this.img.naturalWidth;
        ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, canvas.width, canvas.height);
    }
}
