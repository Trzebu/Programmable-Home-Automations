import Saveable from "../Interfaces/Saveable";
import { ESP_DATA } from "../constants";
import { Esp } from "./Esp";
import fs from "fs";

export class EspManager implements Saveable {

    public esp: Esp[] = [];

    constructor () {
        this.load();
    }

    public add (name: string, ip: string) {
        this.esp.push(
            new Esp(name, ip)
        );
        this.save();
    }

    public getByName (name: string): Esp | undefined {
        for (const i in this.esp) {
            if (this.esp[i].name === name)
                return this.esp[i];
        }

        return undefined;
    }

    public getByIp (ip: string): Esp | undefined {
        for (const i in this.esp) {
            if (this.esp[i].ip === ip)
                return this.esp[i];
        }

        return undefined;
    }

    public save () {
        fs.writeFile(
            ESP_DATA, 
            JSON.stringify(this.esp.map(e => {
                return {
                    name: e.name,
                    ip: e.ip
                }
            })),
            "utf-8",
            err => {
                if (err) throw err;
            }
        );
    }

    public load () {
        if (!fs.existsSync(ESP_DATA)) return;
        JSON.parse(fs.readFileSync(ESP_DATA, "utf-8")).map((esp: Esp) => {
            this.add(
                esp.name,
                esp.ip
            ) 
        });
        console.log("Loaded " + this.esp.length + " esp devices.");
    }

    public static async isCompatible (ip: string) {
        let isCompatible = false;

        await fetch(`http://${ip}/pha_esp_compatybile`, {
            method: "GET"
        }).then(async res => {
            try {
                const text = await res.text();
                const data: {
                    firmware_version?: string
                } = JSON.parse(text);
                if (data.firmware_version)
                    isCompatible = true;
            } catch (_) {}
        }).catch(error => {
            if (error)
                console.log("Device on ip " + ip + " is not compatybile.");
        })

        return { isCompatible };
    }

}