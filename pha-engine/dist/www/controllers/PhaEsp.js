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
var isAuth_1 = require("../middlewares/isAuth");
var Controller_1 = __importDefault(require("../server/decorators/Controller"));
var Methods_1 = require("../server/decorators/Methods");
var Middleware_1 = require("../server/decorators/Middleware");
var lanScan_1 = require("../../utils/lanScan");
var os_1 = require("os");
var Parameters_1 = require("../server/decorators/Parameters");
var __1 = require("../..");
var validators_1 = require("../../utils/validators");
var EspManager_1 = require("../../esp/EspManager");
var PhaEsp = /** @class */ (function () {
    function PhaEsp() {
    }
    PhaEsp.prototype.getUnaddedDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ipChunks, ip, ipToCheck, devicesFound, _loop_1, _a, _b, _c, _i, i;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        ipChunks = (0, os_1.networkInterfaces)()["eth0"][0].address.split(".");
                        ipChunks.pop();
                        ip = ipChunks.join(".");
                        ipToCheck = [];
                        devicesFound = [];
                        return [4 /*yield*/, (new Promise(function (resolve) {
                                for (var i = 1; i <= 255; i++) {
                                    (0, lanScan_1.lanScan)(80, ip + '.' + i, function (status, host) {
                                        if (status == "open")
                                            ipToCheck.push(host);
                                    });
                                }
                                setTimeout(function () { return resolve(); }, 2500);
                            }))];
                    case 1:
                        _d.sent();
                        _loop_1 = function (i) {
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        if (__1.Engine.espManager.getByIp(ipToCheck[i]))
                                            return [2 /*return*/, "continue"];
                                        return [4 /*yield*/, fetch("http://".concat(ipToCheck[i], "/pha_esp_compatybile"), {
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
                                                                devicesFound.push({
                                                                    ip: ipToCheck[i],
                                                                    firmware_version: data.firmware_version
                                                                });
                                                            return [3 /*break*/, 3];
                                                        case 2:
                                                            _1 = _a.sent();
                                                            return [3 /*break*/, 3];
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            }); }).catch(function (error) {
                                                if (error)
                                                    console.log("Device on ip " + ipToCheck[i] + " is not compatybile.");
                                            })];
                                    case 1:
                                        _e.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a = ipToCheck;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 4];
                        i = _c;
                        return [5 /*yield**/, _loop_1(i)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, devicesFound];
                }
            });
        });
    };
    PhaEsp.prototype.isDeviceCompatible = function (ip_address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EspManager_1.EspManager.isCompatible(ip_address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PhaEsp.prototype.addNewDevice = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isDataInvalid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isDataInvalid = (0, validators_1.validateInput)(data, {
                            "ip_address": {
                                required: true,
                                is: "ip_address"
                            },
                            "entity_name": {
                                required: true,
                                type: "string",
                                is: "alnum_dash"
                            }
                        });
                        if (isDataInvalid)
                            return [2 /*return*/, isDataInvalid];
                        return [4 /*yield*/, EspManager_1.EspManager.isCompatible(data.ip_address)];
                    case 1:
                        if (!(_a.sent()))
                            return [2 /*return*/, { msg: "pha_esp.device_is_incompatible" }];
                        if (__1.Engine.espManager.getByName(data.entity_name))
                            return [2 /*return*/, { msg: "device_already_added" }];
                        if (__1.Engine.espManager.getByIp(data.ip_address))
                            return [2 /*return*/, { msg: "device_already_added" }];
                        __1.Engine.espManager.add(data.entity_name, data.ip_address);
                        return [2 /*return*/];
                }
            });
        });
    };
    PhaEsp.prototype.getDevice = function (entity_name) {
        return __awaiter(this, void 0, void 0, function () {
            var esp, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        esp = __1.Engine.espManager.getByName(entity_name);
                        if (!esp) return [3 /*break*/, 2];
                        _b = {
                            name: esp.getPathName(),
                            esp_name: esp.name
                        };
                        return [4 /*yield*/, esp.getUnusedGpio()];
                    case 1:
                        _a = (_b.unused_gpio = _c.sent(),
                            _b);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = undefined;
                        _c.label = 3;
                    case 3: return [2 /*return*/, _a];
                }
            });
        });
    };
    PhaEsp.prototype.getAddedDevices = function () {
        return __1.Engine.espManager.esp.map(function (esp) {
            return {
                name: esp.getPathName(),
                ip_address: esp.ip,
                firmware_version: esp.firmwareVersion
            };
        });
    };
    __decorate([
        (0, Methods_1.Get)("/get_unadded_devices"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PhaEsp.prototype, "getUnaddedDevices", null);
    __decorate([
        (0, Methods_1.Get)("/is_device_compatible/:ip"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __param(0, (0, Parameters_1.Param)("ip")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], PhaEsp.prototype, "isDeviceCompatible", null);
    __decorate([
        (0, Methods_1.Post)("/new"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __param(0, (0, Parameters_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PhaEsp.prototype, "addNewDevice", null);
    __decorate([
        (0, Methods_1.Get)("/:entity_name"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __param(0, (0, Parameters_1.Param)("entity_name")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], PhaEsp.prototype, "getDevice", null);
    __decorate([
        (0, Methods_1.Get)("/"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PhaEsp.prototype, "getAddedDevices", null);
    PhaEsp = __decorate([
        (0, Controller_1.default)("/pha_esp")
    ], PhaEsp);
    return PhaEsp;
}());
exports.default = PhaEsp;
