"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relay = exports.addingRelayExceptions = void 0;
var __1 = require("..");
var addingRelayExceptions;
(function (addingRelayExceptions) {
    addingRelayExceptions[addingRelayExceptions["invalid_data"] = 0] = "invalid_data";
    addingRelayExceptions[addingRelayExceptions["wrong_characters"] = 1] = "wrong_characters";
    addingRelayExceptions[addingRelayExceptions["relay_already_exists"] = 2] = "relay_already_exists";
    addingRelayExceptions[addingRelayExceptions["gpio_used"] = 3] = "gpio_used";
})(addingRelayExceptions || (exports.addingRelayExceptions = addingRelayExceptions = {}));
var Relay = /** @class */ (function () {
    function Relay(esp, name) {
        this.esp = esp;
        this.name = name;
        this.path = "".concat(this.esp.getPathName(), ".relay.").concat(name);
        this.initListeners();
    }
    Relay.prototype.handle = function (state) {
        if (this.state === state)
            return;
        this.state = state;
        this.esp.ws.send(["set_relay_state", this.name, state].join(","));
    };
    Relay.prototype.initListeners = function () {
        var _this = this;
        __1.Engine.eventMgr.listeners.push({
            path: this.path + ".on",
            cl: function () { return _this.handle("on"); }
        });
        __1.Engine.eventMgr.listeners.push({
            path: this.path + ".off",
            cl: function () { return _this.handle("off"); }
        });
    };
    return Relay;
}());
exports.Relay = Relay;
