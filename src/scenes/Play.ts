import Player from '../entities/Player';

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('Play');
  }

  create = (): void => {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const player = new Player(this, 100, 250);

    this.createPlayerColliders(player, {
      colliders: {
        platformColliders: layers.platformColliders,
      },
    });
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

  createPlayerColliders = (
    player: Player,
    { colliders }: { colliders: { platformColliders: Phaser.Tilemaps.TilemapLayer } },
  ): void => {
    player.addCollider(colliders.platformColliders);
  };
}

export default PlayScene;
