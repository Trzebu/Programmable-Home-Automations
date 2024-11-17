"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var constants_1 = require("../constants");
var fs_1 = __importDefault(require("fs"));
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.emitters = [];
        this.listeners = [];
        this.entitiesData = [];
        this.ENTITIES_DATA_PATH = "".concat(constants_1.DATA_PATH, "/entities_data.json");
        this.loadData();
        __1.Engine.saveable.push(this);
    }
    EventManager.prototype.emit = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var response;
        this.listeners.forEach(function (listener) {
            if (listener.path === path)
                response = listener.cl.apply(listener, args);
        });
        return response;
    };
    EventManager.prototype.exists = function (path) {
        return this.listeners.filter(function (listener) {
            return listener.path === path;
        }).length > 0;
    };
    EventManager.prototype.emitterExists = function (path) {
        return this.emitters.filter(function (e) {
            return e.path === path;
        }).length > 0;
    };
    EventManager.prototype.save = function () {
        fs_1.default.writeFile(this.ENTITIES_DATA_PATH, JSON.stringify(this.entitiesData), "utf-8", function (err) {
            if (err)
                throw err;
        });
    };
    EventManager.prototype.loadData = function () {
        if (!fs_1.default.existsSync(this.ENTITIES_DATA_PATH))
            return;
        this.entitiesData = JSON.parse(fs_1.default.readFileSync(this.ENTITIES_DATA_PATH, "utf-8"));
    };
    return EventManager;
}());
exports.default = EventManager;
