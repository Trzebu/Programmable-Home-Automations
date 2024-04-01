"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChuj = void 0;
var HttpStatus_1 = require("../server/HttpStatus");
var isChuj = function (_, res) {
    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ msg: "401: unauthorized" });
    return false;
};
exports.isChuj = isChuj;
