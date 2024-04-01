import { Engine } from "../..";
import { isAuth } from "../middlewares/isAuth";
import Controller from "../server/decorators/Controller";
import { Get } from "../server/decorators/Methods";
import { Middleware } from "../server/decorators/Middleware";

@Controller("/event")
export default class Event {

    @Get("/")
    @Middleware(isAuth)
    public getAllEvents () {
        return Engine.eventMgr.listeners.map(listener => {
            return listener.path;
        })
    } 

}