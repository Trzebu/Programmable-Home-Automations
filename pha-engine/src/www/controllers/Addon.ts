import Controller from "../server/decorators/Controller";
import { Get } from "../server/decorators/Methods";
import { Middleware } from "../server/decorators/Middleware";
import { isAuth } from "../middlewares/isAuth";
import { Engine } from "../..";

@Controller("/addon")
export default class Addon {

    @Get("/enabled")
    @Middleware(isAuth)
    public getEnabledAddons () {
        return Engine.addonsMgr.addons.map(addon => {
            return {
                name: addon.name,
                dir: addon.dir,
                views: addon.vueViews,
                mainMenuItems: addon.mainMenuItems,
                languages: addon.languages
            }
        })
    }

    @Get("/enabled/views")
    @Middleware(isAuth)
    public getEnabledAddonsViews () {
        const views: {
            path: string;
            view: string;
        }[] = [];
        Engine.addonsMgr.addons.forEach(addon => {
            addon.vueViews.forEach(view => views.push(view))
        });
        return views;
    }

}