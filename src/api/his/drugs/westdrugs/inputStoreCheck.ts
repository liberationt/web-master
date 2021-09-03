/*
 * @Date: 2020-07-28 18:41:27
 * @LastEditTime: 2020-09-22 17:16:03
 * @Description: 采购入库
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\inputStoreCheck.ts
 */ 
import request from '@/utils/request'

// 未验收入库单-分页查询
export const queryUnconfirmed= (data: any) => {
  return request({
    url: '/hisapi/StorageAcceptanceCtr/unAcceptanceDataQuery',
    method: 'post',
    data
  })
}

// 未验收入库单-分页查询
export const queryConfirmed= (data: any) => {
    return request({
      url: '/hisapi/StorageAcceptanceCtr/doFinancialAcceptanceDataQuery',
      method: 'post',
      data
    })
  }

 //详情
 export const detailPurchaseInputStore = (data: any) => {
    return request({
      url: '/hisapi/drugsrk01/detail',
      method: 'post',
      data
    })
  }

//提交入库
export const saveCheckInToInventory = (data: any) => {
    return request({
      url: '/hisapi/StorageAcceptanceCtr/commit',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  //入库方式查询
export const queryInputStoreType = (data: any) => {
  return request({
    url: '/hisapi/drug/storage/public/inout/way',
    method: 'post',
    data,
  })
}
  
