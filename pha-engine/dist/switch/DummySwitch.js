"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummySwitch = void 0;
var __1 = require("..");
var DummySwitch = /** @class */ (function () {
    function DummySwitch(name, swElements) {
        this.name = name;
        this.swElements = swElements;
        this.state = swElements[0].state;
    }
    DummySwitch.prototype.handle = function (state) {
        this.state = state;
        this.swElements.forEach(function (sw) {
            if (sw.state === state)
                if (sw.action !== "dummy")
                    __1.Engine.eventMgr.emit(sw.action);
        });
    };
    DummySwitch.prototype.save = function () { };
    return DummySwitch;
}());
exports.DummySwitch = DummySwitch;
