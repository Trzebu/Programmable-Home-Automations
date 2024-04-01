export const validateInput = (
    inputs: {[id: string]: any},
    rules: {[id: string] : {
        required?: boolean,
        type?: "string" | "number" | "boolean",
        is?: "ip_address" | "alnum" | "alnum_dash"
    }}
) => {

    for (let i in rules) {
        const rule = rules[i];
        const input = inputs[i as keyof typeof inputs];
        
        if (rule.required) {
            if (typeof input === "undefined") {
                return { msg: "input_validator.is_required", inputName: i };
            } else if (typeof input === "string") {
                if (input.length === 0)
                return { msg: "input_validator.is_required", inputName: i };
            }
        }

        if (rule.type) {
            if (typeof input !== rule.type)
                return { msg: "input_validator.unknown_type", inputName: i };
        }

        if (rule.is) {
            if (rule.is === "ip_address")
                if (isIpAddress(input as string))
                    return { msg: "input_validator.type_is_not_ip_address", inputName: i };
            if (rule.is === "alnum_dash")
                if (!isAlnumDash(input as string))
                    return { msg: "input_validator.is_not_alnum_with_dash", inputName: i };
            if (rule.is === "alnum")
                if (!isAlnumDash(input as string))
                    return { msg: "input_validator.is_not_alnum", inputName: i };
        }

    }

    return false;
}

export const isIpAddress = (address: string): boolean => {
    return !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address);
}

export const isAlnum = (input: string) => {
    return /^[a-z0-9]+$/i.test(input);
}

export const isAlnumDash = (input: string): boolean => {
    return /^[a-zA-Z0-9-_]+$/.test(input);
}