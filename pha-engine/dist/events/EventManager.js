"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.emitters = [];
        this.listeners = [];
    }
    EventManager.prototype.emit = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.listeners.forEach(function (listener) {
            if (listener.path === path)
                listener.cl.apply(listener, args);
        });
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
    return EventManager;
}());
exports.default = EventManager;
