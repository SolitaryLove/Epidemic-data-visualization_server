module.exports=async (ctx,next)=>{
    // HTTP contentType(内容类型)
    // 一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，
    // 决定浏览器将以什么形式、什么编码读取这个文件
    // 这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因
    const contentType='application/json;charset=utf-8';
    ctx.set('Content-Type',contentType);
    ctx.set('Access-Control-Allow-Origin','*');
    ctx.set('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    await next();
}