import Saveable from "../Interfaces/Saveable";
import { SWITCHES_DATA } from "../constants";
import { ISwitch } from "./ISwitch";
import fs from "fs";
import { DummySwitch } from "./DummySwitch";

export class SwManager implements Saveable {

    public switches: ISwitch[] = [];

    constructor () {
        this.load();
    }

    public get (name: string) {
        for (const i in this.switches) {
            if (this.switches[i].name === name)
                return this.switches[i];
        }

        return undefined;
    }

    public stateExists (entity: string, state: string) {
        const sw = this.get(entity);
        let found = false;

        sw?.swElements.forEach(s => {
            if (s.state === state)
                found = true;
        })

        return found;
    }

    public exists (entityName: string): boolean {
        return this.switches.filter(sw => {
            return sw.name === entityName;
        }).length > 0;
    }

    public save () {
        fs.writeFile(
            SWITCHES_DATA, 
            JSON.stringify(this.switches.filter((sw: any) => {
                return typeof sw["save"] !== "undefined"
            }).map(sw => {
                return {
                    name: sw.name,
                    swElements: sw.swElements
                }
            })),
            "utf-8",
            err => {
                if (err) throw err;
            }
        );
    }

    private load (): void {
        if (!fs.existsSync(SWITCHES_DATA)) return;
        JSON.parse(fs.readFileSync(SWITCHES_DATA, "utf-8")).map((sw: ISwitch) => {
            this.switches.push(new DummySwitch(
                sw.name,
                sw.swElements
            ));
        });
    }


}