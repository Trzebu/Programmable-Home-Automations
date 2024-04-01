"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZigbeeHandler = void 0;
var mqtt_1 = require("mqtt");
var constants_1 = require("../constants");
var __1 = require("..");
var fs_1 = __importDefault(require("fs"));
var List_1 = require("./devices/List");
var DeiceToClass_1 = require("./devices/DeiceToClass");
var ZigbeeHandler = /** @class */ (function () {
    function ZigbeeHandler() {
        var _this = this;
        this.entities = [];
        this.load();
        (0, mqtt_1.connectAsync)(constants_1.MQTT.HOST).then(function (client) { return _this.onConnect(client); });
    }
    /**
     *
     * @returns Just physical devices not entities.
     */
    ZigbeeHandler.prototype.getAllDevices = function () {
        var devices = [];
        this.entities.forEach(function (device) {
            var found = false;
            devices.forEach(function (devices) {
                if (devices.mqttName === device.mqttName)
                    found = true;
            });
            if (!found)
                devices.push(device);
        });
        return devices;
    };
    ZigbeeHandler.prototype.save = function () {
        fs_1.default.writeFile(constants_1.ZIGBEE_DATA, JSON.stringify(this.getAllDevices().map(function (device) {
            return {
                friendlyName: device.friendlyName,
                mqttName: device.mqttName,
                config: {
                    manufacturer: device.config.manufacturer,
                    model: device.config.model
                }
            };
        })), "utf-8", function (err) {
            if (err)
                throw err;
        });
    };
    ZigbeeHandler.prototype.load = function () {
        var _this = this;
        if (!fs_1.default.existsSync(constants_1.ZIGBEE_DATA))
            return;
        JSON.parse(fs_1.default.readFileSync(constants_1.ZIGBEE_DATA, "utf-8")).map(function (device) {
            _this.addNewDevice(device.friendlyName, device.mqttName, device.config.manufacturer, device.config.model);
        });
        console.log("Loaded " + this.entities.length + " zigbee devices.");
    };
    ZigbeeHandler.prototype.addNewDevice = function (name, mqttName, manufacturer, model) {
        var _this = this;
        var device = List_1.DevicesList.filter(function (device) { return device.manufacturer === manufacturer && device.model === model; })[0];
        device.category.map(function (category) {
            _this.entities.push(new DeiceToClass_1.DeviceToClass[category](mqttName, name, device));
        });
        this.save();
    };
    ZigbeeHandler.prototype.deviceExists = function (name, mqttName) {
        return this.entities.filter(function (entity) { return entity.friendlyName === name || entity.mqttName === mqttName; }).length > 0;
    };
    ZigbeeHandler.prototype.onConnect = function (client) {
        var _this = this;
        __1.Engine.saveable.push(this);
        this.mqttClient = client;
        this.getAllDevices().forEach(function (device) {
            _this.mqttClient.subscribe("zigbee2mqtt/" + device.mqttName);
        });
        this.mqttClient.on("message", function (topic, msg) { return _this.onMessage(topic, msg); });
        console.log("Zigbee connection estabilished.");
    };
    ZigbeeHandler.prototype.onMessage = function (topic, msg) {
        this.entities.forEach(function (entity) {
            if (entity.mqttName === topic.split("/")[1])
                entity.touch(JSON.parse(msg.toString()));
        });
    };
    return ZigbeeHandler;
}());
exports.ZigbeeHandler = ZigbeeHandler;
