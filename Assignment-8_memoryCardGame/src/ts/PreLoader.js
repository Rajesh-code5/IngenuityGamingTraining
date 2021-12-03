"use strict";
exports.__esModule = true;
exports.preLoader = void 0;
var pixi_js_1 = require("pixi.js");
var Textures_1 = require("./Textures");
function addAssets(loader, assets) {
    assets.forEach(function (asset) {
        loader.add(asset);
    });
}
var progDiv;
function showProgress(e) {
    if (progDiv === undefined) {
        progDiv = document.createElement('div');
        progDiv.className = 'progress';
        document.body.appendChild(progDiv);
    }
    progDiv.style.width = e.progress + "%";
}
function loadComplete(loader, onCompleteCallback) {
    (0, Textures_1.setResources)(loader.resources);
    progDiv.style.display = 'none';
    onCompleteCallback();
}
function preLoader(assetList, callback) {
    var loader = pixi_js_1.Loader.shared;
    if (assetList.baseUrl) {
        loader.baseUrl = assetList.baseUrl;
    }
    addAssets(loader, assetList.images);
    loader.onProgress.add(showProgress);
    loader.onComplete.add(function (l) {
        console.log('res ', l.resources);
        loadComplete(l, callback);
    });
    loader.load();
    return loader;
}
exports.preLoader = preLoader;
