// 输液、注射科室设置
import axios from '@/utils/request'

// 查询输液注射科室列表
export const aQuerySyksList = (data: any) => {
  return axios.request({
    url: '/hisapi/syks/doQuerySyksList',
    method: 'post',
    data
  })
}

// 新增/修改
export const aSaveSyks = (data: any) => {
  return axios.request({
    url: '/hisapi/syks/doSaveSyks',
    method: 'post',
    data
  })
}

// 停用/启用
export const aUpdateZt = (data: any) => {
  return axios.request({
    url: '/hisapi/syks/doUpdateZt',
    method: 'post',
    data
  })
}