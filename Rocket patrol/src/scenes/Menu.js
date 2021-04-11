class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create(){
        this.add.text(20,20, "Rocket Patrol Menu");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      }
}