import { Response } from "express";
import { MetadataKeys } from "./MetadataKeys";
import { MyRequest } from "../MyRequest";

export type MiddlewareData = {
    cb: (req: MyRequest, res: Response) => (boolean | Promise<boolean>),
    handlerName: string
}[];

export const Middleware = (cb: (req: MyRequest, res: Response) => (boolean | Promise<boolean>)): MethodDecorator => {
    return (target, propertyKey) => {
        const controllerClass = target.constructor;

        const middlewares: MiddlewareData = Reflect.hasMetadata(MetadataKeys.MIDDLEWARES, controllerClass) ? Reflect.getMetadata(MetadataKeys.MIDDLEWARES, controllerClass) : [];

        middlewares.push({
            cb, 
            handlerName: String(propertyKey)
        });

        Reflect.defineMetadata(MetadataKeys.MIDDLEWARES, middlewares, controllerClass);
    }
}