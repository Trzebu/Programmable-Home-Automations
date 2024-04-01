import { unix_time } from "../../utils/unix_time";
import { Entity, DeviceConfiguration } from "../Entity";
import { MqttStates } from "../MqttStates";

export class Button implements Entity {

    public friendlyName: string;
    public mqttName: string;
    public config: DeviceConfiguration;
    public linkquality: number = 0;
    timestamp: number = 0;

    constructor (mqttName: string, friendlyName: string, config: DeviceConfiguration) {
        this.friendlyName = friendlyName;
        this.mqttName = mqttName;
        this.config = config;
    }

    public touch (msg: typeof this.config.exposes) {
        const acceptedStates = [MqttStates.Linkquality, MqttStates.Battery, MqttStates.Voltage, MqttStates.DeviceTemperature, MqttStates.Action, MqttStates.Click];

        for (const exposed in this.config.exposes) {
            if (msg[exposed]) {
                if (acceptedStates.includes(this.config.exposes[exposed])) {
                    this[exposed as keyof Button] = msg[exposed] as never;
                }
            }
        }

        this.timestamp = unix_time();
    }

}