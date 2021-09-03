/*
 * @Date: 2020-07-15 14:02:47
 * @LastEditTime: 2020-07-15 14:03:28
 * @Description: 价格管理
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\priceManage.ts
 */ 
import request from '@/utils/request'

// 新增
export const queryPriceManage = (data: any) => {
  return request({
    url: '/hisapi/drugstypk/drug/price/page',
    method: 'post',
    data
  })
}
