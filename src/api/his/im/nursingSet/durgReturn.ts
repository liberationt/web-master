/*
 * @Author: wangyao
 * @LastEditTime: 2020-09-16 20:20:32
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\nursingSet\durgReturn.ts
 */

import request from '@/utils/request'

// 退药申请查询已发药记录 zyh,lybq
export const queryDispensingRecords = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryDispensingRecords',
        method: 'post',
        data
    })
}

// 查询已保存退药申请列表 zyh
export const queryDrugWithdrawalApplicationList = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryDrugWithdrawalApplicationList',
        method: 'post',
        data
    })
}

// 退药申请查询退药记录 zyh
export const querytyRecords = (data: any) => {
    return request({
        url: '/hisapi/nursework/querytyRecords',
        method: 'post',
        data
    })
}

// 查询可退数量 lybq,ypcd,ypdj,ypxh,yzxh.zyh
export const queryTurningBackNumber = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryTurningBackNumber',
        method: 'post',
        data,
        // headers: {
        //     "Content-Type": "application/json"
        // }
    })
}

// 保存退药申请记录 bqTymxReqList,zyh
export const saveBackApplication = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveBackApplication',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// 提交退药记录 zyh
export const saveCommitBackApplication = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveCommitBackApplication',
        method: 'post',
        data
    })
}

// 退药保存前查询附加项目信息 zyh
export const loadAppendAdviceTysq = (data: any) => {
    return request({
        url: '/hisapi/nursework/loadAppendAdviceTysq',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}