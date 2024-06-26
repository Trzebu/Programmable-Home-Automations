"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureStates = void 0;
var BaseStates_1 = require("./BaseStates");
var WirelessStates_1 = require("./WirelessStates");
exports.TemperatureStates = __assign(__assign({ Temperature: "temperature", Unit: "unit" }, WirelessStates_1.WirelessStates), BaseStates_1.BaseStates);
