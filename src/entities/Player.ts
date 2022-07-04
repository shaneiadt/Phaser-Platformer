class Player extends Phaser.Physics.Arcade.Sprite {
  gravity: number;
  speed: number;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init = (): void => {
    this.gravity = 500;
    this.speed = 200;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.setGravityY(this.gravity);
  };

  preUpdate = (): void => {
    const { left, right } = this.cursors;

    if (left.isDown) {
      this.setVelocityX(-this.speed);
      !this.flipX && this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.speed);
      this.flipX && this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }
  };
}

export default Player;
