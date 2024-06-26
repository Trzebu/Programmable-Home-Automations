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
exports.EspManager = void 0;
var constants_1 = require("../constants");
var Esp_1 = require("./Esp");
var fs_1 = __importDefault(require("fs"));
var EspManager = /** @class */ (function () {
    function EspManager() {
        this.esp = [];
        this.load();
    }
    EspManager.prototype.add = function (name, ip) {
        this.esp.push(new Esp_1.Esp(name, ip));
        this.save();
    };
    EspManager.prototype.getByName = function (name) {
        for (var i in this.esp) {
            if (this.esp[i].name === name)
                return this.esp[i];
        }
        return undefined;
    };
    EspManager.prototype.getByIp = function (ip) {
        for (var i in this.esp) {
            if (this.esp[i].ip === ip)
                return this.esp[i];
        }
        return undefined;
    };
    EspManager.prototype.save = function () {
        fs_1.default.writeFile(constants_1.ESP_DATA, JSON.stringify(this.esp.map(function (e) {
            return {
                name: e.name,
                ip: e.ip
            };
        })), "utf-8", function (err) {
            if (err)
                throw err;
        });
    };
    EspManager.prototype.load = function () {
        var _this = this;
        if (!fs_1.default.existsSync(constants_1.ESP_DATA))
            return;
        JSON.parse(fs_1.default.readFileSync(constants_1.ESP_DATA, "utf-8")).map(function (esp) {
            _this.add(esp.name, esp.ip);
        });
        console.log("Loaded " + this.esp.length + " esp devices.");
    };
    EspManager.isCompatible = function (ip) {
        return __awaiter(this, void 0, void 0, function () {
            var isCompatible;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isCompatible = false;
                        return [4 /*yield*/, fetch("http://".concat(ip, "/pha_esp_compatybile"), {
                                method: "GET"
                            }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var text, data, _1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, res.text()];
                                        case 1:
                                            text = _a.sent();
                                            data = JSON.parse(text);
                                            if (data.firmware_version)
                                                isCompatible = true;
                                            return [3 /*break*/, 3];
                                        case 2:
                                            _1 = _a.sent();
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) {
                                if (error)
                                    console.log("Device on ip " + ip + " is not compatybile.");
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { isCompatible: isCompatible }];
                }
            });
        });
    };
    return EspManager;
}());
exports.EspManager = EspManager;
