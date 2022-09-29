const Koa=require('koa');
// 创建 KOA 的实例对象
const app=new Koa();

// 绑定中间件
const Duration=require('./middleware/response_duration');
app.use(Duration);
const setHeader=require('./middleware/response_header');
app.use(setHeader);
const getData=require('./middleware/response_data');
app.use(getData);
const covid19_Data=require('./middleware/COVID-19');
app.use(covid19_Data);

// 监听端口号
app.listen(4000,error=>{
    if(!error){
        console.log('The server started successfully...');
    }else{
        console.log('The server startup failed...');
    }
});

const webSocketService=require('./service/web_socket_service');
webSocketService.listen();