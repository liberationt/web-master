/*
 * @Author: 董亮
 * @LastEditTime: 2020-09-27 15:51:50
 * @LastEditors: 董亮
 * @Description: 
 * @FilePath:
 */
import request from '@/utils/request'


// 检索
export const retrieval = (data: any) => {
    return request({
        url: '/hisapi/shybdz/czjmsbb',
        method: 'post',
        data
    })
}

// 上报 
export const reporting = (data: any) => {
    return request({
        url: '/hisapi/shybdz/czjmsbbdc',
        method: 'post',
        data
    })
}