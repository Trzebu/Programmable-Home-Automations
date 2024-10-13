import { Engine } from "..";
import Saveable from "../Interfaces/Saveable";
import { EventType } from "../events/EventType";
import { ISwitch, SwElement } from "./ISwitch";

export class DummySwitch implements ISwitch, Saveable {
    public name: string;
    public swElements: SwElement[];
    public state: string;

    constructor (name: string, swElements: SwElement[]) {
        this.name = name;
        this.swElements = swElements;
        this.state = swElements[0].state;
        swElements.forEach(sw => {
            Engine.eventMgr.listeners.push({
                path: `switch.${name}.${sw.state}`,
                evtType: EventType.USE_SWITCH,
                cl: () => this.handle(sw.state)
            });
        })
    }
    
    handle (state: string): void {
        this.state = state;
        this.swElements.forEach(sw => {
            if (sw.state === state)
                if (sw.action !== "dummy")
                    Engine.eventMgr.emit(sw.action);
        })
    }


    public save () {}
}