import Saveable from "./Interfaces/Saveable";
import Updatable from "./Interfaces/Updatable";
import { UserController } from "./User/UsersController";
import { DATA_SAVE_INTERVAL, ENGINE_TPS } from "./constants";
import { EspManager } from "./esp/EspManager";
import { unix_time } from "./utils/unix_time";
import { Server } from "./www/server/Server"
import { ZigbeeHandler } from "./zigbee/ZigbeeHandler";
import { SwManager } from "./switch/SwManager";
import EventManager from "./EventManager";

export class Engine implements Updatable {

    public saveable: Saveable[] = [];
    public updatable: Updatable[] = [];

    public server: Server;
    public users: UserController;
    public zigbee: ZigbeeHandler;
    public espManager: EspManager;
    public swManager: SwManager;
    public eventMgr = new EventManager();

    private lastDataSaveTime = unix_time();

    constructor () {
        console.log("starting the engine...")
        this.server = new Server();
        this.users = new UserController(this);
        this.zigbee = new ZigbeeHandler();

        this.updatable.push(this);

        setTimeout(this.init.bind(this), 0);
        setInterval(this.mainLoop.bind(this), 1000 / ENGINE_TPS);
    }

    public init () {
        this.swManager = new SwManager();
        this.espManager = new EspManager();
    }
 
    public update () {
        this.saveData();
    }

    private saveData () {
        if (unix_time() >= (this.lastDataSaveTime + DATA_SAVE_INTERVAL)) {
            this.lastDataSaveTime = unix_time();
            this.saveable.forEach(saveable => saveable.save());
            console.log("All objects saved.");
        }
    }

    private mainLoop () {
        this.updatable.forEach(updatable => updatable.update());
    }

}