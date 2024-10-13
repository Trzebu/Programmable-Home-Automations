"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temperature = void 0;
var __1 = require("../../..");
var EventType_1 = require("../../../events/EventType");
var unix_time_1 = require("../../../utils/unix_time");
var MqttStates_1 = require("../../MqttStates");
var Temperature = /** @class */ (function () {
    function Temperature(mqttName, friendlyName, config) {
        this.linkquality = 0;
        this.timestamp = 0;
        this.temperature = 0;
        this.friendlyName = friendlyName;
        this.mqttName = mqttName;
        this.config = config;
        this.evtEmitterName = 'sensors.temperature.zigbee.' + this.mqttName;
        __1.Engine.eventMgr.emitters.push({
            path: this.evtEmitterName,
            evtType: EventType_1.EventType.TEMPERATURE_READING
        });
    }
    Temperature.prototype.touch = function (msg) {
        var acceptedStates = [MqttStates_1.MqttStates.BatteryState, MqttStates_1.MqttStates.Linkquality, MqttStates_1.MqttStates.Temperature, MqttStates_1.MqttStates.TemperatureUnit];
        for (var exposed in this.config.exposes) {
            if (msg[exposed]) {
                if (acceptedStates.includes(this.config.exposes[exposed])) {
                    this[exposed] = msg[exposed];
                }
            }
        }
        __1.Engine.eventMgr.emit(this.evtEmitterName, this.temperature);
        this.timestamp = (0, unix_time_1.unix_time)();
    };
    return Temperature;
}());
exports.Temperature = Temperature;
