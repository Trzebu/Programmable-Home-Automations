export const __prod__ = process.env.NODE_ENV === "producition";
export const CORS_ORIGIN = "http://192.168.0.3:5173";
export const SERVER_PORT = 21337;
export const DATA_PATH = process.cwd() + "/dist/data";
export const USERS_DATA = DATA_PATH + "/Users.json";
export const ZIGBEE_DATA = DATA_PATH + "/Zigbee.json";
export const ESP_DATA = DATA_PATH + "/Esp.json";
export const SWITCHES_DATA = DATA_PATH + "/Switches.json";
export const ADDONS_DATA = DATA_PATH + "/Addons.json";
export const COOKIES = {
    AGE: 2678400000,
    SESSIONS_NAME: "qId",
    REMEMBER_TOKEN_NAME: "rememberMeToken"
}
export const SESSION = {
    SECRET: "FUcLdQ3GWgrhYAkAiDxs"
}
export const ENGINE_TPS = 15;
export const DATA_SAVE_INTERVAL = 600; //seconds
export const MQTT = {
    HOST: "mqtt://localhost"
}