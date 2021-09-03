/*
 * @Author: dmj
 * @LastEditTime:
 * @LastEditors: dmj
 * @Description:床位设置
 * @FilePath:
 */
import axios from '@/utils/request.ts'
// 床位设置
export interface Iitem {
  brch: string | number
  ksdm?: string | number
}

export interface Iobject {
  brch: string | number | null
  cwfy: number | null
  cwks: number | null
  cwxb: number | null
  fjhm: string | null
  icu: number | null
  ksdm: number | null
  sbbrcwfy: number | null
  jcpb: number | null
  vipcwfy: number | null
}
// 新增床位
export const addBed = (data: any) =>
  axios.request({
    url: '/hisapi/imcwsz/add',
    method: 'post',
    data,
    // headers: {
    //   'Res-Type': 'special',
    // },
  })

//获取床位设置详情
export const details = (data: any) =>
  axios.request({
    url: '/hisapi/imcwsz/getOneByEntity',
    method: 'post',
    data,
  })

// 床位设置修改
export const editRecept = (data: any) =>
  axios.request({
    url: '/hisapi/imcwsz/edit',
    method: 'post',
    data,
  })

// 床位删除
export const bedDelete = (brch: any) =>
  axios.request({
    url: `/hisapi/imcwsz/delete?brch=${brch}`,
    method: 'post',
  })
