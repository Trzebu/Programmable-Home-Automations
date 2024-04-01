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
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var MetadataKeys_1 = require("./decorators/MetadataKeys");
var __1 = require("../..");
var SearchDecoratedParams_1 = require("./decorators/SearchDecoratedParams");
var InjectParameters_1 = require("./decorators/InjectParameters");
var ControllersLoader = /** @class */ (function () {
    function ControllersLoader() {
        this.controllers = [];
        this.apiTable = [];
        this.loadControllersClasses();
    }
    ControllersLoader.prototype.loadControllersClasses = function () {
        var _this = this;
        // loading addons controllers in the future...
        fs_1.default.readdirSync(process.cwd() + '/src/www/controllers/').forEach(function (className) {
            _this.controllers.push((function () {
                var controller = require("../controllers/" + className.split('.')[0]);
                return controller.default;
            })());
        });
        this.loadControllersMethods();
    };
    ControllersLoader.prototype.loadControllersMethods = function () {
        var _this = this;
        this.controllers.forEach(function (controller) {
            var basePath = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.BASE_PATH, controller);
            var methods = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.METHODS, controller);
            methods.forEach(function (_a) {
                var method = _a.method, path = _a.path, handlerName = _a.handlerName;
                var expressRouter = _this.createNewExpressRouter(controller, method, path, handlerName, basePath);
                __1.Engine.server.app.use(basePath, expressRouter);
            });
        });
        console.table(this.apiTable);
    };
    ControllersLoader.prototype.createNewExpressRouter = function (controller, method, path, handlerName, basePath) {
        var _this = this;
        var middlewares = this.searchMiddlewares(controller, handlerName);
        var expressRouter = express_1.default.Router();
        expressRouter[method](path, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var decoratedParams, args, invokedController, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.executeMiddlewares(middlewares, req, res)];
                    case 1:
                        if (!(_a.sent()))
                            return [2 /*return*/];
                        decoratedParams = (0, SearchDecoratedParams_1.searchDecoratedParams)(String(handlerName), controller);
                        args = (0, InjectParameters_1.InjectParameters)(decoratedParams, req, res);
                        invokedController = new controller();
                        return [4 /*yield*/, invokedController[String(handlerName)].apply(invokedController, args)];
                    case 2:
                        result = _a.sent();
                        __1.Engine.server.responde(res, result);
                        return [2 /*return*/];
                }
            });
        }); });
        this.apiTable.push({
            api: "".concat(method.toLocaleUpperCase(), " ").concat(basePath + path),
            handler: "".concat(controller.name, ".").concat(String(handlerName)),
            middleware: middlewares.length > 0 ? middlewares.map(function (middleware) {
                return middleware.cb.name;
            }).join(", ") : "----",
        });
        return expressRouter;
    };
    ControllersLoader.prototype.searchMiddlewares = function (controller, handlerName) {
        var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARES, controller) ? Reflect.getMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARES, controller) : [];
        var foundMiddlewares = [];
        middlewares.forEach(function (middleware) {
            if (middleware.handlerName === handlerName)
                foundMiddlewares.push(middleware);
        });
        return foundMiddlewares;
    };
    ControllersLoader.prototype.executeMiddlewares = function (middlewares, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var goNext;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        goNext = true;
                        return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                                var i;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            i = 0;
                                            _a.label = 1;
                                        case 1:
                                            if (!(i < middlewares.length)) return [3 /*break*/, 5];
                                            if (!goNext) return [3 /*break*/, 3];
                                            return [4 /*yield*/, middlewares[i].cb(req, res)];
                                        case 2:
                                            goNext = _a.sent();
                                            return [3 /*break*/, 4];
                                        case 3: return [3 /*break*/, 5];
                                        case 4:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, goNext];
                }
            });
        });
    };
    return ControllersLoader;
}());
exports.default = ControllersLoader;
