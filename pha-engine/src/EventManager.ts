export default class EventManager {

    public listeners: {
        path: string,
        cl: (...args: any) => void
    }[] = [];

    public emit (path: string, ...args: any) {
        this.listeners.forEach(listener => {
            if (listener.path === path)
                listener.cl(...args);
        });
    }

    public exists (path: string) {
        return this.listeners.filter(listener => {
            return listener.path === path;
        }).length > 0;
    }

}