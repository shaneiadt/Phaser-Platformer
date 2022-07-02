class Preload extends Phaser.Scene {
  constructor(config) {
    super('Preload');
  }

  preload = (): void => {
    this.load.tilemapTiledJSON('map', 'assets/crystal_world_map.json');
    this.load.image('tiles-1', 'assets/main_lev_build_1.png');
    this.load.image('tiles-2', 'assets/main_lev_build_2.png');
    this.load.image('player', 'assets/player/movements/idle01.png');
  };

  create = (): void => {
    this.scene.start('Play');
  };
}

export default Preload;
