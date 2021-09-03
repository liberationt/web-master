/*
 * @Date: 2020-07-31 14:47:29
 * @LastEditTime: 2020-09-03 17:13:05
 * @Description: 月底过账
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\monthlyInvoices.ts
 */ 
import request from '@/utils/request'

export interface Iobj {
    brxz: number | null
    ckbh: number | null
    yfsb: number | null
    value?: string | null
}

export interface Iitem {
    ms_cf02_CFSB: number | null
}
export interface Iobject {
    cfsb: number | null
    fygh: string | null
    yfsb: number | null
    brxz?: number | null
    ckbh?: number | null
    fphm?: string | null
}

// initialization-检查药房账簿是否初始化
export const checkInit = (data: any) => {
    return request({
        url: "/hisapi/drugsjzjl/doInitialQuery",
        method: 'post',
        data
    })
}

// 月结
export const monthlyBalance = (data: any) => {
    return request({
        url: '/hisapi/drugsjzjl/doSaveStorehouseMonthly',
        method: 'post',
        data,
    })
}

// 查询取消月结月份
export const queryCancelMonth = (data: any) => {
    return request({
        url: '/hisapi/storage/month/end/query/cancel/month',
        method: 'post',
        data,
    })
}
