"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataKeys_1 = require("./MetadataKeys");
require("reflect-metadata");
var Controller = function (basePath) {
    return function (target) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.BASE_PATH, basePath, target);
    };
};
exports.default = Controller;
