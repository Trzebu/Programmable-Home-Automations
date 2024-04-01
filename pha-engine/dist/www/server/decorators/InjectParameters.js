"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectParameters = void 0;
var ParameterType_1 = require("./ParameterType");
var __1 = require("../../..");
var InjectParameters = function (decoratedParams, req, res) {
    var args = [];
    if (!decoratedParams)
        return [];
    decoratedParams.forEach(function (param) {
        var i = param.paramIndex;
        switch (param.paramType) {
            case ParameterType_1.ParameterType.REQUEST:
                args[i] = req;
                break;
            case ParameterType_1.ParameterType.RESPONSE:
                args[i] = res;
                break;
            case ParameterType_1.ParameterType.BODY:
                args[i] = req.body;
                break;
            case ParameterType_1.ParameterType.SESSION:
                args[i] = req.session;
                break;
            case ParameterType_1.ParameterType.AUTH:
                args[i] = __1.Engine.users.getById(req.session.uID);
                break;
            case ParameterType_1.ParameterType.PARAM:
                if (param.decoratorArgument) {
                    if (req.params[param.decoratorArgument]) {
                        args[i] = req.params[param.decoratorArgument];
                    }
                }
                break;
        }
    });
    return args;
};
exports.InjectParameters = InjectParameters;
