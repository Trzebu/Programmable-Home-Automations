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
        this.friendlyName = friendlyName;
        this.mqttName = mqttName;
        this.config = config;
        this.evtEmitterName = 'sensors.temperature.zigbee.' + this.mqttName;
        this.setPreviousTemperature();
        this.initEvents();
    }
    Temperature.prototype.getAllReadings = function () {
        var _this = this;
        return __1.Engine.eventMgr.entitiesData.filter(function (a) {
            return a.path === _this.evtEmitterName;
        }).map(function (data) {
            return {
                time: data.time,
                temperature: data.data
            };
        });
    };
    Temperature.prototype.touch = function (msg) {
        var acceptedStates = [MqttStates_1.MqttStates.BatteryState, MqttStates_1.MqttStates.Linkquality, MqttStates_1.MqttStates.Temperature, MqttStates_1.MqttStates.TemperatureUnit];
        for (var exposed in this.config.exposes) {
            if (msg[exposed]) {
                if (acceptedStates.includes(this.config.exposes[exposed])) {
                    this[exposed] = msg[exposed];
                }
            }
        }
        __1.Engine.eventMgr.entitiesData.push({
            path: this.evtEmitterName,
            time: (0, unix_time_1.unix_time)(),
            data: this.temperature
        });
        __1.Engine.eventMgr.emit(this.evtEmitterName, this.temperature);
        this.timestamp = (0, unix_time_1.unix_time)();
    };
    Temperature.prototype.setPreviousTemperature = function () {
        var readings = this.getAllReadings().sort(function (a, b) {
            return a.time - b.time;
        });
        if (readings.length === 0)
            return;
        var lastReading = readings[readings.length - 1];
        this.temperature = lastReading.temperature;
        this.timestamp = lastReading.time;
    };
    Temperature.prototype.initEvents = function () {
        var _this = this;
        __1.Engine.eventMgr.emitters.push({
            path: this.evtEmitterName,
            evtType: EventType_1.EventType.TEMPERATURE_READING
        });
        __1.Engine.eventMgr.listeners.push({
            path: this.evtEmitterName,
            evtType: EventType_1.EventType.TEMPERATURE_READING,
            cl: function () { return _this.temperature; }
        });
    };
    return Temperature;
}());
exports.Temperature = Temperature;
