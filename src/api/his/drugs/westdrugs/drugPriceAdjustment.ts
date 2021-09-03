 
 /*
 * @Date: 2020-07-23 15:15:14
 * @LastEditTime: 2020-09-03 16:22:17
 * @Description: 采购入库
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugPriceAdjustment.ts
 */ 

import request from '@/utils/request'

 //未执行调价详情
 export const detailPriceAdjust = (data: any) => {
    return request({
      url: '/hisapi/drugstj01/detailPriceAdjust',
      method: 'post',
      data,
    })
  }

  //未执行调价执行详情
 export const detailPriceCommit= (data: any) => {
  return request({
    url: '/hisapi/drug/price/adjustment/query/kc/detail',
    method: 'post',
    data,
  })
}
  

//已执行调价详情
 export const detailPriceAdjusted = (data: any) => {
  return request({
    url: '/hisapi/drug/price/adjustment/query/executed/detail',
    method: 'post',
    data,
  })
}

//提交入库
export const saveCheckInToInventory = (data: any) => {
    return request({
      url: '/hisapi/drug/price/adjustment/execute',
      method: 'post',
      data
    })
  }
  
  //新增
export const addCheckIn= (data: any) => {
    return request({
      url: '/hisapi/drugstj01/savePriceAdjust',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

//编辑
export const editCheckIn= (data: any) => {
    return request({
      url: '/hisapi/drugstj01/editPriceAdjust',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

//删除调价单
export const delCheckInData= (data: any) => {
    return request({
      url: '/hisapi/drugstj01/deletePriceAdjust',
      method: 'post',
      data
    })
  }
  
