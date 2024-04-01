"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unix_time = void 0;
var unix_time = function () {
    var now = new Date();
    return (now.getTime() / 1000);
};
exports.unix_time = unix_time;
