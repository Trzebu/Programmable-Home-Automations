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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Controller_1 = __importDefault(require("../server/decorators/Controller"));
var Methods_1 = require("../server/decorators/Methods");
var Middleware_1 = require("../server/decorators/Middleware");
var isAuth_1 = require("../middlewares/isAuth");
var __1 = require("../..");
var Addon = /** @class */ (function () {
    function Addon() {
    }
    Addon.prototype.getEnabledAddons = function () {
        return __1.Engine.addonsMgr.addons.map(function (addon) {
            return {
                name: addon.name,
                dir: addon.dir,
                views: addon.vueViews,
                mainMenuItems: addon.mainMenuItems,
                languages: addon.languages
            };
        });
    };
    Addon.prototype.getEnabledAddonsViews = function () {
        var views = [];
        __1.Engine.addonsMgr.addons.forEach(function (addon) {
            addon.vueViews.forEach(function (view) { return views.push(view); });
        });
        return views;
    };
    __decorate([
        (0, Methods_1.Get)("/enabled"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Addon.prototype, "getEnabledAddons", null);
    __decorate([
        (0, Methods_1.Get)("/enabled/views"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Addon.prototype, "getEnabledAddonsViews", null);
    Addon = __decorate([
        (0, Controller_1.default)("/addon")
    ], Addon);
    return Addon;
}());
exports.default = Addon;
