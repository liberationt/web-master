/*
 * @Author: wangyao
 * @LastEditTime: 2020-07-29 10:19:15
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\nursingSet\wardRefund.ts
 */

import request from '@/utils/request'


// // 退药保存前查询附加项目信息 zyh
// export const loadAppendAdviceTysq = (data: any) => {
//     return request({
//         url: '/hisapi/nursework/loadAppendAdviceTysq',
//         method: 'post',
//         data,
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
// }

// 查询待退费项目 zyh
export const queryRefundableProject = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryRefundableProject',
        method: 'post',
        data
    })
}
// 退费执行
export const saveRefundClinic = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveRefundClinic',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}