/*
 * @Date: 2020-09-01 15:23:47
 * @LastEditTime: 2020-09-01 15:25:56
 * @Description: 药品退回(针对采购入库)
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugReturn.ts
 */
import request from '@/utils/request'

 // 药品查询
 export const queryDrugs = (data: any) => {
    return request({
      url: '/hisapi/storage/drug/refund/query/list',
      method: 'post',
      data
    })
  }
  // 药品退回
   export const returnDrug = (data: any) => {
      return request({
        url: '/hisapi/storage/drug/refund/commit',
        method: 'post',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }