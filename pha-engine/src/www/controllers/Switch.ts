import { Engine } from "../..";
import { SwElement } from "../../switch/ISwitch";
import { DummySwitch } from "../../switch/DummySwitch";
import { isAlnumDash, validateInput } from "../../utils/validators";
import { isAuth } from "../middlewares/isAuth";
import Controller from "../server/decorators/Controller";
import { Get, Post } from "../server/decorators/Methods";
import { Middleware } from "../server/decorators/Middleware";
import { Body, Param } from "../server/decorators/Parameters";

@Controller("/switch")
export default class Switch {

    @Post("/:sw_name/:state")
    @Middleware(isAuth)
    public setState (
        @Param("sw_name") sw_name: string,
        @Param("state") state: string
    ) {
        const sw = Engine.swManager.get(sw_name);
        if (!sw)
            return { error: "switch.sw_not_found" };
        if (!Engine.swManager.stateExists(sw_name, state))
            return { error: "switch.state_not_found" };
        if (sw.state === state)
            return { error: "switch.state_already_set" };

        sw.handle(state);

        return;
    }

    @Post("/")
    @Middleware(isAuth)
    public create (
        @Body() data: {
            entity_name: string,
            sw_elements: SwElement[]
        }
    ) {
        const isDataInvalid = validateInput(data, {
            "entity_name": {
                required: true,
                type: "string",
                is: "alnum_dash"
            }
        });

        if (isDataInvalid)
            return isDataInvalid;
        if (typeof data.sw_elements !== "object")
            return { error: "invalid_data" };
        if (data.sw_elements.length === 0)
            return { error: "switch.no_enough_sw_elements" };
        if (Engine.swManager.exists(data.entity_name))
            return { error: "switch.sw_already_exists" };

        for (const i in data.sw_elements) {
            const sw = data.sw_elements[i];

            if (!isAlnumDash(sw.state))
                return { error: "switch.wrong_state_name" };
            if (sw.action !== "dummy" &&
                !Engine.eventMgr.exists(sw.action))
                return { error: "switch.action_not_found" }; 
        }

        Engine.swManager.switches.push(new DummySwitch(
            data.entity_name, data.sw_elements
        ));
        Engine.swManager.save();
        
        return;
    }

    @Get("/entities")
    @Middleware(isAuth)
    public getEntities () {
        return Engine.swManager.switches.filter(sw => {
            return sw.swElements.length === 1;
        }).map(sw => {
            return sw.name;
        })
    }

    @Get("/")
    @Middleware(isAuth)
    public getSwitches () {
        return Engine.swManager.switches.filter(sw => {
            return sw.swElements.length > 1;
        }).map(sw => {
            return {
                name: sw.name,
                sw_elements: sw.swElements,
                state: sw.state
            };
        })
    }

}