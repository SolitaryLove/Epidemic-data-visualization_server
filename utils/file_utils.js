// Node.js 提供一组类似 UNIX 标准的文件操作 API
const fs=require('fs');
module.exports.getFileJsonData=(filePath)=>{
    return new Promise((resolve,reject)=>{
        // 异步读取
        fs.readFile(filePath,'utf-8',(error,data)=>{
            if(error){
                reject(error);
            }else{
                resolve(data);
            }
        });
    });
}