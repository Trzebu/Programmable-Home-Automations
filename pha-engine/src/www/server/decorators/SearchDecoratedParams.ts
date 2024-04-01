import { ParamsMetadataObject } from "./ParamsMetadataObject";
import { MetadataKeys } from "./MetadataKeys";

export const searchDecoratedParams = (handlerName: string, controllerClass: any): ParamsMetadataObject[] | null => {
    const metadata = Reflect.getMetadata(MetadataKeys.PARAMS, controllerClass);
    
    if (!metadata) return null;

    return metadata.filter((param: ParamsMetadataObject) => {
        return param.methodName === handlerName;
    });
}