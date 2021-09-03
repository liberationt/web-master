/*
 * @Author: wangyao
 * @LastEditTime: 2020-07-28 14:11:02
 * @LastEditors: wangyao
 * @Description:病区项目执行
 * @FilePath: \web-master\src\api\his\im\nursingSet\wardProject.ts
 */

import request from '@/utils/request'


// 病区项目执行按项目执行病人信息列表查询
export const xmQuery = (data: any) => {
    return request({
        url: '/hisapi/nursework/xmQuery',
        method: 'post',
        data
    })
}
// 病区项目执行按病人执行病人信息列表查询
export const patientQuery = (data: any) => {
    return request({
        url: '/hisapi/nursework/patientQuery',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 查询病人需执行的医嘱明细列表
export const detailChargeQuery = (data: any) => {
    return request({
        url: '/hisapi/nursework/detailChargeQuery',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}