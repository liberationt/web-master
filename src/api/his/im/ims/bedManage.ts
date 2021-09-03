import axios from '@/utils/request.ts'

// 查询单个床位信息信息
export const bedInfoQuery = (data: any) =>
  axios.request({
    url: '/hisapi/bedManage/queryCwfpInfo',
    method: 'post',
    data
  })

// 退床处理
export const bedBack = (data: any) =>
  axios.request({
    url: '/hisapi/bedManage/zyglCwszTc',
    method: 'post',
    data
  })

// 床位分配
export const bedDistributionSave = (data: any) =>
  axios.request({
    url: '/hisapi/bedManage/cwfp',
    method: 'post',
    data
  })

// 床位转床
export const bedchangeSave = (data: any) =>
  axios.request({
    url: '/hisapi/bedManage/zyglCwszZc',
    method: 'post',
    data
  })
