import { isAuth } from "../middlewares/isAuth";
import Controller from "../server/decorators/Controller";
import { Get, Post } from "../server/decorators/Methods";
import { Middleware } from "../server/decorators/Middleware";
import { DevicesList } from "../../zigbee/devices/List";
import { Body } from "../server/decorators/Parameters";
import { validateInput } from "../../utils/validators";
import { Engine } from "../..";
import { Entity } from "../../zigbee/Entity";

@Controller("/zigbee")
export default class Zigbee {

    @Get("/")
    @Middleware(isAuth)
    public getAllAddedDevices () {
        return Engine.zigbee.getAllDevices().map((device: Entity & { 
            battery?: number,
            voltage?: number
        }) => {
            return {
                name: device.mqttName,
                manufacturer: device.config.manufacturer,
                model: device.config.model,
                linkquality: device.linkquality,
                wireless: device.config.wireless,
                last_seen: device.timestamp,
                battery: device.battery ? device.battery : 0,
                voltage: device.voltage ? device.voltage : 0
            }
        })
    }

    @Get("/get_supported_devices_list")
    @Middleware(isAuth)
    public getSupportedDevicesList () {
        return DevicesList.map(device => {
            return {
                category: device.category,
                manufacturer: device.manufacturer,
                model: device.model
            }
        });
    }

    @Post("/new")
    @Middleware(isAuth)
    public addNewDevice (
        @Body() data: {
            friendlyName: string,
            mqttName: string,
            manufacturer: string,
            model: string
        }
    ) {
        const { friendlyName, mqttName, manufacturer, model } = data;
        const isDataInvalid = validateInput(data, {
            "friendlyName": {
                required: true,
                type: "string"
            },
            "mqttName": {
                required: true,
                type: "string"
            },
            "manufacturer": {
                required: true,
                type: "string"
            },
            "model": {
                required: true,
                type: "string"
            }
        });

        if (isDataInvalid) return isDataInvalid;

        let deviceFound = null;

        DevicesList.forEach(device => {
            if (device.manufacturer === manufacturer &&
                device.model === model)
                deviceFound = device;
        })

        if (deviceFound === null)
            return { msg: "device_no_exists" }
        if (Engine.zigbee.deviceExists(friendlyName, mqttName))
            return { msg: "device_already_added" }
        
        Engine.zigbee.addNewDevice(
            friendlyName, mqttName, manufacturer, model
        );

        return;
    }

}