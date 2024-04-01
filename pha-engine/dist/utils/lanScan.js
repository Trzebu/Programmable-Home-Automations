"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lanScan = void 0;
var net_1 = require("net");
var lanScan = function (port, host, cl) {
    var socket = new net_1.Socket();
    var status = "";
    socket.on("connect", function () {
        status = "open";
        socket.end();
    });
    socket.setTimeout(1500);
    socket.on('timeout', function () {
        status = "closed";
        socket.destroy();
    });
    socket.on('error', function (_) { status = "closed"; });
    socket.on('close', function () {
        cl(status, host, port);
    });
    //console.log(`Checking ${host}:${port}`);
    socket.connect(port, host);
};
exports.lanScan = lanScan;
