import { DeviceCategory, DeviceConfiguration } from "../Entity";
import { MqttStates } from "../MqttStates"

export const DevicesList: DeviceConfiguration[] = [{
    manufacturer: "TuYa",
    model: "ZTH05",
    category: [DeviceCategory.TEMPERATURE_SENSOR, DeviceCategory.HUMIDITY_SENSOR],
    wireless: true,
    exposes: {
        linkquality: MqttStates.Linkquality,
        battery_state: MqttStates.BatteryState,
        humidity: MqttStates.Humidity,
        temperature: MqttStates.Temperature,
        temperature_unit: MqttStates.TemperatureUnit
    }
}, {
    manufacturer: "Aqara",
    model: "WSDCGQ11LM",
    category: [DeviceCategory.TEMPERATURE_SENSOR, DeviceCategory.HUMIDITY_SENSOR, DeviceCategory.PRESSURE_SENSOR],
    wireless: true,
    exposes: {
        linkquality: MqttStates.Linkquality,
        humidity: MqttStates.Humidity,
        temperature: MqttStates.Temperature,
        pressure: MqttStates.Pressure,
        battery: MqttStates.Battery,
        voltage: MqttStates.Voltage
    }
}, {
    manufacturer: "Aqara",
    model: "WXKG11LM",
    category: [DeviceCategory.BUTTON],
    wireless: true,
    exposes: {
        linkquality: MqttStates.Linkquality,
        battery: MqttStates.Battery,
        voltage: MqttStates.Voltage,
        device_temperature: MqttStates.DeviceTemperature,
        action: MqttStates.Action,
        click: MqttStates.Click
    }
}];