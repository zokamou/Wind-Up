class Menu extends Phaser.Scene{
  constructor(){
      super("menuScene");
  }

  preload() {
    this.load.spritesheet('soldier', './assets/soldier_ss.png', {frameWidth: 72, frameHeight: 88, startFrame: 0, endFrame: 3})
    this.load.spritesheet('crank', './assets/crank.png', {frameWidth: 63, frameHeight: 54, startFrame: 0, endFrame: 3})
    this.load.spritesheet('play', './assets/play.png', {frameWidth: 128, frameHeight: 32, startFrame: 0, endFrame: 1})
    this.load.spritesheet('controls', './assets/controls.png', {frameWidth: 128, frameHeight: 32, startFrame: 0, endFrame: 1})


    this.load.image("blocks", './assets/blocks.png', 72,84)
    this.load.image("title", './assets/title.png', 128,64)
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

      this.hs = this.add.text(game.config.width / 4.7,game.config.height - 75, "HIGH SCORE: " + Phaser.Math.RoundTo(high_score, 0), {fontSize:'30px', fontFamily: "Love Ya Like A Sister", color: "#e6ad12"});
      this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      //controls button
      this.c = this.add.sprite(game.config.width/2.8,game.config.height - borderUISize*5,'controls');
      this.c.setFrame(0);
      this.c.setScale(2);

      //instructions
      this.in = this.add.sprite(game.config.width/2,game.config.height/2,"instructions");
      this.in.setScale(1);
      this.in.setVisible(false);

      //click buttins
      this.c.on('pointerover', () => {
        this.c.setFrame(1);
      } );
      this.c.on('pointerout', () => {
        this.c.setFrame(0);
      });
      this.c.setInteractive();
      this.c.on('pointerdown', () => {
        game.settings = {
          multiplier: 1.5,
          player_velocity: 100,
          bg_speed: 2,
          gameTimer: 45000    
        }
        this.inst = 1;
      });
      

      
  }

  update(){
    if(this.inst == 1){
      this.in.setVisible(true);
      if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
        this.inst = 0;
        this.in.setVisible(false);
      } 
    }
  }


}