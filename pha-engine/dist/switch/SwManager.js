"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwManager = void 0;
var constants_1 = require("../constants");
var fs_1 = __importDefault(require("fs"));
var DummySwitch_1 = require("./DummySwitch");
var SwManager = /** @class */ (function () {
    function SwManager() {
        this.switches = [];
        this.load();
    }
    SwManager.prototype.get = function (name) {
        for (var i in this.switches) {
            if (this.switches[i].name === name)
                return this.switches[i];
        }
        return undefined;
    };
    SwManager.prototype.stateExists = function (entity, state) {
        var sw = this.get(entity);
        var found = false;
        sw === null || sw === void 0 ? void 0 : sw.swElements.forEach(function (s) {
            if (s.state === state)
                found = true;
        });
        return found;
    };
    SwManager.prototype.exists = function (entityName) {
        return this.switches.filter(function (sw) {
            return sw.name === entityName;
        }).length > 0;
    };
    SwManager.prototype.save = function () {
        fs_1.default.writeFile(constants_1.SWITCHES_DATA, JSON.stringify(this.switches.filter(function (sw) {
            return typeof sw["save"] !== "undefined";
        }).map(function (sw) {
            return {
                name: sw.name,
                swElements: sw.swElements
            };
        })), "utf-8", function (err) {
            if (err)
                throw err;
        });
    };
    SwManager.prototype.load = function () {
        var _this = this;
        if (!fs_1.default.existsSync(constants_1.SWITCHES_DATA))
            return;
        JSON.parse(fs_1.default.readFileSync(constants_1.SWITCHES_DATA, "utf-8")).map(function (sw) {
            _this.switches.push(new DummySwitch_1.DummySwitch(sw.name, sw.swElements));
        });
    };
    return SwManager;
}());
exports.SwManager = SwManager;
