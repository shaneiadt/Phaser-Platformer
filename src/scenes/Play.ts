class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('Play');
  }

  create = (): void => {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const player = this.createPlayer();

    this.physics.add.collider(player, layers.platformColliders);
  };

  createPlayer = (): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody => {
    const player = this.physics.add.sprite(100, 250, 'player').setGravityY(500);

    return player;
  };

  createMap = (): Phaser.Tilemaps.Tilemap => {
    const map = this.make.tilemap({ key: 'map' });

    map.addTilesetImage('main_lev_build_1', 'tiles-1');

    return map;
  };

  createLayers = (
    map: Phaser.Tilemaps.Tilemap,
  ): {
    env: Phaser.Tilemaps.TilemapLayer;
    platforms: Phaser.Tilemaps.TilemapLayer;
    platformColliders: Phaser.Tilemaps.TilemapLayer;
  } => {
    const tileset = map.getTileset('main_lev_build_1');

    const platformColliders = map.createLayer('platform_colliders', tileset);
    const env = map.createLayer('environment', tileset);
    const platforms = map.createLayer('platforms', tileset);

    platformColliders.setCollisionByProperty({ collides: true });

    return {
      env,
      platforms,
      platformColliders,
    };
  };
}

export default PlayScene;
