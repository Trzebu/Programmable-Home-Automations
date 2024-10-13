import { ADDONS_DATA } from "../constants";
import { Addon } from "./Addon";
import fs from "fs";

export default class AddonsManager {

    public addons: Addon[] = [];

    constructor () {
        this.load();
    }

    public getByName <T>(name: string) {
        for (const i in this.addons) {
            const addon = this.addons[i];

            if (addon.name === name)
                return addon as T;
        }

        return;
    }

    private load () {
        if (!fs.existsSync(ADDONS_DATA)) return;
        JSON.parse(fs.readFileSync(ADDONS_DATA, "utf-8")).map((addon: {
            path: string,
            enabled: boolean
        }) => {
            if (!addon.enabled) return;
            const classRef = require("../addons/" + addon.path + "/index.js");
            const classInstance: Addon = new classRef.default();
            this.addons.push(classInstance);
        });
        console.log("Loaded " + this.addons.length + " addons.");
    }

}