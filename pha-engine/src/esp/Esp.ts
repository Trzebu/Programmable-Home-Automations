import { Relay } from "./Relay";
import { DATA_PATH } from "../constants";
import fs from "fs";
import WebSocket from "ws";
import { request } from "../utils/request";

export class Esp {
    public name: string;
    public ip: string;
    public firmwareVersion: string;
    public relays: Relay[] = [];
    public online: boolean = false;
    public ws: WebSocket;
    
    private DATA: string;
    
    constructor (name: string, ip: string) {
        this.name = name;
        this.ip = ip;
        this.DATA = `${DATA_PATH}/${this.getPathName()}.json`;

        this.load();
        this.loadBoardInfo();
    }

    public getPathName () { return "pha.esp." + this.name; }

    public addRelay (name: string) {
        this.relays.push(new Relay(
            this,
            name
        ));
    }

    public save () {
        const uniqueRelays: string[] = [];

        this.relays.forEach(relay => {
            if (!uniqueRelays.includes(relay.name))
                uniqueRelays.push(relay.name)
        });

        fs.writeFile(
            this.DATA, 
            JSON.stringify({
                relays: uniqueRelays
            }),
            "utf-8",
            err => {
                if (err) throw err;
            }
        );
    }

    public isRelayExists (relay_name: string): boolean {
        for (const i in this.relays) {
            if (this.relays[i].name === relay_name)
                return true;
        }

        return false;
    }

    public async getUnusedGpio (): Promise<number[]> {
        const pins = await request<number[]>(this.ip + "/get_unused_gpio_pins", "GET");
        return typeof pins === "boolean" ? [] : pins;
    }

    private load () {
        if (!fs.existsSync(this.DATA)) return;
        const data: {
            relays: string[]
        } = JSON.parse(fs.readFileSync(this.DATA, "utf-8"));
        
        data.relays.forEach(relay => this.addRelay(relay));
    }

    private async loadBoardInfo () {
        await fetch(`http://${this.ip}/pha_esp_compatybile`, {
            method: "GET"
        }).then(res => res.json()).then((res: {
            firmware_version: string
        }) => {
            this.firmwareVersion = res.firmware_version;
            this.online = true;
        }).catch(error => {
            if (error)
                console.log("Device on ip " + this.ip + " is not responding.");
        })
        if (!this.online) return;
        this.initWs();
    }

    private initWs () {
        this.ws = new WebSocket(`ws://${this.ip}/ws`);
        this.ws.onopen = this.onWsOpen.bind(this);
        this.ws.onclose = this.onWsClose.bind(this);
        this.ws.onmessage = this.onWsMessage.bind(this);
    }

    private onWsOpen () {console.log("connection establishjed")}

    private onWsClose () {
        this.online = false;
        console.log(`Esp on ip ${this.ip} unexpectedly closed connection. Reconnecting...`)
    }

    private onWsMessage () {}

}