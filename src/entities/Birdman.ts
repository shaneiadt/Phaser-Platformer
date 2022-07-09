import Enemy from './Enemy';

class Birdman extends Enemy {
  gravity: number;
  speed: number;
  body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'birdman');
  }
}

export default Birdman;
