import { isAuth } from "../middlewares/isAuth";
import Controller from "../server/decorators/Controller";
import { Get, Post } from "../server/decorators/Methods";
import { Middleware } from "../server/decorators/Middleware";
import { lanScan } from "../../utils/lanScan";
import { networkInterfaces } from "os";
import { Body, Param } from "../server/decorators/Parameters";
import { Engine } from "../..";
import { validateInput } from "../../utils/validators";
import { EspManager } from "../../esp/EspManager";

@Controller("/pha_esp")
export default class PhaEsp {

    @Get("/get_unadded_devices")
    @Middleware(isAuth)
    public async getUnaddedDevices () {
        const ipChunks = networkInterfaces()["eth0"]![0].address.split(".");
        ipChunks.pop();
        const ip = ipChunks.join(".");
        const ipToCheck: string[] = [];
        const devicesFound: {
            ip: string,
            firmware_version: string
        }[] = [];
        
        await (new Promise<void>((resolve) => {
            for (let i = 1; i <= 255; i++) {
                lanScan(80, ip + '.' + i, (status, host) => {
                    if (status == "open")
                        ipToCheck.push(host);
                });
            }

            setTimeout(() => resolve(), 2500);
        }))

        for (const i in ipToCheck) {
            if (Engine.espManager.getByIp(ipToCheck[i]))
                continue;            
            await fetch(`http://${ipToCheck[i]}/pha_esp_compatybile`, {
                method: "GET"
            }).then(async res => {
                try {
                    const text = await res.text();
                    const data: {
                        firmware_version?: string
                    } = JSON.parse(text);
                    if (data.firmware_version)
                        devicesFound.push({
                            ip: ipToCheck[i],
                            firmware_version: data.firmware_version
                        });
                } catch (_) {}
            }).catch(error => {
                if (error)
                    console.log("Device on ip " + ipToCheck[i] + " is not compatybile.");
            })
        }

        return devicesFound;        
    }

    @Get("/is_device_compatible/:ip")
    @Middleware(isAuth)
    public async isDeviceCompatible (
        @Param("ip") ip_address: string
    ) {
        return await EspManager.isCompatible(ip_address);
    }

    @Post("/new")
    @Middleware(isAuth)
    public async addNewDevice (
        @Body() data: {
            ip_address: string,
            entity_name: string
        }
    ) {
        const isDataInvalid = validateInput(data, {
            "ip_address": {
                required: true,
                is: "ip_address"
            },
            "entity_name": {
                required: true,
                type: "string",
                is: "alnum_dash"
            }
        });

        if (isDataInvalid)
            return isDataInvalid;
        if (!await EspManager.isCompatible(data.ip_address))
            return { msg: "pha_esp.device_is_incompatible" };
        if (Engine.espManager.getByName(data.entity_name))
            return { msg: "device_already_added" };
        if (Engine.espManager.getByIp(data.ip_address))
            return { msg: "device_already_added" };

        Engine.espManager.add(
            data.entity_name,
            data.ip_address
        );

        return;
    }

    @Get("/:entity_name")
    @Middleware(isAuth)
    public async getDevice (
        @Param("entity_name") entity_name: string
    ) {
        const esp = Engine.espManager.getByName(entity_name);
        return esp ? {
            name: esp.getPathName(),
            esp_name: esp.name,
            unused_gpio: await esp.getUnusedGpio()
        } : undefined;
    }

    @Get("/")
    @Middleware(isAuth)
    public getAddedDevices () {
        return Engine.espManager.esp.map(esp => {
            return {
                name: esp.getPathName(),
                ip_address: esp.ip,
                firmware_version: esp.firmwareVersion
            }
        })
    }
}