/*
 * @Author: wangyao
 * @LastEditTime: 2020-08-27 20:32:04
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\residentDoctor\drugItemHelper.ts
 */
import request from '@/utils/request'

// 查询药品医嘱组套
export const queryMedicalStack = (data: any) => {
    return request({
        url: '/hisapi/opzt01/queryMedicalStack',
        method: 'post',
        data
    })
}

// 药品助手调入全部或常用药
export const loadMedicineInfo = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/loadMedicineInfo',
        method: 'post',
        data
    })
}
// 药品医嘱组套调入
export const loadAdviceSet = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/loadAdviceSet',
        method: 'post',
        data
    })
}
// 常用项目调入
export const loadClinicInfo = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/loadClinicInfo',
        method: 'post',
        data
    })
}

// 查询过敏药物
export const loadDetailsInfo = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/loadDetailsInfo',
        method: 'post',
        data
    })
}
// 项目组套调入
export const findPageByZtbhXm = (data: any) => {
    return request({
        url: '/hisapi/opzt02/findPageByZtbhXm',
        method: 'post',
        data
    })
}

// 项目组套调入保存
export const saveWarDisposalSet = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/saveWarDisposalSet',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 项目组套全部调入查询
export const loadFromPersonalSet = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/loadFromPersonalSet',
        method: 'post',
        data
    })
}
// 项目组套多条调入后查询
export const loadFromUSLTPersonalSet = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/loadFromUSLTPersonalSet',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 药品组套校验库存
export const checkYpZtKc = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/checkYpZtKc',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
