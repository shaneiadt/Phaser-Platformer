import * as Phaser from 'phaser';

import Play from './scenes/Play';
import Preload from './scenes/Preload';

const MAP_WIDTH = 1600;
const WIDTH = document.body.offsetWidth;
const HEIGHT = 600;

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoom: 1.1,
};

const Scenes = [Preload, Play];

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG));

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  // render: {
  //   pixelArt: true,
  // },
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
