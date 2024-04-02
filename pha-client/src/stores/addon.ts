//import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/utils/request';

export interface AddonView {
    path: string;
    view: string;
}

export interface Addon {
    name: string;
    dir: string;
    views: AddonView[];
    mainMenuItems: {
        path: string;
        name: string;
    }[];
    languages: string[];
}

export const useAddonStore = defineStore('addon', () => {
    let addons: Addon[];

    const getEnabledAddons = async () => {
        if (!addons) 
            addons = await request<Addon[]>("/addon/enabled", "GET");
        return addons;
    }

  return { getEnabledAddons }
})
