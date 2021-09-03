/*
 * @Author: wangyao
 * @LastEditTime: 2020-09-20 09:59:54
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\antibioticsManage\parameterSet.ts
 */

import request from '@/utils/request'
// 使用参数新增修改保存
export const saveOrUpdate = (data: any) => {
    return request({
        url: '/hisapi/amqckjywsycs/saveOrUpdate',
        method: 'post',
        data
    })
}
// 查询
export const getOneByEntity = (data: any) => {
    return request({
        url: '/hisapi/amqckjywsycs/getOneByEntity',
        method: 'post',
        data
    })
}