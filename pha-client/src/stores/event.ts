import { defineStore } from 'pinia'
import { request } from '@/utils/request';

export enum EventType {
    TEMPERATURE_READING,
    USE_RELAY,
    USE_SWITCH
}

export interface Event {
    path: string;
    evtType: EventType
}

export const useEventStore = defineStore('event', () => {
    let emitters: Event[];
    let listeners: Event[];

    const getEvtEmitters = async () => {
        if (!emitters) 
            emitters = await request<Event[]>("/event/emitters", "GET");
        return emitters;
    }

    const getListeners = async () => {
        if (!listeners) 
            listeners = await request<Event[]>("/event", "GET");
        return listeners;
    }

  return { getEvtEmitters, getListeners }
})
