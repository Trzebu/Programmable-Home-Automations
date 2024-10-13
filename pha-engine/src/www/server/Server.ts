import express, { Express, Response } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { COOKIES, CORS_ORIGIN, SERVER_PORT, SESSION } from "../../constants";
import ControllersLoader from './ControllersLoader';
import { HttpStatus } from "./HttpStatus";
import session from "express-session";

export class Server {
    private readonly _app: Express;
    public get app(): Express {
        return this._app;
    }
    public controllers = new ControllersLoader();

    constructor () {
        this._app = express();
        this.configure();
        this.app.listen(SERVER_PORT, () => {
            console.log("Server started at " + SERVER_PORT);
        });
    }

    private configure () {
        this.app.use(cookieParser());
        this.app.use("/static", express.static(process.cwd() + "/public"));
        this.app.use(session({
            cookie: {
                maxAge: COOKIES.AGE,
                httpOnly: true,
                secure: false,
                sameSite: false,
            },
            name: COOKIES.SESSIONS_NAME,
            secret: SESSION.SECRET,
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(cors({
            origin: CORS_ORIGIN,
            credentials: true
        }));
        this.app.use(express.json());
    }

    public responde (res: Response, data: any) {
        switch (typeof data) {
            case "string": res.type("html").send(data); break;
            case "object": res.json(data); break;
            default:
                if (!res.headersSent)
                    res.status(HttpStatus.NO_CONTENT).send("");
        };
    }
}