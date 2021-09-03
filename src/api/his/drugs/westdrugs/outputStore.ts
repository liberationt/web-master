/*
 * @Date: 2020-07-31 15:43:55
 * @LastEditTime: 2020-09-08 19:52:35
 * @Description: 出库处理
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\outputStore.ts
 */ 
import request from '@/utils/request'

 //出库单详情
 export const queryOutProcessQueryApply= (data: any) => {
    return request({
      url: '/hisapi/out/process/query/drug/detail',
      method: 'post',
      data
    })
  }

   //出库单弹窗详情
 export const queryStorehouseCheckOutDetail= (data: any) => {
  return request({
    url: '/hisapi/out/process/query/commit/drug/detail',
    method: 'post',
    data
  })
}

   //查询出库详细信息弹窗
 export const queryStorehouseOpDetail= (data: any) => {
  return request({
    url: '/hisapi/out/process/query/drug/opdetail',
    method: 'post',
    data
  })
}
  

 //查询药品库存数量
 export const queryKcsl =(data: any) => {
  return request({
    url: '/hisapi/out/process/query/kcsl',
    method: 'post',
    data
  })
}

//出库方式查询
export const queryOutStoreType = (data: any) => {
  return request({
    url: '/hisapi/drug/storage/public/inout/way',
    method: 'post',
    data,
  })
}

//退回出库单
export const returnApplay = (data: any) => {
  return request({
    url: '/hisapi/out/process/return/apply',
    method: 'post',
    data,
  })
}



//提交执行
export const saveAdjustCommit = (data: any) => {
    return request({
      url: '/hisapi/out/process/commit',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  

//新增和选中未出库单验证
export const queryDyfs = (data: any) => {
  return request({
    url: '/hisapi/out/process/query/dyfs',
    method: 'post',
    data,
  })
}

  //出库新增
export const addCheckIn= (data: any) => {
    return request({
      url: '/hisapi/out/process/save',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

//出库编辑
export const editCheckIn= (data: any) => {
    return request({
      url: '/hisapi/out/process/save',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

//出库删除
export const delCheckInData= (data: any) => {
    return request({
      url: '/hisapi/out/process/remove',
      method: 'post',
      data
    })
  }
  