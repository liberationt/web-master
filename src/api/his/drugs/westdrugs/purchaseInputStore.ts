/*
 * @Date: 2020-07-23 15:15:14
 * @LastEditTime: 2020-09-07 11:23:28
 * @Description: 采购入库
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\purchaseInputStore.ts
 */ 

import request from '@/utils/request'

// 未确定入库-分页查询
export const queryUnconfirmed= (data: any) => {
  return request({
    url: '/hisapi/drugsrk01/unconfirmed/queryPage',
    method: 'post',
    data
  })
}

// 确定入库-分页查询
export const queryConfirmed= (data: any) => {
    return request({
      url: '/hisapi/drugsrk01/confirmed/queryPage',
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
      url: '/hisapi/drugsrk01/doSaveCheckInToInventory',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

//药品查询
export const queryDrugInfo = (data: any) => {
    return request({
      url: '/hisapi/drugsrk01/drug/queryPage',
      method: 'post',
      data
    })
  }

  //入库新增
export const addCheckIn= (data: any) => {
    return request({
      url: '/hisapi/drugsrk01/saveCheckIn',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

//入库编辑
export const editCheckIn= (data: any) => {
    return request({
      url: '/hisapi/drugsrk01/editCheckIn',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

//入库删除
export const delCheckInData= (data: any) => {
    return request({
      url: '/hisapi/drugsrk01/removeCheckInData',
      method: 'post',
      data
    })
  }

// 计算
export const calc = (data: any) => {
  return request({
      url: `/hisapi/pharmacy/public/calc/money`,
      method: 'post',
      data,
      headers: {
          "Content-Type": "application/json"
      }
  })
}

  
