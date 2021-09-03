/*
 * @Date: 2020-07-13 19:10:32
 * @LastEditTime: 2020-07-22 20:16:46
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugBaseInfoMaintain.ts
 */ 
import request from '@/utils/request'

// 作废
export const delDrugBaseInfoMaintain= (data: any) => {
    return request({
      url: '/hisapi/drugstypk/disable',
      method: 'post',
      data
    })
  }

  // 启用
export const enableDrugBaseInfoMaintain= (data: any) => {
  return request({
    url: '/hisapi/drugstypk/enable',
    method: 'post',
    data
  })
}

