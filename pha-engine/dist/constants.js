"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTT = exports.DATA_SAVE_INTERVAL = exports.ENGINE_TPS = exports.SESSION = exports.COOKIES = exports.ADDONS_DIR = exports.ADDONS_DATA = exports.SWITCHES_DATA = exports.ESP_DATA = exports.ZIGBEE_DATA = exports.USERS_DATA = exports.DATA_PATH = exports.SERVER_PORT = exports.CORS_ORIGIN = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === "producition";
exports.CORS_ORIGIN = "http://192.168.0.3:5173";
exports.SERVER_PORT = 21337;
exports.DATA_PATH = process.cwd() + "/dist/data";
exports.USERS_DATA = exports.DATA_PATH + "/Users.json";
exports.ZIGBEE_DATA = exports.DATA_PATH + "/Zigbee.json";
exports.ESP_DATA = exports.DATA_PATH + "/Esp.json";
exports.SWITCHES_DATA = exports.DATA_PATH + "/Switches.json";
exports.ADDONS_DATA = exports.DATA_PATH + "/Addons.json";
exports.ADDONS_DIR = process.cwd() + "/dist/addons";
exports.COOKIES = {
    AGE: 2678400000,
    SESSIONS_NAME: "qId",
    REMEMBER_TOKEN_NAME: "rememberMeToken"
};
exports.SESSION = {
    SECRET: "FUcLdQ3GWgrhYAkAiDxs"
};
exports.ENGINE_TPS = 15;
exports.DATA_SAVE_INTERVAL = 600; //seconds
exports.MQTT = {
    HOST: "mqtt://localhost"
};
