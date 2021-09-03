// 收费日报
import axios from '@/utils/request'

// 查询最后一次汇总时间
export const aGetLastHzrq = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/doGetLastHzrq',
    method: 'post',
    data
  })
}

// 收费日报产生、结账、查询确认
export const aCreateSfrb = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/doCreateSfrb',
    method: 'post',
    data,
    // headers:{
		// 	"Content-Type": "application/json"
		// }
  })
}

// 收费日报结账前校验
export const aQueryVerification = () => {
  return axios.request({
    url: '/hisapi/ghrbReport/doQueryVerification',
    method: 'post',
  })
}

// 取消结账查询
export const aQueryCancelCommit = () => {
  return axios.request({
    url: '/hisapi/ghrbReport/doQueryCancelCommit',
    method: 'post',
  })
}

// 取消结账
export const aCancelCommit = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/doCancelCommit',
    method: 'post',
    data
  })
}

// 查询收费日报
export const aQuerySQL = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/doQuerySQL',
    method: 'post',
    data
  })
}