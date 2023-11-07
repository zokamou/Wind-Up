class Play extends Phaser.Scene{
    graphics;
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('livingroom', './assets/livingroom.png')
        this.load.image('floor', './assets/floor.png')
        this.load.spritesheet('soldier', './assets/soldier_ss.png', {frameWidth: 72, frameHeight: 88, startFrame: 0, endFrame: 3})
        this.load.spritesheet('crank', './assets/crank.png', {frameWidth: 63, frameHeight: 54, startFrame: 0, endFrame: 3})
        this.load.spritesheet('blocks', './assets/blocks.png', {frameWidth: 72, frameHeight: 84, startFrame: 0, endFrame: 3})
        this.load.image('gameover', './assets/gameover.png')
        this.load.audio('bgm', './assets/bgm.wav');

    }
    create() { 
        game.settings.multiplier = 1;
        this.bgM = this.sound.add('bgm');
        this.bgM.loop = true;
        this.bgM.play();


        //add bg
        this.livingroom = this.add.tileSprite(0,0,640, 480, 'livingroom').setOrigin(0,0);
        this.floor = this.add.tileSprite(0,0,640, 480, 'floor').setOrigin(0,0);
        
        //add the soldier
        this.blocks_lower = new BlocksUpper(this, game.config.width *1,200, 'blocks', 0).setOrigin(0, 0);
        this.blocks_lower.setScale(.75);
        this.blocks_lower.body.setSize(50,95);
        this.blocks_lower.body.setOffset(8,10);

        this.blocks_upper = new BlocksUpper(this, game.config.width *1.5,300, 'blocks', 0).setOrigin(0, 0);
        this.blocks_upper.setScale(.75)
        this.blocks_upper.body.setSize(50,95);
        this.blocks_upper.body.setOffset(8,10);
        this.crank_pu = new Crank(this, game.config.width *2, (borderUISize*3) + (Math.random()*7)*borderUISize, 'crank', 2).setOrigin(0, 0);

        this.main_soldier = new Soldier(this, -50,150, 'soldier', 0).setOrigin(0, 0);
        this.main_soldier.body.setSize(25,50);
        this.main_soldier.body.setOffset(35,20);
        //rounded rectangle
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xdbc6a7, 1);
        this.graphics.fillRoundedRect(20, 20, 200, 40, 10);
        this.graphics.lineStyle(4, 0x332818, 1);
        this.graphics.strokeRoundedRect(20, 20, 200, 40, 10);

        //progress bar
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xdbc6a7, 1);
        this.graphics.fillRoundedRect(this.game.config.width - 320, 20, 300, 40, 10);

        
        this.bar = this.add.graphics();
        this.bar.fillStyle(0x37a113, 1);
        this.bar.fillRoundedRect(this.game.config.width - 320, 20, 300, 40,{ tl: 10, tr: 10, bl: 10, br: 10});
        
        this.outline = this.add.graphics();
        this.outline.lineStyle(4, 0x332818, 1);
        this.outline.strokeRoundedRect(this.game.config.width - 320, 20, 300, 40, 10);

        //gameover
        this.game_over = this.add.sprite(game.config.width/2,game.config.height/2,'gameover');
        this.game_over.setScale(1);
        this.game_over.setVisible(false);

        this.final = this.add.text(game.config.width/3.9, game.config.height/2.7, "SCORE: " + 555, {align: "center",fontSize:'70px', fontFamily: "Love Ya Like A Sister", color: "black"});
        this.final.setVisible(false);
        this.hs_banner = this.add.text(game.config.width/2.9, game.config.height/1.9, "HIGH SCORE!", {align: "center",fontSize:'40px', fontFamily: "Love Ya Like A Sister", color: "red"});
        this.hs_banner.setVisible(false);
        //this.add.rectangle(20, 22, 100,40, 0xdbc6a7).setOrigin(0, 0);
        //this.bar.destroy();

        this.score_txt = this.add.text(25,25, "Score:", {fontSize:'30px', fontFamily: "Love Ya Like A Sister", color: "#332818"});
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
            frameRate: 10,
            repeat: -1
        });

        //play animations
        this.crank_pu.anims.play('crank_anim');
        this.main_soldier.anims.play('walking');
        //this.crank_pu.anims.play('crank_anim');

        this.physics.world.setBounds(-50,40, 640, 420);
        //this.physics.world.gravity.y = 150;

        this.main_soldier.setVelocity(0,0);
        this.crank_prog = 300;
        this.score = 0;
        this.intro = 0;
        this.timer = 0;
        this.go = 0;

        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        

    }

    update() {

        this.score_txt.setText("Score: " + Phaser.Math.RoundTo(this.score, 0));
        if (this.crank_prog > 0 && this.intro == 1 && this.go == 0){
            game.settings.multiplier += .0005
            this.score += .05;
            if(this.crank_prog > 25){
                this.crank_prog -= .1
            } else{
                this.crank_prog -= .05

            }
            this.bar.clear();
            if(this.crank_prog > 150){
                this.bar.fillStyle(0x37a113, 1);
            } else if (this.crank_prog >= 50 && this.crank_prog <= 150){
                this.bar.fillStyle(0xe6a502, 1);
            } else{
                this.bar.fillStyle(0xab1513, 1);
            }
            this.bar.fillRoundedRect(this.game.config.width - 320, 20, this.crank_prog, 40,{ tl: 10, tr: 0, bl: 10, br: 0});
        }
        
        if (this.intro == 1 && this.go == 0){
            if (game.input.activePointer.isDown) {
                this.main_soldier.setVelocityY(-game.settings.player_velocity * game.settings.multiplier * .75)
            } else{
                this.main_soldier.setVelocityY(game.settings.player_velocity * game.settings.multiplier * 1.25 * .75)
            }
        
        }

        //walking in
        if(this.main_soldier.x < 75){
            this.main_soldier.x += 2

        } else{
            this.intro = 1
        }

        if(this.checkCollision(this.main_soldier, this.blocks_lower)) {
            this.sound.play('explosion');
            this.bgM.play();
            this.blocks_lower.x +=  game.config.width;
            this.blocks_lower.y = game.config.height - (Math.random()*100) - 125
            if(this.crank_prog >= 50){
                this.crank_prog -= 50;
            } else{
                this.crank_prog = 0;
            }
        }
        if(this.checkCollision(this.main_soldier, this.blocks_upper)) {
            this.sound.play('explosion');
            this.bgM.play();
            this.blocks_upper.x += game.config.width;
            this.blocks_upper.y = game.config.height - (Math.random()*100) - 125
            if(this.crank_prog >= 50){
                this.crank_prog -= 50;
            } else{
                this.crank_prog = 0;
            }
        }
        if(this.checkCollision(this.main_soldier, this.crank_pu)) {
            this.sound.play('collect');
            this.crank_pu.x += game.config.width;
            if (this.crank_prog > 280){
                this.crank_prog = 300;
            }else{
                this.crank_prog += 30;
            }
        }

        //updates
        if(this.intro == 1 && this.go == 0){
            //update bgs
            this.livingroom.tilePositionX += game.settings.bg_speed / 4 * game.settings.multiplier;
            this.floor.tilePositionX += game.settings.bg_speed * game.settings.multiplier;
        
            //update sprites
            this.crank_pu.update()
            this.blocks_lower.update()
            this.blocks_upper.update()
        }

        if(this.crank_prog <= 0){
            
            
            this.bar.clear()
            if (this.go == 0){
                this.sound.play('warning');
                this.go = 1;
            }
            //this.go = 1;
            this.main_soldier.setVelocity(0,0);
            this.game_over.setVisible(true);
            this.final.setText("SCORE: " + Phaser.Math.RoundTo(this.score, 0));
            this.final.setVisible(true);
            if(this.score > high_score){
                high_score = this.score;
                this.hs_banner.setVisible(true);
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyB)) {
                this.sound.play('menu_select');
                this.scene.start('menuScene');
            } 
            if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
                this.sound.play('menu_select');
                this.scene.start('playScene');
            } 
        }
    }


checkCollision(soldier, enemy) {
    // simple AABB checking
    if (soldier.x < enemy.x + enemy.width-10 && 
      soldier.x + soldier.width-10 > enemy.x && 
      soldier.y < enemy.y + enemy.height-20 &&
      soldier.height-20 + soldier.y > enemy. y) {
      return true;
    } else {
      return false;
    }


  }
}