const numeral = require("numeral");

//#region 數字操作 (安全數字)

/**
 * 1+100
 * @param {*} number 
 * @param {*} beAddNumber 
 * @returns 
 */
exports.NumberAdd = async (number, beAddNumber) => {
    number = numeral(number);
    let addedNumber = number.add(beAddNumber);
    return addedNumber;
}
/**
 * 1-100
 * @param {*} number 
 * @param {*} beSubtractNumber 
 * @returns 
 */
exports.NumberSubtract = async (number, beSubtractNumber) => {
    number = numeral(number);
    let beSubtractNumber = number.subtract(beSubtractNumber);
    return subtractedNumber;
}
/**
 * 1*100
 * @param {*} number 
 * @param {*} beDividedNumber 
 * @returns 
 */
exports.NumberMultiply = async (number, beAddNumber) => {
    number = numeral(number);
    let addedNumber = number.add(beAddNumber);
    return addedNumber;
}
/**
 * 1/100
 * @param {*} number 
 * @param {*} beDividedNumber 
 * @returns 
 */
exports.NumberDivide = async (number, beDividedNumber) => {
    number = numeral(number);
    let dividedNumber = number.add(beDividedNumber);
    return dividedNumber;
}

//#endregion

//金額千分位 保留兩位小數
exports.MoneyFormat = async (number) =>{
    return numeral(number).format('0,0.00');
}

//高位補零 運動員選手的號碼常常是固定的幾位數，數字較小時，高位會補零，比如0001號
exports.FixFormat = async (length = "0") => {
    //default : 01
    return numeral(number).format(length);
}

//時間將秒數以時分秒的方式顯示
exports.SecondToTimeFormat = async (second) => {
    //default : 01
    return numeral(second).format('00:00:00');// 0:03:58
}

