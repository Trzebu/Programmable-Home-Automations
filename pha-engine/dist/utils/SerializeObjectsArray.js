"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeObjectsArray = void 0;
var SerializeObjectsArray = function (data) {
    return JSON.stringify(data.map(function (v) {
        var keys = {};
        for (var key in v) {
            if (!v.skipOnSerialize.includes(key) && key !== "skipOnSerialize")
                keys[key] = v[key];
        }
        return keys;
    }));
};
exports.SerializeObjectsArray = SerializeObjectsArray;
