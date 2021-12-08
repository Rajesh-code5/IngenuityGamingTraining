// import * as PIXI from 'pixi.js';
import './css/main.scss';
import { Application, Ticker } from 'pixi.js';

// eslint-disable-next-line import/extensions,import/no-unresolved
import { Game } from './ts/Game';

window.onload = () => {
  const app = new Application({
    width: 1400,
    height: 1200,
    backgroundColor: 0x003b00,
    // resizeTo: window,
    sharedTicker: true,
    sharedLoader: true,
    // resolution: window.devicePixelRatio
  });

  document.body.appendChild(app.view);

  const game = new Game(app);
  const ticker = Ticker.shared;
  ticker.add(game.update.bind(game));
};
