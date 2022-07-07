import Player from '../entities/Player';

type ISharedConfig = {
  height: number;
  width: number;
  mapOffset: number;
  zoom: number;
};

class PlayScene extends Phaser.Scene {
  config: ISharedConfig;

  constructor(config: ISharedConfig) {
    super('Play');

    this.config = config;
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

    this.setupFollowupCameraOn(player);
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

  setupFollowupCameraOn = (player: Player): void => {
    const { height, width, mapOffset, zoom } = this.config;

    this.physics.world.setBounds(0, 0, width + mapOffset, height);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoom);
    this.cameras.main.startFollow(player);
  };
}

export default PlayScene;
