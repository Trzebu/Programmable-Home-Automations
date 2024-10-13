"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
var UsersController_1 = require("./User/UsersController");
var constants_1 = require("./constants");
var EspManager_1 = require("./esp/EspManager");
var unix_time_1 = require("./utils/unix_time");
var Server_1 = require("./www/server/Server");
var ZigbeeHandler_1 = require("./zigbee/ZigbeeHandler");
var SwManager_1 = require("./switch/SwManager");
var EventManager_1 = __importDefault(require("./events/EventManager"));
var AddonsManager_1 = __importDefault(require("./AddonsManager/AddonsManager"));
var Engine = /** @class */ (function () {
    function Engine() {
        this.saveable = [];
        this.updatable = [];
        this.eventMgr = new EventManager_1.default();
        this.lastDataSaveTime = (0, unix_time_1.unix_time)();
        console.log("starting the engine...");
        this.server = new Server_1.Server();
        this.users = new UsersController_1.UserController(this);
        this.updatable.push(this);
        setTimeout(this.init.bind(this), 0);
        setInterval(this.mainLoop.bind(this), 1000 / constants_1.ENGINE_TPS);
    }
    Engine.prototype.init = function () {
        this.zigbee = new ZigbeeHandler_1.ZigbeeHandler();
        this.swManager = new SwManager_1.SwManager();
        this.espManager = new EspManager_1.EspManager();
        this.addonsMgr = new AddonsManager_1.default();
        this.server.controllers.loadControllersClasses();
    };
    Engine.prototype.update = function () {
        this.saveData();
    };
    Engine.prototype.saveData = function () {
        if ((0, unix_time_1.unix_time)() >= (this.lastDataSaveTime + constants_1.DATA_SAVE_INTERVAL)) {
            this.lastDataSaveTime = (0, unix_time_1.unix_time)();
            this.saveable.forEach(function (saveable) { return saveable.save(); });
            console.log("All objects saved.");
        }
    };
    Engine.prototype.mainLoop = function () {
        this.updatable.forEach(function (updatable) { return updatable.update(); });
    };
    return Engine;
}());
exports.Engine = Engine;
