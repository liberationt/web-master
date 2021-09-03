/*
 * @Date: 2020-08-20 15:25:50
 * @LastEditors: 董亮
 * @LastEditTime: 
 * @description:  给药频次维护
 */

import request from '@/utils/request'

// 新增
export const addFrequency = (data: any) => {
    return request({
        url: '/hisapi/dicsypc/add',
        method: 'post',
        data,
    })
}

// 删除
export const delFrequency = (data: any) => {
    return request({
        url: '/hisapi/dicsypc/delete',
        method: 'post',
        data,
    })
}

// 修改
export const editFrequency = (data: any) => {
    return request({
        url: '/hisapi/dicsypc/edit',
        method: 'post',
        data,
    })
}

// 根据频次编码查询每日次数
export const getMrcsByPcbm = (data: any) => {
    return request({
        url: '/hisapi/dicsypc/getMrcsByPcbm',
        method: 'post',
        data,
    })
}
