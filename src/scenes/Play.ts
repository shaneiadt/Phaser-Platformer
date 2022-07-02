class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('Play');
  }

  create = (): void => {
    const map = this.make.tilemap({ key: 'map' });
    const tileset1 = map.addTilesetImage('main_lev_build_1', 'tiles-1');
    // const tileset2 = map.addTilesetImage('main_lev_build_2', 'tiles-2');

    map.createLayer('environment', tileset1);
    map.createLayer('platforms', tileset1);
  };
}

export default PlayScene;
