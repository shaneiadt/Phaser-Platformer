class Preload extends Phaser.Scene {
  constructor(config) {
    super('Preload');
  }

  preload = (): void => {
    this.load.tilemapTiledJSON('map', 'assets/crystal_world_map.json');
    this.load.image('tiles-1', 'assets/main_lev_build_1.png');
    this.load.image('tiles-2', 'assets/main_lev_build_2.png');

    this.load.spritesheet('player', 'assets/player/move_sprite_1.png', {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });

    this.load.spritesheet('enemy', 'assets/enemy/enemy_sheet.png', {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32,
    });
  };

  create = (): void => {
    this.scene.start('Play');
  };
}

export default Preload;
