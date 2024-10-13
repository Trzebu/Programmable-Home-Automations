"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var fs_1 = __importDefault(require("fs"));
var AddonsManager = /** @class */ (function () {
    function AddonsManager() {
        this.addons = [];
        this.load();
    }
    AddonsManager.prototype.getByName = function (name) {
        for (var i in this.addons) {
            var addon = this.addons[i];
            if (addon.name === name)
                return addon;
        }
        return;
    };
    AddonsManager.prototype.load = function () {
        var _this = this;
        if (!fs_1.default.existsSync(constants_1.ADDONS_DATA))
            return;
        JSON.parse(fs_1.default.readFileSync(constants_1.ADDONS_DATA, "utf-8")).map(function (addon) {
            if (!addon.enabled)
                return;
            var classRef = require("../addons/" + addon.path + "/index.js");
            var classInstance = new classRef.default();
            _this.addons.push(classInstance);
        });
        console.log("Loaded " + this.addons.length + " addons.");
    };
    return AddonsManager;
}());
exports.default = AddonsManager;
