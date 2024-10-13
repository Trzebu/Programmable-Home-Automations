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
            return {
                path: listener.path,
                evtType: listener.evtType
            };
        })
    } 

    @Get("/emitters")
    @Middleware(isAuth)
    public getEventsEmitters () {
        return Engine.eventMgr.emitters.map(emitter => {
            return {
                path: emitter.path,
                evtType: emitter.evtType
            }
        })
    } 

}