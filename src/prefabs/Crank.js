class Crank extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 3;
    }


    update() {
        //move spaceship left
        this.x -= game.settings.multiplier;

        //wrap around from left edge to right edge 
        if (this.x <=0 - this.width){
            
            this.reset();
        }
        //this.play('spin')
    }

    reset() {
        this.x =  game.config.width * 1.5 ;
        this.y = (borderUISize*3) + (Math.random()*7)*borderUISize
        //this.y = Math.random() * (game.config.height)-(game.gonfig.height/2) + game.gonfig.height/2;
    }

}