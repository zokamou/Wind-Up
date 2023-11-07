class Guide extends Phaser.Scene{
    constructor(){
        super("guideScene");
    }

    preload() {
        this.load.image('livingroom', './assets/livingroom.png')
        this.load.image('floor', './assets/floor.png')
        this.load.image('mouse', './assets/mouse.png')
        this.load.image('blocksinst', './assets/blocksinst.png')
        this.load.image('crankinst', './assets/crankinst.png')
        this.load.image('cont', './assets/cont.png')
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
        //this.blocks_obs = new Blocks(this, 200,200, 'blocks', 0).setOrigin(0, 0);
        this.main_soldier = new Soldier(this, -100,150, 'soldier', 0).setOrigin(0, 0);


        //instruction sprites
        this.mi = this.add.sprite(game.config.width/2, game.config.height/3,"mouse");
        this.mi.setScale(.5)
        this.mi.setVisible(false);

        this.bi = this.add.sprite(game.config.width/2, game.config.height/3,"blocksinst");
        this.bi.setScale(.5)
        this.bi.setVisible(false);

        this.cranki = this.add.sprite(game.config.width/2, game.config.height/3,"crankinst");
        this.cranki.setScale(.5)
        this.cranki.setVisible(false);

        this.ci = this.add.sprite(game.config.width - 100, game.config.height - 50,"cont");
        this.ci.setScale(.5)
        this.ci.setVisible(false);
        //this.t.setScale(3.5);
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


        //add space key

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //play animations
        this.main_soldier.anims.play('walking');
        //this.crank_pu.anims.play('crank_anim')

        this.physics.world.setBounds(-50,40, 640, 430);
        //this.physics.world.gravity.y = 150;
        this.main_soldier.setVelocity(0,0)



        this.mouse = 0;
        this.blocks = 0;
        this.cranky = 0;
        this.controls = 0;
        this.tutorial = 0;
        this.timer = 0;

    }

    update() {

        // walking in
        if(this.tutorial == 0){
            if(this.main_soldier.x < 75){
                this.main_soldier.x += 1.5;
            } else {
                // show mouse
                if (this.mouse == 0){
                    this.controls = 0;
                    this.mi.setVisible(true);
                    this.ci.setVisible(true);
                    if (Phaser.Input.Keyboard.JustDown(this.space)) {
                        this.mi.setVisible(false);
                        this.ci.setVisible(false);
                        this.controls = 1;
                        this.mouse = 1;
                    }
                } if (this.mouse == 1 && this.blocks == 0){
                    if (this.timer < 100){
                        this.timer+=1;
                    } else{
                        this.controls = 0;
                        this.bi.setVisible(true);
                        this.ci.setVisible(true);
                        if (Phaser.Input.Keyboard.JustDown(this.space)) {
                            this.bi.setVisible(false);
                            this.ci.setVisible(false);
                            this.controls = 1;
                            this.blocks = 1;
                            this.timer = 0;
                        }
                    }
                } if (this.mouse == 1 && this.blocks == 1 && this.cranky == 0){
                    if (this.timer < 100){
                        this.timer+=1;
                    } else{
                        this.controls = 0;
                        this.cranki.setVisible(true);
                        this.ci.setVisible(true);
                        if (Phaser.Input.Keyboard.JustDown(this.space)) {
                            this.cranki.setVisible(false);
                            this.ci.setVisible(false);
                            this.controls = 1;
                            this.cranky = 1;
                        }
                    }
                } 
            }
            
        }
        if (this.controls == 1){
            this.livingroom.tilePositionX += game.settings.bg_speed / 4 * game.settings.multiplier;
            this.floor.tilePositionX += game.settings.bg_speed * game.settings.multiplier;
            if (game.input.activePointer.isDown) {
                this.main_soldier.setVelocityY(-game.settings.player_velocity * game.settings.multiplier * .75)
            } else{
                this.main_soldier.setVelocityY(game.settings.player_velocity * game.settings.multiplier * 1.25 * .75)
            }

        } else{
            this.main_soldier.setVelocity(0,0)
            
        }

    }
}

