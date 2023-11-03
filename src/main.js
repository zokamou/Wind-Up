// -------------------------------------------------------------------------------------------------------------------------
// Name: Zoe Feller
// Title: Wind-Up
// Time: ~ 8 hours

let config = {
    type: Phaser.CANVAS, 
    render: {
        pixelArt: true
    },
    width: 640,
    height: 480,
    backgroundColor: "#482016",
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [Menu, Guide, Play]
}

let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;