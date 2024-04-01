import { Socket } from "net";

export const lanScan = (
    port: number, host: string, cl: (status: string, host: string, port: number) => void
) => {
    const socket = new Socket(); 
    let status = "";

    socket.on("connect", () => {
        status = "open";
        socket.end();
    });
    socket.setTimeout(1500);
    socket.on('timeout', () => {
        status = "closed";
        socket.destroy();
    });
    socket.on('error', (_) => { status = "closed"; });
    socket.on('close', () => {
        cl(status,host,port);
    });

    //console.log(`Checking ${host}:${port}`);
    socket.connect(port, host);
}