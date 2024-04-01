import { MqttStates } from "./MqttStates";

export interface Entity {
    
    friendlyName: string;
    mqttName: string;
    config: DeviceConfiguration;
    linkquality: number;
    timestamp: number;

    touch(msg: any): void;
}

export type DeviceConfiguration = {
    category: DeviceCategory[],
    manufacturer: string,
    model: string,
    wireless: boolean,
    exposes: {[key: string]: MqttStates}
}

export enum DeviceCategory {
    TEMPERATURE_SENSOR,
    HUMIDITY_SENSOR,
    PRESSURE_SENSOR,
    BUTTON
}