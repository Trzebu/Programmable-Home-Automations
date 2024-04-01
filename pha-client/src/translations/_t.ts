import english from "./english.json";
import polish from "./polish.json";

class Translations {

    private userLocal = "en";
    private translations = [english, polish];

    public getFromPath (path: string): string {
        const chunks = path.split('.');
        let text = this.getTranslationsObject();

        chunks.forEach(chunk => {
            if (!text) return;
            text = text[chunk as keyof typeof text];
        });

        if (!text)
            return _t("translation_not_found");
        
        return text as unknown as string;
    }

    private getTranslationsObject () {
        for (let i = 0; i < this.translations.length; i++) {
            if (this.translations[i]["translation_info"]["language_short_name"] === this.userLocal)
                return this.translations[i];
        }

        return [];
    }
}

const translations = new Translations();

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