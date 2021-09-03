/*
 * @Author: wangyao
 * @LastEditTime: 2020-09-25 16:54:57
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\antibioticsManage\useApproval.ts
 */

import request from '@/utils/request'
// 申请单审批 0 不同意 1 同意
export const updateAntibioticsExamine = (data: any) => {
    return request({
        url: '/hisapi/amqckjywsysq/updateAntibioticsExamine',
        method: 'post',
        data
    })
}
// 审批详情
export const getSqdInfoBySqdh = (data: any) => {
    return request({
        url: '/hisapi/amqckjywsysq/getSqdInfoBySqdh',
        method: 'post',
        data,
        // headers: {
        //     "Content-Type": "application/json"
        // }
    })
}