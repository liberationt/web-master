
/*
 * @Date: 
 * @LastEditors: dmj
 * @LastEditTime: 
 * @description:  附加项目维护
 */

import request from '@/utils/request'

//查询附加项目关联列表
export const getMedicalData = (data: any) => {
    return request({
        url: '/hisapi/addItems/queryGlList',
        method: 'post',
        data,
    })
}

//查询附加项目关联列表新增
export const getMedicalDataAdd = (data: any) => {
    return request({
        url: '/hisapi/addItems/add',
        method: 'post',
        data,
    })
}
//查询附加项目关联列表删除
export const getMedicalDataDelete = (data: any) => {
    return request({
        url: '/hisapi/addItems/delete',
        method: 'post',
        data,
    })
}
//查询附加项目关联列表删除
export const getMedicalDataEdit = (data: any) => {
    return request({
        url: '/hisapi/addItems/edit',
        method: 'post',
        data,
    })
}