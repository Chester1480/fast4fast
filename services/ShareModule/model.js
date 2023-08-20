
exports.getStatusCode = (bool) => {
    const statusCode = new Map([
        [true, 200],
        [false,400],
    ]);
    return statusCode.get(bool);
}

/**
 * 
 * @param {*} code 
 * @returns 
 */
exports.getTextCode = (code) => {
    const textCode = new Map([
        //1 auth
        ["1000", "login_success"],
        ["1001", "login_fail_password_wrong"],
        ["1002", "token_is_wrong"],
        ["1003", "token_is_empty"],
        ["1004", "not_allowed_ip"],
        ["1005", "not_allowed_permission"],
        ["1006", "rePassword_is_not_same"],
        ["1007", "account_is_exist"],
        ["1008", "account_register_success"],
        //2 crud
        ["2000", "query_success"],
        ["2001", "query_fail_no_permission"],
        ["2002", "insert_success"],
        ["2003", "insert_fail"],
        ["2004", "update_success"],
        ["2005", "update_fail"],
        ["2006", "delete_success"],
        ["2007", "delete_fail"],
    ]);
    return textCode.get(code);
}

exports.getUserType = (bool) => {
    const statusCode = new Map([
        [0,"normal"],
        [1,"premium"],
    ]);
    return statusCode.get(bool);
}

exports.getContryCOde =  (code) => {
    const statusCode = new Map([
        [0,"normal"],
        [1,"premium"],
    ]);
    return statusCode.get(code);
}