import 'reflect-metadata';
import { ParameterType } from "./ParameterType";
import { MetadataKeys } from './MetadataKeys';
import { ParamsMetadataObject } from './ParamsMetadataObject';

/**
 * Parameter decorator factory, creates parameter decorator
 *
 * @param {ParameterType} parameterType Parameter Type
 */
const decoratorFactory = (type: ParameterType) => {
    return (name?: string): any => {
        return (target: any, methodName: string, index: number) => {
            const constructor = target.constructor;
            const storedParamsDecorators: ParamsMetadataObject[] = Reflect.hasMetadata(MetadataKeys.PARAMS, constructor) ? Reflect.getMetadata(MetadataKeys.PARAMS, constructor) : [];
            storedParamsDecorators.push({
                paramType: type,
                methodName,
                decoratorArgument: name,
                paramIndex: index
            });
            Reflect.defineMetadata(MetadataKeys.PARAMS, storedParamsDecorators, constructor);
        };
    };
}

/**
 * Express req object
 */
export const Req = decoratorFactory(ParameterType.REQUEST);

/**
 * Express res object
 */
export const Res = decoratorFactory(ParameterType.RESPONSE);

/**
 * Express next function
 */
export const Next = decoratorFactory(ParameterType.NEXT);

/**
 * Express req.params object or single param, if param name was specified
 * @example:
 * @Get("/example/:example_param/:example_param_2") - Declare schematic in path
 * @Param("example_param") param1, - In method arguments use with param decorator.
 * @Param("example_param_2") param2
 */
export const Param = decoratorFactory(ParameterType.PARAM);

/**
 * Express req.query object or single query param, if query param name was specified
 */
export const Query = decoratorFactory(ParameterType.QUERY);

/**
 * Express req.body object or single body param, if body param name was specified
 */
export const Body = decoratorFactory(ParameterType.BODY);

/**
 * Express req.headers object or single headers param, if headers param name was specified
 */
export const Headers = decoratorFactory(ParameterType.HEADERS);

/**
 * Express req.body object or single cookies param, if cookies param name was specified
 */
export const Cookies = decoratorFactory(ParameterType.COOKIES);

export const Session = decoratorFactory(ParameterType.SESSION);

/**
 * Returns authenticated user for this request.
 */
export const Auth = decoratorFactory(ParameterType.AUTH);