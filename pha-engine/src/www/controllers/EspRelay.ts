import { isAuth } from "../middlewares/isAuth";
import Controller from "../server/decorators/Controller";
import { Post } from "../server/decorators/Methods";
import { Middleware } from "../server/decorators/Middleware";
import { Body, Param } from "../server/decorators/Parameters";
import { Engine } from "../..";
import { validateInput } from "../../utils/validators";
import { request } from "../../utils/request";
import { HttpStatus } from "../server/HttpStatus";
import { addingRelayExceptions } from "../../esp/Relay";

@Controller("/esp/relay")
export default class EspRelay {

    @Post("/:entity_name")
    @Middleware(isAuth)
    public async new (
        @Param("entity_name") entity_name: string,
        @Body() data: { 
            relay_name: string,
            gpio: number
        }
    ) {
        const isDataInvalid = validateInput(data, {
            "relay_name": {
                required: true,
                type: "string",
                is: "alnum_dash"
            }, "gpio": {
                required: true,
                type: "number"
            }
        });

        if (isDataInvalid)
            return isDataInvalid;

        const esp = Engine.espManager.getByName(entity_name);

        if (!esp)
            return { msg: "device_no_exists" };
        if (!esp.online)
            return { msg: "device_offline" };
        if (esp.isRelayExists(data.relay_name))
            return { msg: "pha_esp.relay_exists" };

        const post = new URLSearchParams();
        post.append("name", data.relay_name);
        post.append("gpio", String(data.gpio));

        let error: string | undefined = undefined;

        const response = await request<{
            error: string,
            errorCode: number
        }>(esp.ip + "/relay/new", "POST", post, res => {
            if (res.status !== HttpStatus.NO_CONTENT)
                error = "pha_esp.esp_relay_adding_error";
        });

        if (!response) error = "network_error_while_data_processing"; 
        if (error) {
            switch (response.errorCode) {
                case addingRelayExceptions.gpio_used: error = "pha_esp.gpio_error"; break;
                case addingRelayExceptions.invalid_data: error = "pha_esp.esp_relay_adding_error"; break;
                case addingRelayExceptions.relay_already_exists: error = "pha_esp.relay_exists"; break;
                case addingRelayExceptions.wrong_characters:
                    return { msg: "input_validator.is_not_alnum_with_dash", inputName: "relay_name" };
            }

            return { msg: error };
        }

        esp.addRelay(data.relay_name);
        esp.save();

        return;
    }
   
}