import { Engine } from "..";
import Saveable from "../Interfaces/Saveable";
import { ISwitch, SwElement } from "./ISwitch";

export class DummySwitch implements ISwitch, Saveable {
    public name: string;
    public swElements: SwElement[];
    public state: string;

    constructor (name: string, swElements: SwElement[]) {
        this.name = name;
        this.swElements = swElements;
        this.state = swElements[0].state;
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