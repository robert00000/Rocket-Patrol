
let config = {
    type: Phaser.Canvas,
    width 640,
    height: 480,
    scene: [Menu , Play]
}

let game = new Phasher.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3
let starSpeed = 4;
//
let keyF, keyR, keyLeft,keyRight;
