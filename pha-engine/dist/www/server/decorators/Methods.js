"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Post = exports.Get = exports.Methods = void 0;
var MetadataKeys_1 = require("./MetadataKeys");
require("reflect-metadata");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["DELETE"] = "delete";
})(Methods || (exports.Methods = Methods = {}));
var methodDecoratorFactory = function (method) {
    return function (path) {
        return function (target, propertyKey) {
            var controllerClass = target.constructor;
            var methods = Reflect.hasMetadata(MetadataKeys_1.MetadataKeys.METHODS, controllerClass) ? Reflect.getMetadata(MetadataKeys_1.MetadataKeys.METHODS, controllerClass) : [];
            methods.push({
                method: method,
                path: path,
                handlerName: propertyKey,
            });
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.METHODS, methods, controllerClass);
        };
    };
};
exports.Get = methodDecoratorFactory(Methods.GET);
exports.Post = methodDecoratorFactory(Methods.POST);
exports.Delete = methodDecoratorFactory(Methods.DELETE);
