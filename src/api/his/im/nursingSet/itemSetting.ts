/*
 * @Author: dmj
 * @LastEditTime: 
 * @LastEditors: dmj
 * @Description:护理项目设置
 * @FilePath: 
 */
import axios from '@/utils/request.ts'
export interface Iobject {
    itemName: string | null
    aut: string | null
    score: number | null
    itemClass: string | null
    orderNo: number | null
}
export interface Iitem {
    month: string | null
    patType: string | null
    year: string | null
}
//列表数据
export const queryItem = (data: any) => {
    return axios({
        url: '/nurseapi/careitems/queryPage',
        method: 'post',
        data,
    })
}
//新增列表数据
export const addItem = (data: any) => {
    return axios({
        url: '/nurseapi/careitems/add',
        method: 'post',
        data,
    })
}
//编辑列表数据
export const editList = (data: any) => {
    return axios({
        url: '/nurseapi/careitems/edit',
        method: 'post',
        data,
    })
}
//查看详情
export const details = (data: any) => {
    return axios({
        url: '/nurseapi/careitems/getOneByEntity',
        method: 'post',
        data,
    })
}
//删除列表数据
export const deleteList = (orderNo: any) => {
    return axios({
        url: `/nurseapi/careitems/delete?orderNo=${orderNo}`,
        method: 'post',
    })

}
