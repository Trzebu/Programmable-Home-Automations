"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Humidity = void 0;
var unix_time_1 = require("../../../utils/unix_time");
var MqttStates_1 = require("../../MqttStates");
var Humidity = /** @class */ (function () {
    function Humidity(mqttName, friendlyName, config) {
        this.linkquality = 0;
        this.timestamp = 0;
        this.friendlyName = friendlyName;
        this.mqttName = mqttName;
        this.config = config;
    }
    Humidity.prototype.touch = function (msg) {
        var acceptedStates = [MqttStates_1.MqttStates.BatteryState, MqttStates_1.MqttStates.Linkquality, MqttStates_1.MqttStates.Humidity];
        for (var exposed in this.config.exposes) {
            if (msg[exposed]) {
                if (acceptedStates.includes(this.config.exposes[exposed])) {
                    this[exposed] = msg[exposed];
                }
            }
        }
        this.timestamp = (0, unix_time_1.unix_time)();
    };
    return Humidity;
}());
exports.Humidity = Humidity;
