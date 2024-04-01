import { HttpStatus } from "./HttpStatus";
import { SERVER } from "./constants";

export const request = async <T> (
    endpoint: string,
    method: "GET" | "POST" | "DELETE",
    data?: any,
): Promise<T> => {
    const raw = await fetch(`${SERVER.HOST}${endpoint}`, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : undefined,
        credentials: "include"
    });
    
    if (raw.status === HttpStatus.NO_CONTENT)
        return false as T;

    const response: T = await raw.json();

    return response;
}