import * as Phaser from 'phaser';

import PlayScene from './scenes/PlayScene';

const WIDTH = 1280;
const HEIGHT = 600;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
};

const Scenes = [PlayScene];

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG));

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  render: {
    pixelArt: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scene: initScenes(),
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
