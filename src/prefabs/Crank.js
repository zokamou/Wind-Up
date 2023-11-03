class Crank extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 3;
    }

    create(){
        this.anims.create({
            key: 'crank_anim',
            frames: this.anims.generateFrameNumbers('crank', { start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        });

        this.main_soldier.anims.play('walking')
        this.crank_pu.anims.play('crank_anim')
    }

    update() {
        //move spaceship left
        this.x -= this.moveSpeed;

        //wrap around from left edge to right edge 
        if (this.x <=0 - this.width){
            
            this.destroy()
        }
        //this.play('spin')
    }

    reset() {
        this.x = game.config.width;
        this.y = (borderUISize*3) + (Math.random()*7)*borderUISize
        //this.y = Math.random() * (game.config.height)-(game.gonfig.height/2) + game.gonfig.height/2;
    }

}