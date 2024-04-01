import { Response } from "express";
import { MyRequest } from "../server/MyRequest";
import { HttpStatus } from "../server/HttpStatus";

export const isUnauthenticated = async (req: MyRequest, res: Response): Promise<boolean> => {
    if (req.session.uID) {
        res.status(HttpStatus.FORBIDDEN).json({ msg: "403: forbidden. Already authenticated!" });
        return false;
    }
    
    return true;
}