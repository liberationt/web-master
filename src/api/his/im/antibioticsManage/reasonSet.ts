/*
 * @Author: wangyao
 * @LastEditTime: 2020-09-18 14:35:55
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\antibioticsManage\reasonSet.ts
 */

import request from '@/utils/request'
// 使用理由新增修改保存
export const saveOrUpdate = (data: any) => {
    return request({
        url: '/hisapi/amqcyskjywsyly/saveOrUpdate',
        method: 'post',
        data
    })
}
// 使用理由删除
export const deleteById = (data: any) => {
    return request({
        url: '/hisapi/amqcyskjywsyly/deleteById',
        method: 'post',
        data,
        // headers: {
        //     "Content-Type": "application/json"
        // }
    })
}