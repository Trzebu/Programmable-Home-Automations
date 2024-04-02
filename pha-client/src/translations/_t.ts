import type { Addon } from "@/stores/addon";

class Translations {

    private userLocal = "english";
    private translations: any;

    public async load () {
        this.translations = await import(`./${this.userLocal}.json`);
    }

    public async loadAddonTranslation (addon: Addon) {
        let fileName = "";
        if (!addon.languages.includes(this.userLocal))
            fileName = addon.languages[0];
        else
            fileName = this.userLocal;
        const translations = await import(`../addons/${addon.dir}/translations/${fileName}.json`);
        this.translations = {...this.translations, ...translations}
    }

    public getFromPath (path: string): string {
        const chunks = path.split('.');
        let text = this.translations;

        chunks.forEach(chunk => {
            if (!text) return;
            text = text[chunk];
        });

        if (text === "")
            return _t("translation_not_found");
        
        return text;
    }
}

export const translations = new Translations();

export const _t = (path: string, replace?: (string|number)[][]) => {
    if (typeof path === "undefined")
        console.log("Translation path cannot be empty.");
    let text = translations.getFromPath(path);

    if (replace) {
        replace.forEach(str => {
            const key = str[0];
            const replacement = str[1];

            text = text.replace(`{${key}}`, String(replacement));
        });
    }

    return text;
}