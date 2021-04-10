class play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.preload.image('rocket', './assets/rocket.png');
        this.preload.image('spaceship', './assets/spaceship.png')
        this.preload.image('starfield', './assets/starfield.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png',{
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });

    }

    create(){
        // place starfield
        this.starfield = this.add.tileSprite(0,0, 640, 480, 'starfield').setOrigin(0,0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width
        borderUISize * 2 0x00FF00 0x00FF00).setOrigin(0,0);
        // whiteborders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize - borderPadding, 0xFFFFFF,).setOrigin(0,0);

        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, 0, borderUISize, game.config.height,
            0xFFFFFF).setOrigin(0,0)

        //add rocket (player 1)
        this.p1Rocket = new this.p1Rocket(this, game.config.width/2, game.config.height - borderUISize, 'rocket').setOrigin(0.5, 0); 
        
        //add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
            'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5,
            'spaceship', 0, 20).setOrigin(0, 0);    
        this.ship03 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
            'spaceship', 0, 10).setOrigin(0, 0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Left);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Right);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
    }
    update(){
        this.starfield.tilePositionX -= starSpeed;

        //update rocket
        this.p1Rocket.update();
        // update spaceships (x3)
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.ship03.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.ship02.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.ship01.reset();
        }
    }

    checkCollision(rocket, ship){

        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship){
        //temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite ate ships position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
    }
}