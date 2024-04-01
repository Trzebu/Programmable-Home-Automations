"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterType = void 0;
var ParameterType;
(function (ParameterType) {
    ParameterType[ParameterType["REQUEST"] = 0] = "REQUEST";
    ParameterType[ParameterType["RESPONSE"] = 1] = "RESPONSE";
    ParameterType[ParameterType["PARAM"] = 2] = "PARAM";
    ParameterType[ParameterType["QUERY"] = 3] = "QUERY";
    ParameterType[ParameterType["BODY"] = 4] = "BODY";
    ParameterType[ParameterType["HEADERS"] = 5] = "HEADERS";
    ParameterType[ParameterType["COOKIES"] = 6] = "COOKIES";
    ParameterType[ParameterType["NEXT"] = 7] = "NEXT";
    ParameterType[ParameterType["SESSION"] = 8] = "SESSION";
    ParameterType[ParameterType["AUTH"] = 9] = "AUTH";
})(ParameterType || (exports.ParameterType = ParameterType = {}));
