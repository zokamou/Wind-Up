class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('livingroom', './assets/livingroom.png')
        this.load.image('floor', './assets/floor.png')
        this.load.spritesheet('soldier', './assets/soldier_ss.png', {frameWidth: 72, frameHeight: 88, startFrame: 0, endFrame: 3})
        this.load.spritesheet('crank', './assets/crank.png', {frameWidth: 63, frameHeight: 54, startFrame: 0, endFrame: 3})
        this.load.spritesheet('blocks', './assets/blocks.png', {frameWidth: 72, frameHeight: 84, startFrame: 0, endFrame: 3})
    }
    create() { 

        //add bg
        this.livingroom = this.add.tileSprite(0,0,640, 480, 'livingroom').setOrigin(0,0);
        this.floor = this.add.tileSprite(0,0,640, 480, 'floor').setOrigin(0,0);

        //add the soldier
        this.crank_pu = new Crank(this,game.config.width, (borderUISize*3) + (Math.random()*7)*borderUISize, 'crank', 0).setOrigin(0, 0);
        this.blocks_obs = new Blocks(this, 200,200, 'blocks', 0).setOrigin(0, 0);
        this.main_soldier = new Soldier(this, -50,150, 'soldier', 0).setOrigin(0, 0);

        // animation config
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('soldier', { start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'crank_anim',
            frames: this.anims.generateFrameNumbers('crank', { start: 0, end: 3, first: 0}),
            frameRate: 6 * this.game.settingsmultiplier * .75,
            repeat: -1
        });

        //play animations
        this.main_soldier.anims.play('walking')
        this.crank_pu.anims.play('crank_anim')

        this.physics.world.setBounds(0,40, 640, 430);
        //this.physics.world.gravity.y = 150;

        this.main_soldier.setVelocity(0,0)

        this.intro = 0;
        this.timer = 0;
    }

    update() {

        
        if (this.intro != 0){
            if (game.input.activePointer.isDown) {
                this.main_soldier.setVelocityY(-game.settings.player_velocity * game.settings.multiplier * .75)
            } else{
                this.main_soldier.setVelocityY(game.settings.player_velocity * game.settings.multiplier * 1.25 * .75)
            }
        
        }

        //walking in
        if(this.main_soldier.x < 100){
            this.main_soldier.x += 3

        } else{
            this.intro = 1

        }

        //update sprites
        this.crank_pu.update();
        this.blocks_obs.update()

        //update bgs
        if(this.intro != 0){
            this.livingroom.tilePositionX += game.settings.bg_speed / 4 * game.settings.multiplier;
            this.floor.tilePositionX += game.settings.bg_speed * game.settings.multiplier;
        }
    }

}
