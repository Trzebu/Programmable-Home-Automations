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
var __1 = require("../..");
var validators_1 = require("../../utils/validators");
var Controller_1 = __importDefault(require("../server/decorators/Controller"));
var Methods_1 = require("../server/decorators/Methods");
var Parameters_1 = require("../server/decorators/Parameters");
var uuid_1 = require("uuid");
var constants_1 = require("../../constants");
var User_1 = require("../../User/User");
var Middleware_1 = require("../server/decorators/Middleware");
var isAuth_1 = require("../middlewares/isAuth");
var isUnauthenticated_1 = require("../middlewares/isUnauthenticated");
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.getAuthenticatedUser = function (user) {
        return {
            username: user.username
        };
    };
    Auth.prototype.logIn = function (res, data, session) {
        return __awaiter(this, void 0, void 0, function () {
            var isDataInvalid, user, rememberMeToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isDataInvalid = (0, validators_1.validateInput)(data, {
                            "username": {
                                required: true,
                                type: "string"
                            },
                            "password": {
                                required: true,
                                type: "string"
                            },
                            "rememberMe": {
                                required: true,
                                type: "boolean"
                            }
                        });
                        if (isDataInvalid)
                            return [2 /*return*/, isDataInvalid];
                        user = __1.Engine.users.getByUsername(data.username);
                        if (!user)
                            return [2 /*return*/, { msg: "auth.user_no_exists" }];
                        return [4 /*yield*/, user.matchPassword(data.password)];
                    case 1:
                        if (!(_a.sent()))
                            return [2 /*return*/, { msg: "auth.user_no_exists" }];
                        session.uID = user.id;
                        if (!data.rememberMe)
                            return [2 /*return*/];
                        rememberMeToken = (0, uuid_1.v4)();
                        user.rememberMeToken = rememberMeToken;
                        res.cookie(constants_1.COOKIES.REMEMBER_TOKEN_NAME, rememberMeToken, {
                            maxAge: constants_1.COOKIES.AGE
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, Methods_1.Get)("/user"),
        (0, Middleware_1.Middleware)(isAuth_1.isAuth),
        __param(0, (0, Parameters_1.Auth)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User]),
        __metadata("design:returntype", void 0)
    ], Auth.prototype, "getAuthenticatedUser", null);
    __decorate([
        (0, Methods_1.Post)("/login"),
        (0, Middleware_1.Middleware)(isUnauthenticated_1.isUnauthenticated),
        __param(0, (0, Parameters_1.Res)()),
        __param(1, (0, Parameters_1.Body)()),
        __param(2, (0, Parameters_1.Session)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "logIn", null);
    Auth = __decorate([
        (0, Controller_1.default)("/auth")
    ], Auth);
    return Auth;
}());
exports.default = Auth;
