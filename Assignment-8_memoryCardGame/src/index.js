"use strict";
exports.__esModule = true;
// import * as PIXI from 'pixi.js';
require("./css/main.scss");
var pixi_js_1 = require("pixi.js");
// eslint-disable-next-line import/extensions,import/no-unresolved
var Game_1 = require("./ts/Game");
window.onload = function () {
    var app = new pixi_js_1.Application({
        width: 1400,
        height: 1200,
        backgroundColor: 0x003b00,
        // resizeTo: window,
        sharedTicker: true,
        sharedLoader: true
    });
    document.body.appendChild(app.view);
    var game = new Game_1.Game(app);
    var ticker = pixi_js_1.Ticker.shared;
    ticker.add(game.update.bind(game));
};
