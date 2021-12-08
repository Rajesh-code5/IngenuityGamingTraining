"use strict";
exports.__esModule = true;
exports.getTexture = exports.getResource = exports.setResources = exports.getAllTexture = void 0;
var resources;
function getAllTexture() {
    var keys = Object.keys(resources);
    var textures = {};
    keys.forEach(function (key) {
        textures[key] = resources[key].texture;
    });
    return textures;
}
exports.getAllTexture = getAllTexture;
function setResources(value) {
    resources = value;
    getAllTexture();
}
exports.setResources = setResources;
function getResource(id) {
    return resources[id];
}
exports.getResource = getResource;
function getTexture(id) {
    if (id in resources) {
        return resources[id].texture;
    }
    return null;
}
exports.getTexture = getTexture;
