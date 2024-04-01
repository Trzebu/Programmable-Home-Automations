export type SwElement = {
    state: string,
    action: string
}

export interface ISwitch {
    name: string;
    /**
     * Switches name: ['on', 'off', 'auto'] for example.
     */
    swElements: SwElement[];
    state: string;

    handle(state: string): void;
}