"use strict";
exports.__esModule = true;
exports.Game = void 0;
var pixi_js_1 = require("pixi.js");
var gsap_1 = require("gsap");
var PreLoader_1 = require("./PreLoader");
var assets_1 = require("./assets");
var Card_1 = require("./Card");
var utils_1 = require("./utils");
//mport { title } from 'process';
var flag = 0;
var Game = /** @class */ (function () {
    function Game(app) {
        var _this = this;
        this.isInitialized = false;
        this.app = app;
        this.stage = app.stage;
        this.start = new pixi_js_1.Container();
        this.stop = new pixi_js_1.Container();
        this.game = new pixi_js_1.Container();
        this.stage.addChild(this.game, this.start);
        this.game.visible = false;
        (0, PreLoader_1.preLoader)(assets_1["default"], function () {
            _this.isInitialized = true;
            _this.createStartText();
            _this.createCards();
            _this.placeCards();
            _this.endText();
        });
        console.warn(this.app);
    }
    Game.prototype.endText = function () {
        var titlee = new pixi_js_1.BitmapText('End Game', { fontName: 'Desyrel', fontSize: 120,
            align: 'center' });
        titlee.anchor.set(0.5, 0.5);
        titlee.x = this.app.view.width / 2;
        titlee.y = titlee.height;
        var stop = new pixi_js_1.BitmapText('End Game', {
            fontName: 'Desyrel',
            fontSize: 50,
            align: 'center'
        });
        stop.anchor.set(0.5);
        stop.position.set(this.app.view.width / 2, this.app.view.height / 2);
        this.stop.addChild(titlee, stop);
        // this.game.visible=false;
        this.stop.visible = false;
        //this.stage.addChild(stop);
    };
    Game.prototype.createStartText = function () {
        var _this = this;
        var title = new pixi_js_1.BitmapText('Card Game', {
            fontName: 'Desyrel',
            fontSize: 120,
            align: 'center'
        });
        title.anchor.set(0.5);
        title.x = this.app.view.width / 2;
        title.y = title.height;
        var start = new pixi_js_1.BitmapText('Click here to play game', {
            fontName: 'Desyrel',
            fontSize: 50,
            align: 'center'
        });
        start.anchor.set(0.5);
        start.position.set(this.app.view.width / 2, this.app.view.height / 2);
        start.buttonMode = true;
        start.interactive = true;
        start.on('pointerup', function () {
            _this.start.visible = false;
            _this.game.visible = true;
            _this.stage.removeChild(_this.start);
        });
        this.start.addChild(title, start);
    };
    Game.prototype.next = function () {
        this.firstSelection = undefined;
        this.secondSelection = undefined;
        this.cardEnabled(true);
    };
    Game.prototype.checkResult = function () {
        var _this = this;
        if (this.firstSelection && this.secondSelection) {
            if (this.firstSelection.name === this.secondSelection.name) {
                flag++;
                gsap_1.gsap.to([this.firstSelection, this.secondSelection], {
                    width: 160,
                    height: 160,
                    alpha: 0,
                    duration: 0.75,
                    onComplete: function () {
                        _this.game.removeChild(_this.firstSelection);
                        _this.game.removeChild(_this.secondSelection);
                        if (flag === 24) {
                            _this.stage.addChild(_this.stop);
                            _this.game.visible = false;
                            _this.stop.visible = true;
                        }
                        _this.next();
                    }
                });
            }
            else {
                gsap_1.gsap.fromTo([this.firstSelection, this.secondSelection], { rotation: 0.5 }, {
                    rotation: 0,
                    ease: 'elastic',
                    duration: 0.5,
                    onComplete: function () {
                        _this.firstSelection.back.visible = true;
                        _this.secondSelection.back.visible = true;
                        _this.next();
                    }
                });
            }
        }
        console.log(flag);
    };
    Game.prototype.createCards = function () {
        var _this = this;
        (0, utils_1.shuffleArray)(Card_1.cardFrames).forEach(function (cardFrame) {
            var card = new Card_1.Card('back', { id: 'front', frame: cardFrame });
            card.on('pointerup', function () {
                card.interactive = false;
                gsap_1.gsap.to(card.back, {
                    alpha: 0,
                    duration: 0.5,
                    onComplete: function () {
                        card.back.visible = false;
                        card.back.alpha = 1;
                    }
                });
                if (_this.firstSelection) {
                    _this.secondSelection = card;
                    _this.cardEnabled(false);
                    setTimeout(_this.checkResult.bind(_this), 1000);
                }
                else {
                    _this.firstSelection = card;
                }
            });
            _this.game.addChild(card);
        });
    };
    Game.prototype.cardEnabled = function (value) {
        this.game.children.forEach(function (child) {
            // eslint-disable-next-line no-param-reassign
            child.interactive = value;
        });
    };
    Game.prototype.placeCards = function () {
        var count = 0;
        var PADDING = 20;
        var OFFSET = 100;
        for (var r = 0; r < 6; r++) {
            for (var c = 0; c < 8; c++) {
                var card = this.game.getChildAt(count);
                card.x = c * (Card_1.CARD_WIDTH + PADDING) + OFFSET;
                card.y = r * (Card_1.CARD_HEIGHT + PADDING) + OFFSET;
                count++;
            }
        }
    };
    Game.prototype.update = function (delta) {
        if (this.isInitialized) {
            // console.warn(delta);
            // eslint-disable-next-line no-unused-expressions
            delta;
        }
    };
    return Game;
}());
exports.Game = Game;
