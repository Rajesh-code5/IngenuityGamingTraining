"use strict";
exports.__esModule = true;
exports.shuffleArray = void 0;
function shuffleArray(array) {
    return array.sort(function () { return Math.random() - 0.5; });
}
exports.shuffleArray = shuffleArray;
