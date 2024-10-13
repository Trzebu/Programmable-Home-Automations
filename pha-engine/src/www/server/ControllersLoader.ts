import express, { Response, Router } from 'express';
import fs from "fs";
import { IMethod, Methods } from './decorators/Methods';
import { MetadataKeys } from './decorators/MetadataKeys';
import { MiddlewareData } from './decorators/Middleware';
import { MyRequest } from './MyRequest';
import { Engine } from '../..';
import { searchDecoratedParams } from './decorators/SearchDecoratedParams';
import { InjectParameters } from './decorators/InjectParameters';
import { ADDONS_DIR } from '../../constants';

type Controller = { [handleName: string]: any };

export default class ControllersLoader {
    private controllers: Controller[] = [];
    private apiTable: Array<{ api: string, handler: string, middleware: string }> = [];

    public loadControllersClasses () {
        fs.readdirSync(process.cwd() + '/dist/www/controllers/').forEach(className => {
            this.controllers.push(
                this.requireControllerClass("../controllers/" + className.split('.')[0])
            );
        });
        Engine.addonsMgr.addons.forEach(addon => {
            const ADDON_CONTROLLERS_PATH = `${ADDONS_DIR}/${addon.dir}/www/controllers`;
            if (!fs.existsSync(ADDON_CONTROLLERS_PATH))
                return;
            fs.readdirSync(ADDON_CONTROLLERS_PATH).forEach(className => {
                this.controllers.push(
                    this.requireControllerClass(`../../addons/${addon.dir}/www/controllers/${className.split('.')[0]}`)
                );
            });
        });

        this.loadControllersMethods();
    }

    private requireControllerClass (path: string) {
        const controller = require(path);
        return controller.default;
    }

    private loadControllersMethods () {
        this.controllers.forEach(controller => {
            const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller);
            const methods: IMethod[] = Reflect.getMetadata(MetadataKeys.METHODS, controller);
            methods.forEach(({ method, path, handlerName }) => {
                const expressRouter = this.createNewExpressRouter(controller, method, path, handlerName, basePath);
                Engine.server.app.use(basePath, expressRouter);
            });
        });

        console.table(this.apiTable);
    }

    private createNewExpressRouter (
        controller: any, method: Methods, path: string, handlerName: string | symbol, basePath: string
    ): Router {
        const middlewares = this.searchMiddlewares(controller, handlerName);
        const expressRouter = express.Router();

        expressRouter[method](path, async (req, res) => {
            if (
                !await this.executeMiddlewares(middlewares, <MyRequest>req, res)
            ) return;

            const decoratedParams = searchDecoratedParams(String(handlerName), controller);
            const args = InjectParameters(decoratedParams, req as MyRequest, res);
            const invokedController = new controller();
            const result = await invokedController[String(handlerName)](...args);
            
            Engine.server.responde(res, result);
        });

        this.apiTable.push({
            api: `${method.toLocaleUpperCase()} ${basePath + path}`,
            handler: `${controller.name}.${String(handlerName)}`,
            middleware: middlewares.length > 0 ? middlewares.map(middleware => {
                return middleware.cb.name;
            }).join(", ") : "----",
        });

        return expressRouter;
    }

    private searchMiddlewares (controller: Object, handlerName: string | symbol): MiddlewareData {
        const middlewares: MiddlewareData = Reflect.getMetadata(MetadataKeys.MIDDLEWARES, controller) ? Reflect.getMetadata(MetadataKeys.MIDDLEWARES, controller) : [];
        const foundMiddlewares: MiddlewareData = [];

        middlewares.forEach(middleware => {
            if (middleware.handlerName === handlerName)
                foundMiddlewares.push(middleware);
        });

        return foundMiddlewares;
    }

    private async executeMiddlewares (middlewares: MiddlewareData, req: MyRequest, res: Response): Promise<boolean> {
        let goNext = true;

        await (async () => {
            for (let i = 0; i < middlewares.length; i++) {
                if (goNext)
                    goNext = await middlewares[i].cb(req, res);
                else break;
            }
        })();

        return goNext;
    }


}