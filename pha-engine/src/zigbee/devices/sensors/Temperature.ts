import { Engine } from "../../..";
import { EventType } from "../../../events/EventType";
import { unix_time } from "../../../utils/unix_time";
import { Entity, DeviceConfiguration } from "../../Entity";
import { MqttStates } from "../../MqttStates";

export class Temperature implements Entity {

    public friendlyName: string;
    public mqttName: string;
    public config: DeviceConfiguration;
    public linkquality: number = 0;
    public timestamp: number = 0;
    public temperature = 0;

    private evtEmitterName: string;

    constructor (mqttName: string, friendlyName: string, config: DeviceConfiguration) {
        this.friendlyName = friendlyName;
        this.mqttName = mqttName;
        this.config = config;
        this.evtEmitterName = 'sensors.temperature.zigbee.' + this.mqttName;
        Engine.eventMgr.emitters.push({
            path: this.evtEmitterName,
            evtType: EventType.TEMPERATURE_READING
        });
    }

    public touch (msg: typeof this.config.exposes) {
        const acceptedStates = [MqttStates.BatteryState, MqttStates.Linkquality, MqttStates.Temperature, MqttStates.TemperatureUnit];

        for (const exposed in this.config.exposes) {
            if (msg[exposed]) {
                if (acceptedStates.includes(this.config.exposes[exposed])) {
                    this[exposed as keyof Temperature] = msg[exposed] as never;
                }
            }
        }

        Engine.eventMgr.emit(this.evtEmitterName, this.temperature);
        this.timestamp = unix_time();
    }

}