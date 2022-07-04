import Player from '../entities/Player';

class PlayScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  player: Player;
  velocity: number;

  constructor(config) {
    super('Play');
  }

  create = (): void => {
    const map = this.createMap();
    const layers = this.createLayers(map);
    this.player = this.createPlayer();
    this.velocity = 200;
    this.physics.add.collider(this.player, layers.platformColliders);

    this.cursors = this.input.keyboard.createCursorKeys();
  };

  createPlayer = (): Player => {
    const player = new Player(this, 100, 250);

    player.setGravityY(500);

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

  update = (): void => {
    const { left, right } = this.cursors;

    if (left.isDown) {
      this.player.setVelocityX(-this.velocity);
      !this.player.flipX && this.player.setFlipX(true);
    } else if (right.isDown) {
      this.player.setVelocityX(this.velocity);
      this.player.flipX && this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }
  };
}

export default PlayScene;
