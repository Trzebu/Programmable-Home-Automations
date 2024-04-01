"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONToObjectsArr = void 0;
var fs_1 = __importDefault(require("fs"));
var JSONToObjectsArr = function (path, object) {
    return JSON.parse(fs_1.default.readFileSync(path, "utf-8")).map(function (data) {
        var objectInstance = new object();
        for (var i in data) {
            objectInstance[i] = data[i];
        }
        return objectInstance;
    });
};
exports.JSONToObjectsArr = JSONToObjectsArr;
