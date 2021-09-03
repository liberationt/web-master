/*
 * @Date: 2020-07-10 09:41:33
 * @LastEditTime: 2020-07-10 09:44:04
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\publicInfoManage.ts
 */ 
import request from '@/utils/request'

  // 新增
  export const addPurchaserUnit= (data: any) => {
    return request({
      url: '/hisapi/drugsjhdw/add',
      method: 'post',
      data
    })
  }
  // 修改
  export const editPurchaserUnit = (data: any) => {
    return request({
      url: '/hisapi/drugsjhdw/edit',
      method: 'post',
      data
    })
  }
   // 详细
   export const detailPurchaserUnit = (data: any) => {
    return request({
      url: '/hisapi/drugsjhdw/detail',
      method: 'post',
      data
    })
  }
