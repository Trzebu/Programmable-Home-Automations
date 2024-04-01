"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isAuth_1 = require("../middlewares/isAuth");
var Controller_1 = __importDefault(require("../server/decorators/Controller"));
var Methods_1 = require("../server/decorators/Methods");
var Middleware_1 = require("../server/decorators/Middleware");
var List_1 = require("../../zigbee/devices/List");
var Parameters_1 = require("../server/decorators/Parameters");
var validators_1 = require("../../utils/validators");
var __1 = require("../..");
var Zigbee = /** @class */ (function () {
    function Zigbee() {
    }
    Zigbee.prototype.getAllAddedDevices = function () {
        return __1.Engine.zigbee.getAllDevices().map(function (device) {
            return {
                name: device.mqttName,
                manufacturer: device.config.manufacturer,
                model: device.config.model,
                linkquality: device.linkquality,
                wireless: device.config.wireless,
                last_seen: device.timestamp,
                battery: device.battery ? device.battery : 0,
                voltage: device.voltage ? device.voltage : 0
            };
        });
    };
    Zigbee.prototype.getSupportedDevicesList = function () {
        return List_1.DevicesList.map(function (device) {
            return {
                category: device.category,
                manufacturer: device.manufacturer,
                model: device.model
            };
        });
    };
    Zigbee.prototype.addNewDevice = function (data) {
        var friendlyName = data.friendlyName, mqttName = data.mqttName, manufacturer = data.manufacturer, model = data.model;
        var isDataInvalid = (0, validators_1.validateInput)(data, {
            "friendlyName": {
                required: true,
                type: "string"
            },
            "mqttName": {
                required: true,
                type: "string"
            },
            "manufacturer": {
                required: true,
                type: "string"
            },
            "model": {
                required: true,
                type: "string"
            }
        });
        if (isDataInvalid)
            return isDataInvalid;
        var deviceFound = null;
        List_1.DevicesList.forEach(function (device) {
            if (device.manufacturer === manufacturer &&
                device.model === model)
                deviceFound = device;
        });
        if (deviceFound === null)
            return { msg: "device_no_exists" };
        if (__1.Engine.zigbee.deviceExists(friendlyName, mqttName))
            return { msg: "device_already_added" };
        __1.Engine.zigbee.addNewDevice(friendlyName, mqttName, manufacturer, model);
        return;
    };
    __decorate([
        (0, Methods_1.Get)("/"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Zigbee.prototype, "getAllAddedDevices", null);
    __decorate([
        (0, Methods_1.Get)("/get_supported_devices_list"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Zigbee.prototype, "getSupportedDevicesList", null);
    __decorate([
        (0, Methods_1.Post)("/new"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __param(0, (0, Parameters_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Zigbee.prototype, "addNewDevice", null);
    Zigbee = __decorate([
        (0, Controller_1.default)("/zigbee")
    ], Zigbee);
    return Zigbee;
}());
exports.default = Zigbee;
