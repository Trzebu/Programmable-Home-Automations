import { defineStore } from 'pinia'
import { request } from '@/utils/request';
import { _t } from '@/translations/_t';

export enum DeviceCategory {
    TEMPERATURE_SENSOR,
    HUMIDITY_SENSOR,
    PRESSURE_SENSOR,
    BUTTON
}

export const DeviceForHummans = [
    _t('temperature_sensor'),  
    _t('humidity_sensor'),  
    _t('pressure_sensor'),  
    _t('button')
];

export type SupportedDevice = {
    category: DeviceCategory[],
    manufacturer: string,
    model: string
}

export type Device = {
    name: string,
    manufacturer: string,
    model: string,
    linkquality: number,
    wireless: boolean,
    battery: number,
    voltage: number,
    last_seen: number;
}

export const useZigbeeStore = defineStore('zigbee', () => {
    let supportedDevices: SupportedDevice[];
    let addedDevices: Device[];

    const getSupportedDevicesList = async () => {
        supportedDevices = await request<SupportedDevice[]>("/zigbee/get_supported_devices_list", "GET");

        return supportedDevices;
    }

    const handleAddNewDevice = async (friendlyName: string, mqttName: string, deviceData: {
        manufacturer: string,
        model: string
    }) => {
        if (!friendlyName)
            return _t("zigbee.friendly_name_empty");
        if (!mqttName)
            return _t("zigbee.mqtt_name_empty");
        if (!deviceData)
            return _t("zigbee.device_field_is_null");

        const response = await request<null | {
            msg: string,
            inputName: String
        }>("/zigbee/new", "POST", {
            friendlyName, mqttName, manufacturer: deviceData.manufacturer, model: deviceData.model
        });

        if (response) {
            if (response.inputName)
                return _t(response.msg, [["inputName", _t("auth." + response.inputName)]]);
            else
                return _t(response.msg);    
        }

        return "";
    }

    const getAddedDevices = async () => {
        addedDevices = await request<Device[]>("/zigbee", "GET");
        return addedDevices;
    }

    return { getSupportedDevicesList, handleAddNewDevice, getAddedDevices }
})
