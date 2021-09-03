/*
 * @Date: 2020-07-31 10:30:21
 * @LastEditTime: 2020-07-31 10:32:28
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\inventoryQuery.ts
 */ 
import request from '@/utils/request'

// 账册库存金额合计数
export const queryZckcjehj = (data: any) => {
    return request({
      url: '/hisapi/drugscddz/stockSearchJehj',
      method: 'post',
      data
    })
  }

// 实物明细金额合计数
export const querySwmxjehjs = (data: any) => {
  return request({
    url: '/hisapi/drugscddz/queryJehjs',
    method: 'post',
    data
  })
}
