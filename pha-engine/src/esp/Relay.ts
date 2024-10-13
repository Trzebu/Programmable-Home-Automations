import { Engine } from "..";
import { Esp } from "./Esp";
import { EventType } from "../events/EventType"

export enum addingRelayExceptions {
    invalid_data,
    wrong_characters,
    relay_already_exists,
    gpio_used
}

export class Relay {

    public name: string;
    public path: string;

    private state: "on" | "off";
    private esp: Esp;

    constructor (esp: Esp, name: string) {
        this.esp = esp;
        this.name = name;
        this.path = `${this.esp.getPathName()}.relay.${name}`;

        this.initListeners();
    }

    public handle (state: "on" | "off"): void {
        if (this.state === state) return;

        this.state = state;
        this.esp.ws.send(["set_relay_state", this.name, state].join(","));
    }

    private initListeners () {
        Engine.eventMgr.listeners.push({
            path: this.path + ".on",
            evtType: EventType.USE_RELAY,
            cl: () => this.handle("on")
        });
        Engine.eventMgr.listeners.push({
            path: this.path + ".off",
            evtType: EventType.USE_RELAY,
            cl: () => this.handle("off")
        });
    }

}