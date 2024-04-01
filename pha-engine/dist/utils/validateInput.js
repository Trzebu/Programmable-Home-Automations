"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
var validateInput = function (inputs, rules) {
    for (var i in rules) {
        var rule = rules[i];
        var input = inputs[i];
        if (rule.required) {
            if (typeof input === "undefined") {
                return { msg: "input_validator.is_required", inputName: i };
            }
            else if (typeof input === "string") {
                if (input.length === 0)
                    return { msg: "input_validator.is_required", inputName: i };
            }
        }
        if (rule.type) {
            console.log(rule.type, input);
            if (rule.type === "ip_address")
                if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input))
                    return { msg: "input_validator.type_is_not_ip_address", inputName: i };
                else if (typeof input !== rule.type)
                    return { msg: "input_validator.unknown_type", inputName: i };
        }
    }
    return false;
};
exports.validateInput = validateInput;
