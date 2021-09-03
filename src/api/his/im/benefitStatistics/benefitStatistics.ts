/*
 * @Author: dmj
 * @LastEditTime: 
 * @LastEditors: dmj
 * @Description:护理工作量统计
 * @FilePath: 
 */
import axios from '@/utils/request.ts'
export interface Iobject {
    month: number | null
    year: number | null
    patType: string | null
    deptName: string | null
}
export interface Iitem {
    deptName: string | null
    month: number | null
    patType: number | null
    year: number | null
}
///按病区统计总分
export const patientArea = (data: any) => {
    return axios({
        url: '/nurseapi/careitemsreport/findCollectByBq',
        method: 'post',
        data,
    })
}
//按治疗护理项目统计总分
export const treatment = (data: any) => {
    return axios({
        url: '/nurseapi/careitemsreport/findCollectByItems',
        method: 'post',
        data,
    })
}