import Serializable from "../Interfaces/Serializable";

export const SerializeObjectsArray = (data: Serializable[]): string => {
    return JSON.stringify(data.map(v => {
        const keys: {
            [index: string]: any;
        } = {};

        for (const key in v) {
            if (!v.skipOnSerialize.includes(key) && key !== "skipOnSerialize")
                keys[key] = v[key as keyof Serializable];
        }

        return keys;
    }));
}