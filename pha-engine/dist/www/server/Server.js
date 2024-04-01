"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var constants_1 = require("../../constants");
var ControllersLoader_1 = __importDefault(require("./ControllersLoader"));
var HttpStatus_1 = require("./HttpStatus");
var express_session_1 = __importDefault(require("express-session"));
var Server = /** @class */ (function () {
    function Server() {
        this._app = (0, express_1.default)();
        this.configure();
        this.app.listen(constants_1.SERVER_PORT, function () {
            new ControllersLoader_1.default();
            console.log("Server started at " + constants_1.SERVER_PORT);
        });
    }
    Object.defineProperty(Server.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: false,
        configurable: true
    });
    Server.prototype.configure = function () {
        this.app.use((0, cookie_parser_1.default)());
        this.app.use("/static", express_1.default.static(process.cwd() + "/public"));
        this.app.use((0, express_session_1.default)({
            cookie: {
                maxAge: constants_1.COOKIES.AGE,
                httpOnly: true,
                secure: false,
                sameSite: false,
            },
            name: constants_1.COOKIES.SESSIONS_NAME,
            secret: constants_1.SESSION.SECRET,
            resave: false,
            saveUninitialized: false
        }));
        this.app.use((0, cors_1.default)({
            origin: constants_1.CORS_ORIGIN,
            credentials: true
        }));
        this.app.use(express_1.default.json());
    };
    Server.prototype.responde = function (res, data) {
        switch (typeof data) {
            case "string":
                res.type("html").send(data);
                break;
            case "object":
                res.json(data);
                break;
            default:
                if (!res.headersSent)
                    res.status(HttpStatus_1.HttpStatus.NO_CONTENT).send("");
        }
        ;
    };
    return Server;
}());
exports.Server = Server;
