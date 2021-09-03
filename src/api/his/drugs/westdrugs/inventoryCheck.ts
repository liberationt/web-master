/*
 * @Date: 2020-08-11 14:04:24
 * @LastEditTime: 2020-08-11 20:01:53
 * @Description: 药品盘点
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\inventoryCheck.ts
 */

import request from '@/utils/request'

// 盘点单确认
export const conservationCommit = (data: any) => {
    return request({
        url: '/hisapi/drugspd01/commit',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// 药品盘点-盘点明细查询
export const queryDetail = (data: any) => {
    return request({
        url: '/hisapi/drugspd01/queryInventoryData',
        method: 'post',
        data
    })
}

// 药品盘点-查询账面总金额和实盘总金额
export const queryTotalAmount = (data: any) => {
    return request({
        url: '/hisapi/drugspd01/query/total/amount',
        method: 'post',
        data
    })
}
// 药品盘点-检查是否可创建盘点单
export const queryCreateCheck = (data: any) => {
    return request({
        url: '/hisapi/drugspd01/create/check',
        method: 'post',
        data
    })
}

// 删除盘点单
export const removeConservation = (data: any) => {
    return request({
        url: '/hisapi/drugspd01/remove',
        method: 'post',
        data
    })
}

// 盘点单保存
export const saveConservation = (data: any) => {
    return request({
        url: '/hisapi/drugspd01/save',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
