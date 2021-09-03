/*
 * @Author: 曹俊
 * @LastEditTime: 2020-09-08 17:31:55
 * @LastEditors: 曹俊
 * @Description: 
 * @FilePath: \web-master\src\api\his\inject\infusiondrugs\pharmacyConfiguratio.ts
 */ 
import request from '@/utils/request'

export interface Isearch {
    type: string | null
    start?: string | null
    end?: string | null
    czrghList?: any| null 
}

// 查询静脉配置环境详情
export const queryCount = (data: any) => {
    return request({
        url: `/hisapi/statistical/query/count/list`,
        method: 'post',
        data
    })
}

// 查询静脉配置环境详情
export const queryLog = (data: any) => {
    return request({
        url: `/hisapi/trace/back/query/operator/log`,
        method: 'post',
        data
    })
}

// 查询审核医嘱明细
export const queryYzDetail = (data: any) => {
    return request({
        url: `/hisapi/statistical/query/yz/detail/list`,
        method: 'post',
        data
    })
}

// 查询排药/打包医嘱明细
export const queryDetail = (data: any) => {
    return request({
        url: `/hisapi/statistical/query/detail/list`,
        method: 'post',
        data
    })
}