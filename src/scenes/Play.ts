import BaseEntity from '../entities/BaseEntity';
import Enemy from '../entities/Enemy';
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
    const { start, end } = this.getPlayerZones(layers.playerZones);
    const player = new Player(this, start.x, start.y);
    const enemies = this.createEnemmies(layers.enemySpawns);

    this.createEntityColliders(player, [{ collidable: layers.platformColliders }]);

    for (const enemy of enemies) {
      this.createEntityColliders(enemy, [{ collidable: layers.platformColliders }, { collidable: player }]);
    }

    this.createEndOfLevel(end, player);
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
    playerZones: Phaser.Tilemaps.ObjectLayer;
    enemySpawns: Phaser.Tilemaps.ObjectLayer;
  } => {
    const tileset = map.getTileset('main_lev_build_1');

    const platformColliders = map.createLayer('platform_colliders', tileset).setAlpha(0);
    const env = map.createLayer('environment', tileset);
    const platforms = map.createLayer('platforms', tileset);
    const playerZones = map.getObjectLayer('player_zones');
    const enemySpawns = map.getObjectLayer('enemy_spawns');

    platformColliders.setCollisionByProperty({ collides: true });

    return {
      env,
      platforms,
      platformColliders,
      playerZones,
      enemySpawns,
    };
  };

  createEntityColliders = (
    entity: BaseEntity,
    colliders: { collidable: Phaser.GameObjects.GameObject; callback?: () => void }[],
  ): void => {
    for (const collider of colliders) {
      entity.addCollider(collider.collidable, collider.callback);
    }
  };

  setupFollowupCameraOn = (player: Player): void => {
    const { height, width, mapOffset, zoom } = this.config;

    this.physics.world.setBounds(0, 0, width + mapOffset, height);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoom);
    this.cameras.main.startFollow(player);
  };

  getPlayerZones = (
    playerZonesLayer: Phaser.Tilemaps.ObjectLayer,
  ): {
    start: Phaser.Types.Tilemaps.TiledObject;
    end: Phaser.Types.Tilemaps.TiledObject;
  } => {
    const playerZones = playerZonesLayer.objects;

    return {
      start: playerZones[0],
      end: playerZones[1],
    };
  };

  createEndOfLevel(end: Phaser.Types.Tilemaps.TiledObject, player: Player): void {
    const endOfLevel = this.physics.add
      .sprite(end.x, end.y, 'end')
      .setSize(5, this.config.height * 2)
      .setAlpha(0);

    const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      eolOverlap.active = false;
    });
  }

  createEnemmies(enemySpawns: Phaser.Tilemaps.ObjectLayer): Enemy[] {
    const enemies: Enemy[] = [];
    const spawns = enemySpawns.objects;

    for (const spawn of spawns) {
      enemies.push(new Enemy(this, spawn.x, spawn.y));
    }

    return enemies;
  }
}

export default PlayScene;
