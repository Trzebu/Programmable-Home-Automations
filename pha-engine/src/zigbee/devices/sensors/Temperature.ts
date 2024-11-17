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
    public temperature: number;

    private evtEmitterName: string;

    constructor (mqttName: string, friendlyName: string, config: DeviceConfiguration) {
        this.friendlyName = friendlyName;
        this.mqttName = mqttName;
        this.config = config;
        this.evtEmitterName = 'sensors.temperature.zigbee.' + this.mqttName;
        this.setPreviousTemperature();
        this.initEvents();
    }
    
    public getAllReadings () {
        return Engine.eventMgr.entitiesData.filter(a => {
            return a.path === this.evtEmitterName;
        }).map(data => {
            return {
                time: data.time,
                temperature: data.data as number
            }
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
        
        Engine.eventMgr.entitiesData.push({
            path: this.evtEmitterName,
            time: unix_time(),
            data: this.temperature
        });
        Engine.eventMgr.emit(this.evtEmitterName, this.temperature);
        this.timestamp = unix_time();
    }

    private setPreviousTemperature () {
        const readings = this.getAllReadings().sort((a, b) => {
            return a.time - b.time;
        });
        if (readings.length === 0) return;

        const lastReading = readings[readings.length - 1];

        this.temperature = lastReading.temperature;
        this.timestamp = lastReading.time;
    }

    private initEvents () {
        Engine.eventMgr.emitters.push({
            path: this.evtEmitterName,
            evtType: EventType.TEMPERATURE_READING
        });
        Engine.eventMgr.listeners.push({
            path: this.evtEmitterName,
            evtType: EventType.TEMPERATURE_READING,
            cl: () => this.temperature
        })
    }

}