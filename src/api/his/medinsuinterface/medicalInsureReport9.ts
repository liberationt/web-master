/*
 * @Author: 董亮
 * @LastEditTime: 2020-09-28 15:22:50
 * @LastEditors: 董亮
 * @Description: 
 * @FilePath:
 */
import request from '@/utils/request'


// 检索
export const retrieval = (data: any) => {
    return request({
        url: '/hisapi/shybdz/ydybbb',
        method: 'post',
        data
    })
}

// 上报 
export const reporting = (data: any) => {
    return request({
        url: '/hisapi/shybdz/ydybbbdc',
        method: 'post',
        data
    })
}