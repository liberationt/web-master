/*
 * @Author: 董亮
 * @LastEditTime: 2020-09-27 16:59:50
 * @LastEditors: 董亮
 * @Description: 
 * @FilePath:
 */
import request from '@/utils/request'


// 检索
export const retrieval = (data: any) => {
    return request({
        url: '/hisapi/shybdz/czjmzysbb',
        method: 'post',
        data
    })
}

// 上报 
export const reporting = (data: any) => {
    return request({
        url: '/hisapi/shybdz/czjmzysbbdc',
        method: 'post',
        data
    })
}