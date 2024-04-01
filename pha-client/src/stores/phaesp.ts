import { defineStore } from 'pinia'
import { request } from '@/utils/request';
import { _t } from '@/translations/_t';

export type Device = {
    name: string,
    esp_name: string,
    unused_gpio: number[],
    ip_address: string,
    firmware_version: string
}

export const usePhaespStore = defineStore('phaesp', () => {

    const getUnaddedDevices = async () => {
        return await request<{
            ip: string,
            firmware_version: string
        }[]>("/pha_esp/get_unadded_devices", "GET");
    }

    const isDeviceCompatible = async (deviceIpAddress: string) => {
        const response = await request<{
            isCompatible: boolean
        }>("/pha_esp/is_device_compatible/" + deviceIpAddress, "GET");

        return response.isCompatible ? true : false;
    }

    const addNewDevice = async (deviceIpAddress: string, name: string) => {
        if (!deviceIpAddress.length)
            return _t("ip_address_empty");
        if (!name.length)
            return _t("entity_name_empty");
        
        const response = await request<null | {
            msg: string,
            inputName: string
        }>("/pha_esp/new", "POST", {
            ip_address: deviceIpAddress, 
            entity_name: name
        });

        if (response) {
            if (response.inputName)
                return _t(response.msg, [["inputName", _t(response.inputName)]]);
            else
                return _t(response.msg);    
        }
        
        return "";
    }

    const addNewRelay = async (relay_name: string, gpio: number, esp_name: string) => {
        if (!relay_name)
            return _t("pha_esp.relay_name_input_empty");
        
        const response = await request<null | {
            msg: string,
            inputName: string
        }>("/esp/relay/" + esp_name, "POST", {
            relay_name, gpio
        });

        if (response) {
            if (response.inputName)
                return _t(response.msg, [["inputName", _t("pha_esp." + response.inputName)]]);
            else
                return _t(response.msg);    
        }
        
        return "";
    }

    const getAddedDevices = async () => {
        return await request<Device[]>("/pha_esp", "GET");
    }

    const getDevice = async (entityName: string) => {
        return await request<Device>("/pha_esp/" + entityName, "GET");
    }

    return { getUnaddedDevices, isDeviceCompatible, addNewDevice, getAddedDevices, getDevice, addNewRelay }
})
