/*
 * @Author: wangyao
 * @LastEditTime: 2020-08-31 11:10:26
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\nursingSet\pharmacyEdit.ts
 */

import request from '@/utils/request'

// 查询药房设置列表 zyh
export const queryBqFyyfInfo = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryNisFyyfInfo',
        method: 'post',
        data
    })
}
// 注销或启用 zyh
export const updateStage = (data: any) => {
    return request({
        url: '/hisapi/nursework/updateStage',
        method: 'post',
        data
    })
}
// 保存
export const saveBqFyyfCommit = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveNisFyyfCommit',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}