import fs from 'fs';
import { User } from './User';
import { USERS_DATA } from '../constants';
import { JSONToObjectsArr } from '../utils/JSONToObjectsArr';
import Saveable from '../Interfaces/Saveable';
import { Engine } from '../Engine';

export class UserController implements Saveable {

    private users: User[] = [];

    constructor (engine: Engine) {
        this.users = JSONToObjectsArr(USERS_DATA, User);
        engine.saveable.push(this);
    }

    public getByRememberMeToken (token: string): User | undefined {
        for (const user of this.users) {
            if (user.rememberMeToken === token)
                return user;
        }

        return;
    }

    public getById (id: number): User | undefined {
        for (const user of this.users) {
            if (user.id === id)
                return user;
        }

        return;
    }

    public getByUsername (username: string): User | undefined {
        for (const user of this.users) {
            if (user.username.toLowerCase() === username.toLowerCase())
                return user;
        }

        return;
    }

    public login (): void {}

    public save (): void {
        fs.writeFile(
            USERS_DATA, 
            JSON.stringify(this.users),
            "utf-8",
            err => {
                if (err) throw err;
            }
        );
    }

}