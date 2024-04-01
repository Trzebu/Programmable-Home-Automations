import { Response } from "express";
import { Engine } from "../..";
import { validateInput } from "../../utils/validators";
import { SessionData } from "../server/SessionData";
import Controller from "../server/decorators/Controller";
import { Get, Post } from "../server/decorators/Methods";
import { Body, Res, Session, Auth as Authenticated } from "../server/decorators/Parameters";
import { v4 as uuid } from "uuid";
import { COOKIES } from "../../constants";
import { User } from "../../User/User";
import { Middleware } from "../server/decorators/Middleware";
import { isAuth } from "../middlewares/isAuth";
import { isUnauthenticated } from "../middlewares/isUnauthenticated";

@Controller("/auth")
export default class Auth {

    @Get("/user")
    @Middleware(isAuth)
    public getAuthenticatedUser (
        @Authenticated() user: User
    ) {
        return {
            username: user.username
        }
    }

    @Post("/login")
    @Middleware(isUnauthenticated)
    public async logIn (
        @Res() res: Response,
        @Body() data: {
            username: string,
            password: string,
            rememberMe: boolean
        },
        @Session() session: SessionData
    ) {
        const isDataInvalid = validateInput(data, {
            "username": {
                required: true,
                type: "string"
            },
            "password": {
                required: true,
                type: "string"
            },
            "rememberMe": {
                required: true,
                type: "boolean"
            }
        });

        if (isDataInvalid) return isDataInvalid;
    
        const user = Engine.users.getByUsername(data.username);

        if (!user)
            return { msg: "auth.user_no_exists" };
        if (!await user.matchPassword(data.password))
            return { msg: "auth.user_no_exists" };

        session.uID = user.id;

        if (!data.rememberMe) return;
        
        const rememberMeToken = uuid();
        user.rememberMeToken = rememberMeToken;
        res.cookie(COOKIES.REMEMBER_TOKEN_NAME, rememberMeToken, {
            maxAge: COOKIES.AGE
        });

        return;
    }

}