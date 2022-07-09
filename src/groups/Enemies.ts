import { EnemyTypes } from './../types/index';

class Enemies extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  getTypes = (): unknown => {
    return EnemyTypes;
  };
}

export default Enemies;
