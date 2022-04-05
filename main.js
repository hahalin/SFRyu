const imgStage = new Image();
const gravity = 0.4;
const floorHeight = 35;
const margin = 3;
const playerHeight = 110;
const stageWidth = 600;
const stage = document.getElementsByClassName('stage')[0];
const view = document.getElementById('view');
stage.style.width = stageWidth;
stage.style.height = stageWidth * 896 / 1773;


const player = new Sprite({
    position: { x: 50, y: 0 }, velocity: { x: 0, y: 0 }, name: 'ryu', lastKey: ''
});

player.ready();

function animate() {
    window.requestAnimationFrame(animate);

    player.velocity.x = 0;
    if (keys.AR.pressed && player.lastKey === 'AR') {
        player.velocity.x = 1;
    }
    if (keys.AL.pressed && player.lastKey === 'AL') {
        player.velocity.x = -1;
    }

    if (keys.space.pressed)
    {
        if (keys.AR.pressed) {
            player.velocity.x = 2.5;
        }
        if (keys.AL.pressed) {
            player.velocity.x = -2.5;
        }

        if (!player.jumping) {
            player.velocity.y = -9;
        }
    }

    if (!keys.Alt.pressed && !keys.Ctrl.pressed && keys.a.pressed) {
        player.punch();
    }
    if (!keys.Alt.pressed && !keys.Ctrl.pressed && keys.s.pressed) {

        player.punchM();
    }
    if (keys.Ctrl.pressed && keys.q.pressed) {
        console.log('dragonPunch');
        player.dragonPunch();
    }

    if (keys.z.pressed) {
        player.kick();
    }
    if (keys.x.pressed) {
        player.kick('L');
    }

    if (keys.Ctrl.pressed && keys.a.pressed) {
        console.log('go fire');
        if (!player.fireball) {
            player.hadoken();
        }
    }

    if (keys.AD.pressed) {
        player.skuat();
    }
    else {
        if (player.lastKey === 'AD') {
            player.idle();
        }
    }
    player.update();
}
animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.AR.pressed = true;
            player.lastKey = 'AR';
            break;
        case 'ArrowLeft':
            keys.AL.pressed = true;
            player.lastKey = 'AL';
            break;
        case 'ArrowDown':
            keys.AD.pressed = true;
            player.lastKey = 'AD';
            break;
        case ' ':
            keys.space.pressed = true;
            break;
        case 'Control':
            keys.Ctrl.pressed = true;
            player.lastKey = 'Control';
            break;
        case 'Alt':
            keys.Alt.pressed = true;
            player.lastKey = 'Alt';
            break;
        case 'Shift':
            keys.Shift.pressed = true;
            player.lastKey = 'Shift';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            player.lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'z':
            keys.z.pressed = true;
            player.lastKey = 'z';
            break;
        case 'x':
            keys.x.pressed = true;
            player.lastKey = 'x';
            break;
        case 'q':
            keys.q.pressed = true;
            player.lastKey = 'q';
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.AR.pressed = false;
            break;
        case 'ArrowLeft':
            keys.AL.pressed = false;
            break;
        case 'ArrowDown':
            keys.AD.pressed = false;
            player.element.classList.remove('skuat');
            break;
        case ' ':
            keys.space.pressed = false;
            break;
        case 'Control':
            keys.Ctrl.pressed = false;
            break;
        case 'Alt':
            keys.Alt.pressed = false;
            break;
        case 'Shift':
            keys.Shift.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'q':
            keys.q.pressed = false;
            break;
        case 'z':
            keys.z.pressed = false;
            break;
        case 'x':
            keys.x.pressed = false;
            break;
    }
})



