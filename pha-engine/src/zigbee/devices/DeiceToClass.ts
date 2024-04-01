import { DeviceCategory } from "../Entity";
import { Button } from "./Button";
import { Humidity } from "./sensors/Humidity";
import { Temperature } from "./sensors/Temperature";

export const DeviceToClass: { [key in DeviceCategory]: any } = {
    [DeviceCategory.TEMPERATURE_SENSOR]: Temperature,
    [DeviceCategory.HUMIDITY_SENSOR]: Humidity,
    [DeviceCategory.PRESSURE_SENSOR]: null,
    [DeviceCategory.BUTTON]: Button
}