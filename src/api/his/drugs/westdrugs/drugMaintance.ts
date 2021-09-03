/*
 * @Date: 2020-07-31 13:43:19
 * @LastEditTime: 2020-09-24 16:25:07
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugMaintance.ts
 */ 

import request from '@/utils/request'

// 养护单确认
export const conservationCommit = (data: any) => {
    return request({
        url: '/hisapi/drug/maintenance/commit',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// 药品养护-养护明细查询
export const queryDetail = (data: any) => {
    return request({
        url: '/hisapi/drug/maintenance/query/detail',
        method: 'post',
        data
    })
}

// 删除养护单
export const removeConservation = (data: any) => {
    return request({
        url: '/hisapi/drugsyh01/removeConservation',
        method: 'post',
        data
    })
}

// 养护单保存
export const saveConservation = (data: any) => {
    return request({
        url: '/hisapi/drug/maintenance/save',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
