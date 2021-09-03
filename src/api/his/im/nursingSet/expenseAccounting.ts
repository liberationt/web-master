/*
 * @Author: wangyao
 * @LastEditTime: 2020-07-29 16:19:25
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\nursingSet\expenseAccounting.ts
 */

import request from '@/utils/request'
// 明细作废 zyh
export const queryExpenseAccountingFymx = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryExpenseAccountingFymx',
        method: 'post',
        data
    })
}
// 查询待退费项目 zyh
export const queryItemInfo = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryItemInfo',
        method: 'post',
        data
    })
}
// 查询组套明细 zyh
export const loadDetailByZtBH = (data: any) => {
    return request({
        url: '/hisapi/nursework/doLoadDetailByZtBH',
        method: 'post',
        data
    })
}
// 作废记录 zyh
export const queryVoidedList = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryVoidedList',
        method: 'post',
        data
    })
}
// 作废 zyh
export const updateJzzf = (data: any) => {
    return request({
        url: '/hisapi/nursework/updateJzzf',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 保存明细 zyh
export const saveCostList = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveCostList',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}