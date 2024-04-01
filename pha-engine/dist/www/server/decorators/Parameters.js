"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.Session = exports.Cookies = exports.Headers = exports.Body = exports.Query = exports.Param = exports.Next = exports.Res = exports.Req = void 0;
require("reflect-metadata");
var ParameterType_1 = require("./ParameterType");
var MetadataKeys_1 = require("./MetadataKeys");
/**
 * Parameter decorator factory, creates parameter decorator
 *
 * @param {ParameterType} parameterType Parameter Type
 */
var decoratorFactory = function (type) {
    return function (name) {
        return function (target, methodName, index) {
            var constructor = target.constructor;
            var storedParamsDecorators = Reflect.hasMetadata(MetadataKeys_1.MetadataKeys.PARAMS, constructor) ? Reflect.getMetadata(MetadataKeys_1.MetadataKeys.PARAMS, constructor) : [];
            storedParamsDecorators.push({
                paramType: type,
                methodName: methodName,
                decoratorArgument: name,
                paramIndex: index
            });
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.PARAMS, storedParamsDecorators, constructor);
        };
    };
};
/**
 * Express req object
 */
exports.Req = decoratorFactory(ParameterType_1.ParameterType.REQUEST);
/**
 * Express res object
 */
exports.Res = decoratorFactory(ParameterType_1.ParameterType.RESPONSE);
/**
 * Express next function
 */
exports.Next = decoratorFactory(ParameterType_1.ParameterType.NEXT);
/**
 * Express req.params object or single param, if param name was specified
 * @example:
 * @Get("/example/:example_param/:example_param_2") - Declare schematic in path
 * @Param("example_param") param1, - In method arguments use with param decorator.
 * @Param("example_param_2") param2
 */
exports.Param = decoratorFactory(ParameterType_1.ParameterType.PARAM);
/**
 * Express req.query object or single query param, if query param name was specified
 */
exports.Query = decoratorFactory(ParameterType_1.ParameterType.QUERY);
/**
 * Express req.body object or single body param, if body param name was specified
 */
exports.Body = decoratorFactory(ParameterType_1.ParameterType.BODY);
/**
 * Express req.headers object or single headers param, if headers param name was specified
 */
exports.Headers = decoratorFactory(ParameterType_1.ParameterType.HEADERS);
/**
 * Express req.body object or single cookies param, if cookies param name was specified
 */
exports.Cookies = decoratorFactory(ParameterType_1.ParameterType.COOKIES);
exports.Session = decoratorFactory(ParameterType_1.ParameterType.SESSION);
/**
 * Returns authenticated user for this request.
 */
exports.Auth = decoratorFactory(ParameterType_1.ParameterType.AUTH);
