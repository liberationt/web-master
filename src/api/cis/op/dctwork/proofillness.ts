/*
 * @Date:
 * @LastEditors: wangyao
 * @LastEditTime: 2020-07-07 17:00:12
 * @description:
 */


import request from '@/utils/request'

export interface Iobject {
    bqid: number | null,
    brxb: number | null,
    brxm: string | null,
    brzd: string | null,
    bz: string | null,
    cardno: string | null,
    jssj: string | null,
    jssxw: number | null,
    jzks: number | null,
    jzrq: string | null,
    jzys: string | null,
    kssj: string | null,
    kssxw: number | null,
    lx: number | null,
    mzhm: string | null,
    sfzh: string | null,
    xxts: string | null,
    zyhm: string | null,
    pageNum: 1,
    pageSize: 20
}
// 保存病情证明
export const saveDiseaseProof = (data: any) => {
    return request({
        url: '/hisapi/opbqzm/saveDiseaseProof',
        method: 'post',
        data,
    })
}// 删除病情证明
export const deleteById = (data: any) => {
    return request({
        url: '/hisapi/opbqzm/deleteByBqid',
        method: 'post',
        data,
    })
}

//  /opbqzm/deleteByBqid
