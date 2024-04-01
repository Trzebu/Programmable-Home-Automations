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
var __1 = require("../..");
var DummySwitch_1 = require("../../switch/DummySwitch");
var validators_1 = require("../../utils/validators");
var isAuth_1 = require("../middlewares/isAuth");
var Controller_1 = __importDefault(require("../server/decorators/Controller"));
var Methods_1 = require("../server/decorators/Methods");
var Middleware_1 = require("../server/decorators/Middleware");
var Parameters_1 = require("../server/decorators/Parameters");
var Switch = /** @class */ (function () {
    function Switch() {
    }
    Switch.prototype.setState = function (sw_name, state) {
        var sw = __1.Engine.swManager.get(sw_name);
        if (!sw)
            return { error: "switch.sw_not_found" };
        if (!__1.Engine.swManager.stateExists(sw_name, state))
            return { error: "switch.state_not_found" };
        if (sw.state === state)
            return { error: "switch.state_already_set" };
        sw.handle(state);
        return;
    };
    Switch.prototype.create = function (data) {
        var isDataInvalid = (0, validators_1.validateInput)(data, {
            "entity_name": {
                required: true,
                type: "string",
                is: "alnum_dash"
            }
        });
        if (isDataInvalid)
            return isDataInvalid;
        if (typeof data.sw_elements !== "object")
            return { error: "invalid_data" };
        if (data.sw_elements.length === 0)
            return { error: "switch.no_enough_sw_elements" };
        if (__1.Engine.swManager.exists(data.entity_name))
            return { error: "switch.sw_already_exists" };
        for (var i in data.sw_elements) {
            var sw = data.sw_elements[i];
            if (!(0, validators_1.isAlnumDash)(sw.state))
                return { error: "switch.wrong_state_name" };
            if (sw.action !== "dummy" &&
                !__1.Engine.eventMgr.exists(sw.action))
                return { error: "switch.action_not_found" };
        }
        __1.Engine.swManager.switches.push(new DummySwitch_1.DummySwitch(data.entity_name, data.sw_elements));
        __1.Engine.swManager.save();
        return;
    };
    Switch.prototype.getEntities = function () {
        return __1.Engine.swManager.switches.filter(function (sw) {
            return sw.swElements.length === 1;
        }).map(function (sw) {
            return sw.name;
        });
    };
    Switch.prototype.getSwitches = function () {
        return __1.Engine.swManager.switches.filter(function (sw) {
            return sw.swElements.length > 1;
        }).map(function (sw) {
            return {
                name: sw.name,
                sw_elements: sw.swElements,
                state: sw.state
            };
        });
    };
    __decorate([
        (0, Methods_1.Post)("/:sw_name/:state"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __param(0, (0, Parameters_1.Param)("sw_name")),
        __param(1, (0, Parameters_1.Param)("state")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], Switch.prototype, "setState", null);
    __decorate([
        (0, Methods_1.Post)("/"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __param(0, (0, Parameters_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Switch.prototype, "create", null);
    __decorate([
        (0, Methods_1.Get)("/entities"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Switch.prototype, "getEntities", null);
    __decorate([
        (0, Methods_1.Get)("/"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Switch.prototype, "getSwitches", null);
    Switch = __decorate([
        (0, Controller_1.default)("/switch")
    ], Switch);
    return Switch;
}());
exports.default = Switch;
