/*
 * @Date: 2020-07-30 13:55:08
 * @LastEditTime: 2020-07-30 13:57:32
 * @Description: 付款处理
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\paymentProcessing.ts
 */ 

import request from '@/utils/request'

// 付款处理床狗数据列表
export const queryPaymentProcessing = (data: any) => {
  return request({
    url: '/hisapi/PaymentProcessingCtr/queryPaymentProcessing',
    method: 'post',
    data
  })
}
// 保存付款信息
export const savePaymentProcessing = (data: any) => {
    return request({
      url: '/hisapi/PaymentProcessingCtr/updatePaymentProcessing',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
