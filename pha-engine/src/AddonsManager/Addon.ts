export interface Addon {

    name: string;
    dir: string;
    description: string;
    author: string;
    authorWww: string;
    ver: string;
    vueViews: {
        path: string,
        view: string
    }[];
    mainMenuItems: {
        path: string,
        name: string
    }[];
    languages: string[];

}