import { ParameterType } from "./ParameterType";

export type ParamsMetadataObject = {
    paramType: ParameterType;
    methodName: string;
    decoratorArgument: string | undefined;
    paramIndex: number;
}