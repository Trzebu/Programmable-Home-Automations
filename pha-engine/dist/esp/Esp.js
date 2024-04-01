"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Esp = void 0;
var Relay_1 = require("./Relay");
var constants_1 = require("../constants");
var fs_1 = __importDefault(require("fs"));
var ws_1 = __importDefault(require("ws"));
var request_1 = require("../utils/request");
var Esp = /** @class */ (function () {
    function Esp(name, ip) {
        this.relays = [];
        this.online = false;
        this.name = name;
        this.ip = ip;
        this.DATA = "".concat(constants_1.DATA_PATH, "/").concat(this.getPathName(), ".json");
        this.load();
        this.loadBoardInfo();
    }
    Esp.prototype.getPathName = function () { return "pha.esp." + this.name; };
    Esp.prototype.addRelay = function (name) {
        this.relays.push(new Relay_1.Relay(this, name));
    };
    Esp.prototype.save = function () {
        var uniqueRelays = [];
        this.relays.forEach(function (relay) {
            if (!uniqueRelays.includes(relay.name))
                uniqueRelays.push(relay.name);
        });
        fs_1.default.writeFile(this.DATA, JSON.stringify({
            relays: uniqueRelays
        }), "utf-8", function (err) {
            if (err)
                throw err;
        });
    };
    Esp.prototype.isRelayExists = function (relay_name) {
        for (var i in this.relays) {
            if (this.relays[i].name === relay_name)
                return true;
        }
        return false;
    };
    Esp.prototype.getUnusedGpio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pins;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, request_1.request)(this.ip + "/get_unused_gpio_pins", "GET")];
                    case 1:
                        pins = _a.sent();
                        return [2 /*return*/, typeof pins === "boolean" ? [] : pins];
                }
            });
        });
    };
    Esp.prototype.load = function () {
        var _this = this;
        if (!fs_1.default.existsSync(this.DATA))
            return;
        var data = JSON.parse(fs_1.default.readFileSync(this.DATA, "utf-8"));
        data.relays.forEach(function (relay) { return _this.addRelay(relay); });
    };
    Esp.prototype.loadBoardInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://".concat(this.ip, "/pha_esp_compatybile"), {
                            method: "GET"
                        }).then(function (res) { return res.json(); }).then(function (res) {
                            _this.firmwareVersion = res.firmware_version;
                            _this.online = true;
                        }).catch(function (error) {
                            if (error)
                                console.log("Device on ip " + _this.ip + " is not responding.");
                        })];
                    case 1:
                        _a.sent();
                        if (!this.online)
                            return [2 /*return*/];
                        this.initWs();
                        return [2 /*return*/];
                }
            });
        });
    };
    Esp.prototype.initWs = function () {
        this.ws = new ws_1.default("ws://".concat(this.ip, "/ws"));
        this.ws.onopen = this.onWsOpen.bind(this);
        this.ws.onclose = this.onWsClose.bind(this);
        this.ws.onmessage = this.onWsMessage.bind(this);
    };
    Esp.prototype.onWsOpen = function () { console.log("connection establishjed"); };
    Esp.prototype.onWsClose = function () {
        this.online = false;
        console.log("Esp on ip ".concat(this.ip, " unexpectedly closed connection. Reconnecting..."));
    };
    Esp.prototype.onWsMessage = function () { };
    return Esp;
}());
exports.Esp = Esp;
