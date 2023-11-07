// -------------------------------------------------------------------------------------------------------------------------
// Name: Zoe Feller
// Title: Wind-Up
// Time: ~ 8 hours

let config = {
    type: Phaser.CANVAS, 
    render: {
        pixelArt: true
    },
    zoom: .75,
    width: 640,
    height: 480,
    backgroundColor: "#482016",
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: [Menu, Guide, Play]
}

let tut_tog = 0;
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT;
let high_score = 0;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;