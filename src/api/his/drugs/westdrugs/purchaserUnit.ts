/*
 * @Date: 2020-07-06 16:35:09
 * @LastEditTime: 2020-09-27 16:57:41
 * @Description: 进货单位
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\purchaserUnit.ts
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

   // 新增
   export const checkPurchaserUnit= (data: any) => {
    return request({
      url: '/hisapi/purchasing/unit/check/name/repeat',
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
