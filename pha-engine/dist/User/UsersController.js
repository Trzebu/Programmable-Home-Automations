"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var fs_1 = __importDefault(require("fs"));
var User_1 = require("./User");
var constants_1 = require("../constants");
var JSONToObjectsArr_1 = require("../utils/JSONToObjectsArr");
var UserController = /** @class */ (function () {
    function UserController(engine) {
        this.users = [];
        this.users = (0, JSONToObjectsArr_1.JSONToObjectsArr)(constants_1.USERS_DATA, User_1.User);
        engine.saveable.push(this);
    }
    UserController.prototype.getByRememberMeToken = function (token) {
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.rememberMeToken === token)
                return user;
        }
        return;
    };
    UserController.prototype.getById = function (id) {
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.id === id)
                return user;
        }
        return;
    };
    UserController.prototype.getByUsername = function (username) {
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.username.toLowerCase() === username.toLowerCase())
                return user;
        }
        return;
    };
    UserController.prototype.login = function () { };
    UserController.prototype.save = function () {
        fs_1.default.writeFile(constants_1.USERS_DATA, JSON.stringify(this.users), "utf-8", function (err) {
            if (err)
                throw err;
        });
    };
    return UserController;
}());
exports.UserController = UserController;
