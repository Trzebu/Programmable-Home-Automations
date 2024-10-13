import { EventType } from "./EventType";

export default class EventManager {

    public emitters: {
        path: string,
        evtType: EventType
    }[] = [];
    public listeners: {
        path: string,
        evtType: EventType,
        cl: (...args: any) => void
    }[] = [];

    public emit (path: string, ...args: any) {
        this.listeners.forEach(listener => {
            if (listener.path === path)
                listener.cl(...args);
        });
    }

    public exists (path: string) {
        return this.listeners.filter(listener => {
            return listener.path === path;
        }).length > 0;
    }

    public emitterExists (path: string): boolean {
        return this.emitters.filter(e => {
            return e.path === path;
        }).length > 0;
    }

}