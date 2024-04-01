"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummySwitch = void 0;
var DummySwitch = /** @class */ (function () {
    function DummySwitch(name, swElements) {
        this.name = name;
        this.swElements = swElements;
        this.state = swElements[0];
    }
    DummySwitch.prototype.handle = function () {
    };
    DummySwitch.prototype.save = function () { };
    return DummySwitch;
}());
exports.DummySwitch = DummySwitch;
