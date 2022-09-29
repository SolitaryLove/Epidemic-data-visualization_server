// Node.js path 模块提供了一些用于处理文件路径的小工具
const path=require('path');
const fileUtils=require('../utils/file_utils');

module.exports=async(ctx,next)=>{
    // api/chinaMap → ../data/chinaMap.json
    const url=ctx.request.url;
    let filePath=url.replace('/api','');
    filePath=`../data${filePath}.json`;
    // path.join 用于连接路径，会正确使用当前系统的路径分隔符
    // 根据 URL 请求路径，拼接出文件的绝对路径
    filePath=path.join(__dirname,filePath);
    try{
        const resData=await fileUtils.getFileJsonData(filePath);
        ctx.response.body=resData;
    }catch(error){
        const errorMsg={
            message:'Failed to read file content, file resource does not exist!',
            status:404,
        };
        ctx.response.body=JSON.stringify(errorMsg);
    }
    // console.log(filePath);
    await next();
}