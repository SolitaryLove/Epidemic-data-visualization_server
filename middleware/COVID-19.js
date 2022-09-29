// 疫情数据接口 API

const axios=require('axios');
const {getEpidemicData}=require('../utils/getEpidemicData_utils');

axios.defaults.baseURL='https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules';

module.exports=async (ctx,next)=>{
    // 国内疫情数据
    if(ctx.request.url=='/api/areaTree'){
        // console.log(ctx.request.url);
        try{
            const data=await getEpidemicData('areaTree');
            ctx.response.body=data;
        }catch(error){
            const errorMsg={
                message:'The server cannot get the specified data!',
                status:404,
            };
            ctx.response.body=JSON.stringify(errorMsg);
        }
    }

    // 国内疫情每日总计及新增
    if(ctx.request.url=='/api/chinaList'){
        try{
            const data=await getEpidemicData('chinaList');
            ctx.response.body=data;
        }catch(error){
            const errorMsg={
                message:'The server cannot get the specified data!',
                status:404,
            };
            ctx.response.body=JSON.stringify(errorMsg);
        }
    }

    // 国内各省及下疫情数据
    if(ctx.request.url=='/api/province'){
        try{
            const data=await getEpidemicData('province');
            ctx.response.body=data;
        }catch(error){
            const errorMsg={
                message:'The server cannot get the specified data!',
                status:404,
            };
            ctx.response.body=JSON.stringify(errorMsg);
        }
    }

    // 国内与全国疫苗接种数据
    if(ctx.request.url=='/api/vaccines'){
        try{
            const data=await getEpidemicData('vaccines');
            ctx.response.body=data.VaccineTopData;
        }catch(error){
            const errorMsg={
                message:'The server cannot get the specified data!',
                status:404,
            };
            ctx.response.body=JSON.stringify(errorMsg);
        }
    }
    
    await next();
}
