"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDecoratedParams = void 0;
var MetadataKeys_1 = require("./MetadataKeys");
var searchDecoratedParams = function (handlerName, controllerClass) {
    var metadata = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.PARAMS, controllerClass);
    if (!metadata)
        return null;
    return metadata.filter(function (param) {
        return param.methodName === handlerName;
    });
};
exports.searchDecoratedParams = searchDecoratedParams;
