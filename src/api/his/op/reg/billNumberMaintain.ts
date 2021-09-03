// 诊室信息维护
import axios from '@/utils/request'

// 新增
export const aAddNumber = (data: any) => {
  return axios.request({
    url: '/hisapi/opygpj/add',
    method: 'post',
    data,
    headers:{
			"Content-Type": "application/json"
		}
  })
}

// 修改
export const aEditNumber = (data: any) => {
  return axios.request({
    url: '/hisapi/opygpj/edit',
    method: 'post',
    data,
    headers:{
			"Content-Type": "application/json"
		}
  })
}

// 删除
export const aDelNumber = (data: any) => {
  return axios.request({
    url: '/hisapi/opygpj/delete',
    method: 'post',
    data
  })
}
