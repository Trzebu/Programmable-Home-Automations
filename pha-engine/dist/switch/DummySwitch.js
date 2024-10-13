"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummySwitch = void 0;
var __1 = require("..");
var EventType_1 = require("../events/EventType");
var DummySwitch = /** @class */ (function () {
    function DummySwitch(name, swElements) {
        var _this = this;
        this.name = name;
        this.swElements = swElements;
        this.state = swElements[0].state;
        swElements.forEach(function (sw) {
            __1.Engine.eventMgr.listeners.push({
                path: "switch.".concat(name, ".").concat(sw.state),
                evtType: EventType_1.EventType.USE_SWITCH,
                cl: function () { return _this.handle(sw.state); }
            });
        });
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
