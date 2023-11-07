class Menu extends Phaser.Scene{
  constructor(){
      super("menuScene");
  }

  preload() {

    this.load.audio('menu_select', './assets/click.wav');
    this.load.audio('explosion', './assets/explosion.wav');
    this.load.audio('warning', './assets//laserShoot.wav');
    this.load.audio('collect', './assets/pickupCoin.wav');
    this.load.audio('bgm', './assets/bgm.wav');
    

    



    this.load.spritesheet('soldier', './assets/soldier_ss.png', {frameWidth: 72, frameHeight: 88, startFrame: 0, endFrame: 3})
    this.load.spritesheet('crank', './assets/crank.png', {frameWidth: 63, frameHeight: 54, startFrame: 0, endFrame: 3})
    this.load.spritesheet('play', './assets/play.png', {frameWidth: 128, frameHeight: 32, startFrame: 0, endFrame: 1})
    this.load.spritesheet('controls', './assets/controls.png', {frameWidth: 128, frameHeight: 32, startFrame: 0, endFrame: 1})


    this.load.image("blocks", './assets/blocks.png', 72,84)
    this.load.image("title", './assets/title.png', 128,64)
    this.load.image("credits_button", './assets/credits.png', 72,84)
    this.load.image("credz", './assets/credz.png', 128,64)

    this.load.image("instructions", './assets/instructions.png', 128,64)


  }

  create() {
      
      //blocks
      this.b = this.add.sprite(game.config.width-borderUISize*3,game.config.height - borderUISize*6,"blocks");
      this.b.setScale(4);

      
      //title
      this.t = this.add.sprite(game.config.width/2.5, game.config.height/4,"title");
      this.t.setScale(3.5);

      //play button
      this.p = this.add.sprite(game.config.width/2.8,game.config.height - borderUISize*8,'play');
      this.p.setFrame(0);
      this.p.setScale(2);
      this.p.on('pointerover', () => {
        this.p.setFrame(1);
      } );
      this.p.on('pointerout', () => {
        this.p.setFrame(0);
      });

      this.p.setInteractive();
      this.p.on('pointerdown', () => {
        this.sound.play('menu_select');
        game.settings = {
          multiplier: 1.5,
          player_velocity: 100,
          bg_speed: 2,
          gameTimer: 45000    
        }
        if(tut_tog == 0){
          tut_tog = 1;
          this.scene.start('guideScene');
        }else{
          this.scene.start('playScene');
        }
       // this.scene.start('playScene');
      });

      //credits button
      this.cred = this.add.sprite(game.config.width/2.8,game.config.heig