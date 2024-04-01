import { Response } from "express";
import { MyRequest } from "../server/MyRequest";
import { Engine } from "../..";
import { HttpStatus } from "../server/HttpStatus";

export const isAuth = async (req: MyRequest, res: Response): Promise<boolean> => {
    if (!req.session.uID) {
        if (req.cookies.rememberMeToken) {
            const user = Engine.users.getByRememberMeToken(req.cookies.rememberMeToken);

            if (user) {
                req.session.uID = user.id;
                return true;
            }
        }
        
        res.status(HttpStatus.UNAUTHORIZED).json({ msg: "401: unauthorized" });
        return false;
    }
    
    return true;
}