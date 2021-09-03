// 医生排班维护
import axios from '@/utils/request'

// 获取当日所有医生列表
export const aDocSchList = (data: any) => {
  return axios.request({
    url: '/hisapi/opyspb/queryPage',
    method: 'post',
    data
  })
}

// 获取当日科室列表（不区分门诊类别）
export const aDeptList = (data: any) => {
  return axios.request({
    url: '/hisapi/opyspb/findDeptList',
    method: 'post',
    data
  })
}

// 获取挂号科室医生列表
export const aDeptDocList = (data: any) => {
  return axios.request({
    url: '/hisapi/opyspb/findList',
    method: 'post',
    data
  })
}

// 保存排班
export const aSaveDocSch = (data: any) => {
  return axios.request({
    url: '/hisapi/opyspb/add',
    method: 'post',
    data,
    headers:{
			"Content-Type": "application/json"
		}
  })
}

// 删除排班
export const aDelDocSch = (data: any) => {
  return axios.request({
    url: '/hisapi/opyspb/delete',
    method: 'post',
    data
  })
}

// 复制一条
export const aCopyDoc = (data: any) => {
  return axios.request({
    url: '/hisapi/opyspb/addCopy',
    method: 'post',
    data
  })
}

// 复制一周
export const aCopyWeek = (data: any) => {
  return axios.request({
    url: '/hisapi/opyspb/addCopyWeeks',
    method: 'post',
    data
  })
}
