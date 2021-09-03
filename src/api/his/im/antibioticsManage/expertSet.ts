/*
 * @Author: wangyao
 * @LastEditTime: 2020-09-20 10:57:04
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\antibioticsManage\expertSet.ts
 */

import request from '@/utils/request'
// 使用理由新增修改保存
export const saveOrUpdate = (data: any) => {
    return request({
        url: '/hisapi/amqctsjkjywhzzj/saveOrUpdate',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 删除
export const deleteById = (data: any) => {
    return request({
        url: '/hisapi/amqctsjkjywhzzj/deleteById',
        method: 'post',
        data,
    })
}