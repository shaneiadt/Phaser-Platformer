import BaseEntity from './BaseEntity';
import initAnimations from '../anims/playerAnims';

class Player extends BaseEntity {
  gravity: number;
  speed: number;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  body: Phaser.Physics.Arcade.Body;
  jumpCount: number;
  consecutiveJumps: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.setOrigin(0.5, 1);

    this.init();
    this.initEvents();
  }

  init = (): void => {
    this.gravity = 500;
    this.speed = 150;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.setGravityY(this.gravity);
    this.setSize(20, 36);

    initAnimations(this.scene.anims);
  };

  initEvents = (): void => {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update);
  };

  update = (): void => {
    const { left, right, space, up } = this.cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    const onFloor = this.body.onFloor();

    if (left.isDown) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.setVelocityY(-this.speed * 1.75);
      this.jumpCount++;
    }

    if (onFloor) {
      this.jumpCount = 0;
    }

    onFloor ? (this.body.velocity.x !== 0 ? this.play('run', true) : this.play('idle', true)) : this.play('jump', true);
  };
}

export default Player;
