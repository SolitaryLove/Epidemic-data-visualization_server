// 根据请求URL获取相关疫情数据

const axios=require('axios');

const instance=axios.create({
    baseURL:'https://api.inews.qq.com/newsqa/v1/automation/modules',
})
module.exports.getEpidemicData=(type)=>{
    if(type==='areaTree'){
        return new Promise((resolve,reject)=>{
            axios({
                url:'/list',
                method:'GET',
                params:{
                    modules:'areaTree'
                }
            }).then(
                response=>{
                    const areaTree=response.data.data.areaTree[0];
                    resolve(areaTree);
                }
            ).catch(
                error=>{
                    reject(error.message);
                }
            );
        });
    }

    if(type==='chinaList'){
        return new Promise((resolve,reject)=>{
            axios({
                url:'/list',
                method:'GET',
                params:{
                    modules:'chinaDayList,chinaDayAddList',
                }
            }).then(
                response=>{
                    const data=response.data.data;
                    let chinaDayAddList=data.chinaDayAddList.slice(-6);
                    let chinaDayList=data.chinaDayList.slice(-6);
                    let chinaDayAddArr=[];
                    let chinaDayArr=[];
                    chinaDayAddList.forEach(item=>{
                        chinaDayAddArr.push({date:item.date,confirm:item.confirm});
                    });
                    chinaDayList.forEach(item=>{
                        chinaDayArr.push({date:item.date,confirm:item.nowConfirm});
                    });
                    let returnData={
                        chinaDayAddList:{
                            title:'国内现存确诊日增长',
                            data:chinaDayAddArr,
                        },
                        chinaDayList:{
                            title:'国内现存确诊总数',
                            data:chinaDayArr,
                        },
                        type: [{
                            key: "chinaDayAddList",
                            text: "国内现存确诊日增长"
                        }, {
                            key: "chinaDayList",
                            text: "国内现存确诊总数"
                        }]
                    };
                    resolve(returnData);
                }
            ).catch(
                error=>{
                    reject(error.message);
                }
            )
        })
    }

    if(type==='province'){
        return new Promise((resolve,reject)=>{
            axios({
                url:'/list',
                method:'GET',
                params:{
                    modules:'areaTree'
                }
            }).then(
                response=>{
                    const areaTree=response.data.data.areaTree[0];
                    const children=areaTree.children.slice(1,4);
                    resolve(children);
                }
            ).catch(
                error=>{
                    reject(error.message);
                }
            );
        });
    }

    if(type==='vaccines'){
        return new Promise((resolve,reject)=>{
            instance({
                url:'/list',
                method:'GET',
                params:{
                    modules:'VaccineTopData'
                }
            }).then(
                response=>{
                    const returnData=response.data.data;
                    resolve(returnData);
                }
            ).catch(
                error=>{
                    reject(error.message);
                }
            );
        });
    }
}