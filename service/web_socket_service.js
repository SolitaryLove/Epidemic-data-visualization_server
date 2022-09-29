const WebSocket=require('ws');
// 使用 Server 类创建 WebSocket 实例对象
const wss=new WebSocket.Server({
    port:9999,
});

const path=require('path');
const fileUtils=require('../utils/file_utils');

/*
* 服务端与客户端约定通信字段
* 服务端与客户端之间的数据交互采用 JSON 格式
* {
*   action:         'getData' || 'fullScreen' || 'changeTheme',
        action 某项行为：获取图表数据，产生了全屏事件，产生了主题切换的事件
*   dataType:       'sellerData...',
        dataType 业务模块类型
*   chartName:      'seller...',
        charName 图表名称
*   actionValue:    'true || false || chalk || vintage',
        actionValue 具体的数据值
* }
* */
module.exports.listen=()=>{
    // 如果有 WebSocket 请求接入，wss 对象可以响应c onnection 事件来处理这个 WebSocket
    wss.on('connection',client=>{
       console.log('有客户端连接成功...');
       client.on('message',async msg=>{
            console.log('客户端发送数据给服务端:'+msg);
            let payload=JSON.parse(msg);
            let action=payload.action;
            if(action==='getData'){
                let filePath=`../data/${payload.chartName}.json`;
                filePath=path.join(__dirname,filePath);
                const data=await fileUtils.getFileJsonData(filePath);
                payload.data=data;
                client.send(JSON.stringify(payload));
            }else{
                // 主题切换，全屏切换，进行每个客户端的同步，收到什么数据就发送什么数据
                wss.clients.forEach(client=>{
                    client.send(JSON.stringify(payload));
                });
            }
       });
    });
}