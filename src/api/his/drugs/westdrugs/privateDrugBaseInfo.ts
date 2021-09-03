/*
 * @Date: 2020-07-22 19:57:40
 * @LastEditTime: 2020-07-22 20:22:17
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\privateDrugBaseInfo.ts
 */ 

import request from '@/utils/request'

// 作废判别
export const delDrugBaseInfoMaintain= (data: any) => {
    return request({
      url: '/hisapi/drugstock/disable',
      method: 'post',
      data
    })
  }

  // 启用
  export const enableDrugBaseInfoMaintain= (data: any) => {
    return request({
      url: '/hisapi/drugstock/enable',
      method: 'post',
      data
    })
  }
  