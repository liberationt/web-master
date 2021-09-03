/*
 * @Author: wangyao
 * @LastEditTime: 2020-08-31 17:06:06
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\nursingSet\temperatureChart.ts
 */

import request from '@/utils/request'

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
// 体温单内容作废
export const invalid = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/invalid',
        method: 'post',
        data
    })
}
// 获取患者信息
export const getZyh = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/getZyh',
        method: 'post',
        data
    })
}
// 体温单内容新增
export const addtwd = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/add',
        method: 'post',
        data
    })
}
// 体温单内容编辑
export const updatetwd = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/update',
        method: 'post',
        data
    })
}
// 体温单录入  保存
export const saveTwdSmtzInfo = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/saveTwdSmtzInfo',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 体温单临时事件录入  保存
export const saveBatchTwdnr = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/saveBatchTwdnr',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 体温单录入 查询
export const querySmtzInfoByZyh = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/querySmtzInfoByZyh',
        method: 'post',
        data
    })
}
// 体温单删除 查询
export const deleteTwdSmtz = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/deleteTwdSmtz',
        method: 'post',
        data
    })
}
// 体温单图表信息获取
export const loadTemperatureChart = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/loadTemperatureChart',
        method: 'post',
        data
    })
}

// 临时事件作废
export const invalidLSSJ = (data: any) => {
    return request({
        url: '/hisapi/imtwdnr/invalid',
        method: 'post',
        data
    })
}
