import BaseEntity from './BaseEntity';

class Enemy extends BaseEntity {
  gravity: number;
  speed: number;
  body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'enemy');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.setOrigin(0.5, 1);

    this.init();
  }

  init = (): void => {
    this.gravity = 500;
    this.speed = 150;

    this.setGravityY(this.gravity);
    this.setSize(20, 45);
    this.setOffset(7, 20);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
  };
}

export default Enemy;
