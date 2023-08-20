
exports.getStatusCode = (code) => {
    const statusCode = new Map([
        ["200", "success"],
        ["400", "fail"],
        //1 auth
        ["1000", "login_success"],
        ["1001", "login_fail_password_wrong"],
        ["1002", "token_is_wrong"],
        ["1003", "token_is_empty"],
        ["1004", "not_allowed_ip"],
        ["1005", "not_allowed_permission"],
        ["1006", "rePassword_is_not_same"],
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
    return statusCode.get("code");
}