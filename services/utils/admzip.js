const AdmZip = require("adm-zip");

/**
 * 壓縮檔案
 * @param {檔案路徑陣列} filesPath 
 * @param {壓縮檔案目標路徑} targetPath 
 * @param {壓縮檔案名稱} zipName 
 */
exports.zip = async function (filesPath,targetPath,zipName) {
    var zip = new AdmZip();
    filesPath.forEach(file => {
        zip.addLocalFile(file);
    })
    zip.writeZip(/*target file name*/ targetPath+zipName);
}

/**
 * 解壓縮
 * @param {檔案路徑} filePath 
 * @param {解壓縮目標路徑} targetPath 
 */
exports.extractAll = async function (filePath,targetPath) {
    //ex: const zip = new AdmZip("./my_file.zip");
    var zip = new AdmZip(filePath);
    zip.extractAllTo(targetPath,true);
}

/**
 * 檢查zip 是否有包含檔案
 * @param {路徑} filePath 
 * @param {檔案名稱(包含附檔名)} fileName 
 * @returns 
 */
exports.checkFiles = async function (filePath,fileName) {
    //ex: const zip = new AdmZip("./my_file.zip");
    var zip = new AdmZip(filePath);
    var zipEntries = zip.getEntries(); // an array of ZipEntry records
    zipEntries.forEach(function (zipEntry) {
        console.log(zipEntry.toString()); // outputs zip entries information
        if (zipEntry.entryName == fileName) {
            return true;
        }
    });
    return false;
}

