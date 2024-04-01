import { MqttClient, connectAsync } from "mqtt";
import { MQTT, ZIGBEE_DATA } from "../constants";
import { Entity } from "./Entity";
import Saveable from "../Interfaces/Saveable";
import { Engine } from "..";
import fs from 'fs';
import { DevicesList } from "./devices/List";
import { DeviceToClass } from "./devices/DeiceToClass";

export class ZigbeeHandler implements Saveable {

    private mqttClient: MqttClient;
    private entities: Entity[] = [];

    constructor () {
        this.load();
        connectAsync(MQTT.HOST).then(client => this.onConnect(client))
    }

    /**
     * 
     * @returns Just physical devices not entities.
     */
    public getAllDevices (): Entity[] {
        const devices: Entity[] = [];

        this.entities.forEach(device => {
            let found = false;
            devices.forEach(devices => {
                if (devices.mqttName === device.mqttName)
                    found = true;
            })
            if (!found)
            devices.push(device);
        });

        return devices;
    }

    public save () {
        fs.writeFile(
            ZIGBEE_DATA, 
            JSON.stringify(this.getAllDevices().map(device => {
                return {
                    friendlyName: device.friendlyName,
                    mqttName: device.mqttName,
                    config: {
                        manufacturer: device.config.manufacturer,
                        model: device.config.model
                    }
                }
            })),
            "utf-8",
            err => {
                if (err) throw err;
            }
        );
    }

    private load () {
        if (!fs.existsSync(ZIGBEE_DATA)) return;
        JSON.parse(fs.readFileSync(ZIGBEE_DATA, "utf-8")).map((device: Entity) => {
            this.addNewDevice(
                device.friendlyName, 
                device.mqttName, 
                device.config.manufacturer, 
                device.config.model
            ) 
        });
        console.log("Loaded " + this.entities.length + " zigbee devices.");
    }

    public addNewDevice (name: string, mqttName: string, manufacturer: string, model: string) {
        const device = DevicesList.filter(
            device => device.manufacturer === manufacturer && device.model === model
        )[0];

        device.category.map(category => {
            this.entities.push(new DeviceToClass[category](
                mqttName, name, device
            ));
        });

        this.save();
    }

    public deviceExists (name: string, mqttName: string) {
        return this.entities.filter(
            entity => entity.friendlyName === name || entity.mqttName === mqttName
        ).length > 0;
    }

    private onConnect (client: MqttClient) {
        Engine.saveable.push(this);
        this.mqttClient = client;
        this.getAllDevices().forEach(device => {
            this.mqttClient.subscribe("zigbee2mqtt/" + device.mqttName);
        });
        this.mqttClient.on("message", (topic, msg) => this.onMessage(topic, msg));
        console.log("Zigbee connection estabilished.")
    }

    private onMessage (topic: string, msg: Buffer) {
        this.entities.forEach(entity => {
            if (entity.mqttName === topic.split("/")[1])
                entity.touch(JSON.parse(msg.toString()));
        });
    }

}