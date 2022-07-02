class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
  }

  preload = (): void => {
    this.load.image('sky', 'assets/sky.png');
  };

  create = (): void => {
    this.add.image(0, 0, 'sky').setOrigin(0);
  };
}

export default PlayScene;
