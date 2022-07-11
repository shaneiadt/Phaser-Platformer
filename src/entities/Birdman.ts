import Enemy from './Enemy';

import initAnims from '../anims/birdmanAnims';

class Birdman extends Enemy {
  gravity: number;
  speed: number;
  body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'birdman');

    initAnims(this.scene.anims);

    this.initEvents();
  }

  initEvents = (): void => {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update);
  };

  update = (): void => {
    this.play('birdman-idle', true);

    this.setVelocityX(30);
  };
}

export default Birdman;
