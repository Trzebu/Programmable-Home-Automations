import { ParamsMetadataObject } from "./ParamsMetadataObject";
import { Response } from 'express';
import { ParameterType } from "./ParameterType";
import { Engine } from "../../..";
import { MyRequest } from "../MyRequest";

export const InjectParameters = (decoratedParams: ParamsMetadataObject[] | null, req: MyRequest, res: Response): any[] => {
    const args: any[] = [];

    if (!decoratedParams) return [];
    
    decoratedParams.forEach(param => {
        const i = param.paramIndex;

        switch (param.paramType) {
            case ParameterType.REQUEST: args[i] = req; break;
            case ParameterType.RESPONSE: args[i] = res; break;
            case ParameterType.BODY: args[i] = req.body; break;
            case ParameterType.SESSION: args[i] = req.session; break;
            case ParameterType.AUTH: args[i] = Engine.users.getById(req.session.uID); break;
            case ParameterType.PARAM:
                if (param.decoratorArgument) {
                    if (req.params[param.decoratorArgument]) {
                        args[i] = req.params[param.decoratorArgument];
                    }
                }
            break;
        }
    });

    return args;
}