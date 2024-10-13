"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType[EventType["TEMPERATURE_READING"] = 0] = "TEMPERATURE_READING";
    EventType[EventType["USE_RELAY"] = 1] = "USE_RELAY";
    EventType[EventType["USE_SWITCH"] = 2] = "USE_SWITCH";
})(EventType || (exports.EventType = EventType = {}));
