"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
var MetadataKeys_1 = require("./MetadataKeys");
var Middleware = function (cb) {
    return function (target, propertyKey) {
        var controllerClass = target.constructor;
        var middlewares = Reflect.hasMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARES, controllerClass) ? Reflect.getMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARES, controllerClass) : [];
        middlewares.push({
            cb: cb,
            handlerName: String(propertyKey)
        });
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARES, middlewares, controllerClass);
    };
};
exports.Middleware = Middleware;
