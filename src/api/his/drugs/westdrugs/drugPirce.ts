/*
 * @Date: 2020-07-16 19:55:25
 * @LastEditTime: 2020-08-14 17:18:19
 * @Description: 药品价格
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugPirce.ts
 */ 

import request from '@/utils/request.ts'
 // 药品价格查询
 export const queryDrugPirce = (data: any) => {
  return request({
    url: '/hisapi/drugstypk/drug/price',
    method: 'post',
    data
  })
}
 // 药品价格保存
 export const saveDrugPirce = (data: any) => {
    return request({
      url: '/hisapi/drugstypk/drug/price/save',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  
    // 药品价格删除
    export const cancelDrugPirce = (data: any) => {
      return request({
        url: '/hisapi/drugstypk/drug/price/disable',
        method: 'post',
        data
      })
    }
    
    // 药品价格启用
    export const enableDrugPirce = (data: any) => {
        return request({
            url: '/hisapi/drugstypk/drug/price/enable',
            method: 'post',
            data
        })
    }
