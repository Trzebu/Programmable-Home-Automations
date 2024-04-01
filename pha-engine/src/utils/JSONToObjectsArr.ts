import fs from 'fs';
import { Newable } from './Newable';

export const JSONToObjectsArr = <T>(path: string, object: Newable<T>): T[] => {
    return JSON.parse(fs.readFileSync(path, "utf-8")).map((data: any) => {
        const objectInstance = new object();
        
        for (let i in data) {
            objectInstance[i as keyof T] = data[i];
        }
        return objectInstance;
    });
}