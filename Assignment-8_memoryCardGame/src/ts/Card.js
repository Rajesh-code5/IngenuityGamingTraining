"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Card = exports.CARD_HEIGHT = exports.CARD_WIDTH = exports.cardFrames = void 0;
var pixi_js_1 = require("pixi.js");
var Textures_1 = require("./Textures");
exports.cardFrames = [];
exports.CARD_WIDTH = 150;
exports.CARD_HEIGHT = 150;
for (var c = 0; c < 4; c++) {
    for (var r = 0; r < 6; r++) {
        for (var i = 0; i < 2; i++) {
            exports.cardFrames.push({
                name: "card-" + c + "-" + r,
                frame: [exports.CARD_WIDTH * c, exports.CARD_HEIGHT * r, exports.CARD_WIDTH, exports.CARD_HEIGHT]
            });
        }
    }
}
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(back, front) {
        var _this = _super.call(this) || this;
        var frontTexture = _this.getFrontTexture(front);
        _this.front = _this.createSprite(frontTexture);
        _this.back = _this.createSprite((0, Textures_1.getTexture)(back));
        _this.name = front.frame.name;
        _this.interactive = true;
        _this.buttonMode = true;
        return _this;
    }
    Card.prototype.createSprite = function (texture) {
        var sprite = new pixi_js_1.Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.width = exports.CARD_WIDTH;
        sprite.height = exports.CARD_HEIGHT;
        this.addChild(sprite);
        return sprite;
    };
    Card.prototype.getFrontTexture = function (data) {
        var baseTexture = new pixi_js_1.BaseTexture((0, Textures_1.getResource)(data.id).url);
        var frameRect = new (pixi_js_1.Rectangle.bind.apply(pixi_js_1.Rectangle, __spreadArray([void 0], data.frame.frame, false)))();
        return new pixi_js_1.Texture(baseTexture, frameRect);
    };
    return Card;
}(pixi_js_1.Container));
exports.Card = Card;
