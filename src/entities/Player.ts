import initAnimations from './playerAnims';

class Player extends Phaser.Physics.Arcade.Sprite {
  gravity: number;
  speed: number;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    this.initEvents();
  }

  init = (): void => {
    this.gravity = 500;
    this.speed = 150;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.setGravityY(this.gravity);

    initAnimations(this.scene.anims);
  };

  initEvents = (): void => {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update);
  };

  update = (): void => {
    const { left, right, up } = this.cursors;

    if (left.isDown) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (up.isDown) {
      this.setVelocityY(-200);
      this.play('run', true);
    }

    this.body.velocity.x !== 0 ? this.play('run', true) : this.play('idle', true);
  };
}

export default Player;
