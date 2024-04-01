export const request = async <T>(
    path: string, method: "POST" | "GET", data?: any, cl?: (res: Response) => void
): Promise<T> => {
    const isForm = (() => {
        if (!data) return false;
        if (typeof data.constructor === "undefined") return false;
        if (data.constructor.name !== "URLSearchParams") return false;
        return true;
    })();

    try {
        const res = await fetch("http://" + path, {
            method,
            body: data ? isForm ? data : JSON.stringify(data) : undefined
        });
        const text = await res.text();
        const mime = res.headers.get("Content-Type");
        
        if (cl) cl(res);
        if (mime && mime.indexOf("application/json") !== -1)
            return JSON.parse(text) as T;

        return true as T;
    } catch (error) {
        console.log(`Fetch request for address ${path} failed. Reason:`);
        console.log(error);
        return false as T;
    }
}