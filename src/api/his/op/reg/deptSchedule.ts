// 挂号科室排班维护
import axios from '@/utils/request'

// 获取列表
export const aDeptSchList = (data: any) => {
  return axios.request({
    url: '/hisapi/opkspb/doGetModelDataOperation',
    method: 'post',
    data
  })
}

// 保存排班
export const aSaveDeptSch = (data: any) => {
  return axios.request({
    url: '/hisapi/opkspb/doSaveDepartmentScheduling',
    method: 'post',
    data,
    headers:{
			"Content-Type": "application/json"
		}
  })
}

// 复制排班
export const aSaveCopy = (data: any) => {
  return axios.request({
    url: '/hisapi/opkspb/doSaveCopy',
    method: 'post',
    data,
    headers:{
			// "Content-Type": "application/json"
		}
  })
}
