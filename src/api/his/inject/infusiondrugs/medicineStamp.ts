/*
 * @Author: 曹俊
 * @LastEditTime: 2020-09-08 17:31:55
 * @LastEditors: 曹俊
 * @Description: 
 * @FilePath: \web-master\src\api\his\inject\infusiondrugs\pharmacyConfiguratio.ts
 */ 
import request from '@/utils/request'


// 查询发药批次列表
export const queryBatch = (data: any) => {
    return request({
        url: `/hisapi/batch/config/query/list`,
        method: 'post',
        data
    })
}

// 查询病区配置列表
export const queryWard = (data: any) => {
    return request({
        url: `/hisapi/print/label/query/ward/list`,
        method: 'post',
        data
    })
}

// 查询病人列表
export const queryPatient = (data: any) => {
    return request({
        url: `/hisapi/print/label/query/br/list`,
        method: 'post',
        data
    })
}

// 待审方病人列表
export const checkList = (data: any) => {
    return request({
        url: `/hisapi/check/prescription/query/yz/list`,
        method: 'post',
        data
    })
}

// 查询医嘱列表
export const queryYzList = (data: any) => {
    return request({
        url: `/hisapi/print/label/query/yz/list`,
        method: 'post',
        data
    })
}


// 打印标签
export const printLabel = (data: any) => {
    return request({
        url: `/hisapi/print/label/`,
        method: 'post',
        data
    })
}
