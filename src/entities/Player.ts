import * as Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    scene.physics.add.existing(this);
    this.scene.add.existing(this);
  }
}

export default Player;
