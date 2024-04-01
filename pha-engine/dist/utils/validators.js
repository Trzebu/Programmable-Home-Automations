"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAlnumDash = exports.isAlnum = exports.isIpAddress = exports.validateInput = void 0;
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
            if (typeof input !== rule.type)
                return { msg: "input_validator.unknown_type", inputName: i };
        }
        if (rule.is) {
            if (rule.is === "ip_address")
                if ((0, exports.isIpAddress)(input))
                    return { msg: "input_validator.type_is_not_ip_address", inputName: i };
            if (rule.is === "alnum_dash")
                if (!(0, exports.isAlnumDash)(input))
                    return { msg: "input_validator.is_not_alnum_with_dash", inputName: i };
            if (rule.is === "alnum")
                if (!(0, exports.isAlnumDash)(input))
                    return { msg: "input_validator.is_not_alnum", inputName: i };
        }
    }
    return false;
};
exports.validateInput = validateInput;
var isIpAddress = function (address) {
    return !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address);
};
exports.isIpAddress = isIpAddress;
var isAlnum = function (input) {
    return /^[a-z0-9]+$/i.test(input);
};
exports.isAlnum = isAlnum;
var isAlnumDash = function (input) {
    return /^[a-zA-Z0-9-_]+$/.test(input);
};
exports.isAlnumDash = isAlnumDash;
