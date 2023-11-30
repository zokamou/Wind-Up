class BlocksUpper extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = 1;
    }
    
    update() {
        //move spaceship left
        this.x -= game.settings.bg_speed * game.settings.multiplier;

        //wrap around from left edge to right edge 
        if (this.x <= 0 - this.width){
            this.reset();
        }
        //this.play('spin')
    }
    
    reset() {
        this.x = game.config.width;
        this.y = (Math.random() * ((game.config.height - 150) - 30) + 1) + 30
        //this.y = Math.random() * (game.config.height)-(game.gonfig.height/2) + game.gonfig.height/2;
    }
}