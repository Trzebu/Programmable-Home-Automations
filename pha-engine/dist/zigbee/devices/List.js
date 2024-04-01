"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesList = void 0;
var Entity_1 = require("../Entity");
var MqttStates_1 = require("../MqttStates");
exports.DevicesList = [{
        manufacturer: "TuYa",
        model: "ZTH05",
        category: [Entity_1.DeviceCategory.TEMPERATURE_SENSOR, Entity_1.DeviceCategory.HUMIDITY_SENSOR],
        wireless: true,
        exposes: {
            linkquality: MqttStates_1.MqttStates.Linkquality,
            battery_state: MqttStates_1.MqttStates.BatteryState,
            humidity: MqttStates_1.MqttStates.Humidity,
            temperature: MqttStates_1.MqttStates.Temperature,
            temperature_unit: MqttStates_1.MqttStates.TemperatureUnit
        }
    }, {
        manufacturer: "Aqara",
        model: "WSDCGQ11LM",
        category: [Entity_1.DeviceCategory.TEMPERATURE_SENSOR, Entity_1.DeviceCategory.HUMIDITY_SENSOR, Entity_1.DeviceCategory.PRESSURE_SENSOR],
        wireless: true,
        exposes: {
            linkquality: MqttStates_1.MqttStates.Linkquality,
            humidity: MqttStates_1.MqttStates.Humidity,
            temperature: MqttStates_1.MqttStates.Temperature,
            pressure: MqttStates_1.MqttStates.Pressure,
            battery: MqttStates_1.MqttStates.Battery,
            voltage: MqttStates_1.MqttStates.Voltage
        }
    }, {
        manufacturer: "Aqara",
        model: "WXKG11LM",
        category: [Entity_1.DeviceCategory.BUTTON],
        wireless: true,
        exposes: {
            linkquality: MqttStates_1.MqttStates.Linkquality,
            battery: MqttStates_1.MqttStates.Battery,
            voltage: MqttStates_1.MqttStates.Voltage,
            device_temperature: MqttStates_1.MqttStates.DeviceTemperature,
            action: MqttStates_1.MqttStates.Action,
            click: MqttStates_1.MqttStates.Click
        }
    }];
