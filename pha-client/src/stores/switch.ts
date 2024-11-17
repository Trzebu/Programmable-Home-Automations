import { defineStore } from 'pinia'
import { request } from '@/utils/request';
import { _t } from '@/translations/_t';

export type SwElement = {
    state: string,
    action: string
}

export type Switch = {
    name: string,
    sw_elements: SwElement[],
    state: SwElement
}

export const useSwitchStore = defineStore('switch', () => {

    const createNewSwitch = async (entity_name: string = "", sw_elements: SwElement[] = []) => {
        if (entity_name === "")
            return _t("entity_name_empty");
        if (sw_elements.length === 0)
            return _t("switch.no_enough_sw_elements");
        
        const response = await request<null | {
            msg: string,
            inputName: string,
            error: string
        }>("/switch", "POST", {
            entity_name, sw_elements
        });

        if (response) {
            if (response.inputName)
                return _t(response.msg, [["inputName", _t(response.inputName)]]);
            else
                return _t(response.error);    
        }
        
        return "";
    }

    const getSwitches = async () => {
        return (await request<Switch[]>("/switch", "GET")).map(sw => {
            return {
                name: sw.name,
                sw_elements: sw.sw_elements.map(swElement => {
                    return {
                        state: swElement.state,
                        action: `/switch/${sw.name}/${swElement.state}`
                    }
                }),
                state: sw.state
            }
        });
    }

    return { createNewSwitch, getSwitches }
})
