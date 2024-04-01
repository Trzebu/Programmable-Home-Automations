import { MetadataKeys } from './MetadataKeys';
import 'reflect-metadata';

export enum Methods {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
}

export interface IMethod {
    method: Methods;
    path: string;
    handlerName: string | symbol;
}

const methodDecoratorFactory = (method: Methods) => {
    return (path: string): MethodDecorator => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            const methods: IMethod[] = Reflect.hasMetadata(MetadataKeys.METHODS, controllerClass) ? Reflect.getMetadata(MetadataKeys.METHODS, controllerClass) : [];

            methods.push({
                method,
                path,
                handlerName: propertyKey,
            });
            
            Reflect.defineMetadata(MetadataKeys.METHODS, methods, controllerClass);
        }
    }
}

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Delete = methodDecoratorFactory(Methods.DELETE);