
exports.GetStatusCode = (code) => {
    const statusCode = new Map([
        ["1000", "success"],
        ["1001", "token is wrong"],
        ["1002", "token is empty"],
        ["1003", "not allowed ip"],
        ["1004", "not allowed permission"],
    ]);
    return statusCode.get("code");
}