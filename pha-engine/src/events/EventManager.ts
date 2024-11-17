import { Engine } from "..";
import { DATA_PATH } from "../constants";
import Saveable from "../Interfaces/Saveable";
import { EventType } from "./EventType";
import fs from "fs";

export default class EventManager implements Saveable {

    public emitters: {
        path: string,
        evtType: EventType
    }[] = [];
    public listeners: {
        path: string,
        evtType: EventType,
        cl: (...args: any) => void
    }[] = [];
    public entitiesData: {
        path: string,
        time: number,
        data: any
    }[] = [];

    private ENTITIES_DATA_PATH = `${DATA_PATH}/entities_data.json`;

    constructor () {
        this.loadData();
        Engine.saveable.push(this);
    }

    public emit <T>(path: string, ...args: any): T {
        let response;
        this.listeners.forEach(listener => {
            if (listener.path === path)
                response = listener.cl(...args);
        });
        return response as T;
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

    public save () {
        fs.writeFile(
            this.ENTITIES_DATA_PATH, 
            JSON.stringify(this.entitiesData),
            "utf-8",
            err => {
                if (err) throw err;
            }
        );
    }

    private loadData () {
        if (!fs.existsSync(this.ENTITIES_DATA_PATH)) return;
        
        this.entitiesData = JSON.parse(fs.readFileSync(this.ENTITIES_DATA_PATH, "utf-8"));
    }

}