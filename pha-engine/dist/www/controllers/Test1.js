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
var isChuj_1 = require("../middlewares/isChuj");
var Controller_1 = __importDefault(require("../server/decorators/Controller"));
var Methods_1 = require("../server/decorators/Methods");
var Middleware_1 = require("../server/decorators/Middleware");
var Test1 = /** @class */ (function () {
    function Test1() {
        console.log("chuj");
    }
    Test1.prototype.jp2gmd = function () {
        //return "papaież pedau"
    };
    Test1.prototype.login = function () {
        return "jebać dissa";
    };
    __decorate([
        (0, Middleware_1.Middleware)(isChuj_1.isChuj),
        (0, Methods_1.Get)("/jp2gtmd"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Test1.prototype, "jp2gmd", null);
    __decorate([
        (0, Methods_1.Get)("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Test1.prototype, "login", null);
    Test1 = __decorate([
        (0, Controller_1.default)("/test-1"),
        __metadata("design:paramtypes", [])
    ], Test1);
    return Test1;
}());
exports.default = Test1;
