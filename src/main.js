// -------------------------------------------------------------------------------------------------------------------------
// Name: Zoe Feller
// Title: Wind-Up
// Time: ~ 20 hours
//
//technically insteresting aspect: 
// I used two different scenes to implement an interactive tutorial when the player starts the game. 
// I was also really proud of the progress bar I implemented in the game

//Visual style
//I animated my sprites and powerups and drew everything by hand, including the title screen and background. I wanted everything to be cohesive.


let config = {
    type: Phaser.CANVAS, 
    render: {
        pixelArt: true
    },
    zoom: 1.25,
    width: 640,
    height: 480,
    backgroundColor: "#482016",
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [Menu, Guide, Play]
}

let tut_tog = 0;
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT;
let high_score = 0;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;