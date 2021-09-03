
/*
 * @Date: 
 * @LastEditors: dmj
 * @LastEditTime: 
 * @description:  诊疗项目维护
 */

import request from '@/utils/request'

//查询医技分类树集合
export const getTreeData = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/getTree',
        method: 'post',
        data,
    })
}
//查询医技类型列表
export const queryData = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/queryList',
        method: 'post',
        data,
    })
}

//作废
export const deleteItem = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/delete',
        method: 'post',
        data,
    })
}
//诊疗项目维护新增
export const diagnosisAdd = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/add',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
//执行科室列表
export const depTList = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/executeDeptList',
        method: 'post',
        data,
    })
}

//诊疗项目维护编辑
export const diagnosisEdit = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/edit',
        method: 'post',
        data,
    })
}

//诊疗项目维护-收费对照删除
export const diagnosisFeeDelete = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/sfdzDelete',
        method: 'post',
        data,
    })
}
//诊疗项目维护-收费对照新增
export const diagnosisPayAdd = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/sfdzAdd',
        method: 'post',
        data,
    })
}
//诊疗项目维护-收费对照列表
export const diagnosisList = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/sfdzList',
        method: 'post',
        data,
    })
}

//诊疗项目维护-树结构新增
export const diagnosisTreeAdd = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/treeAdd',
        method: 'post',
        data,
    })
}
//诊疗项目维护-树结构编辑
export const diagnosisTreeEdit = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/treeEdit',
        method: 'post',
        data,
    })
}


//诊疗项目维护-树结构注销
export const diagnosisTreeLogut = (data: any) => {
    return request({
        url: '/hisapi/treatmentItems/treeLogout',
        method: 'post',
        data,
    })
}

// 获取拼音码
export const getMnemonic = (data: any) => {
    return request({
        url: '/system-service/system/public/get/mnemonic',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}