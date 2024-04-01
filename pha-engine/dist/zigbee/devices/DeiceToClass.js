"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceToClass = void 0;
var Entity_1 = require("../Entity");
var Button_1 = require("./Button");
var Humidity_1 = require("./sensors/Humidity");
var Temperature_1 = require("./sensors/Temperature");
exports.DeviceToClass = (_a = {},
    _a[Entity_1.DeviceCategory.TEMPERATURE_SENSOR] = Temperature_1.Temperature,
    _a[Entity_1.DeviceCategory.HUMIDITY_SENSOR] = Humidity_1.Humidity,
    _a[Entity_1.DeviceCategory.PRESSURE_SENSOR] = null,
    _a[Entity_1.DeviceCategory.BUTTON] = Button_1.Button,
    _a);
