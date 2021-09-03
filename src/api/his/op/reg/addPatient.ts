// 病人档案
import axios from '@/utils/request'

// 新增
export const aAddPatient = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doAddPerson',
    method: 'post',
    data,
    headers:{
			"Content-Type": "application/json"
		}
  })
}

// 获取门诊号码
export const aQueryMzhm = () => {
  return axios.request({
    url: '/hisapi/opghksManage/doQueryMzhm',
    method: 'post',
    headers:{
			"Content-Type": "application/json"
		}
  })
}

// 获取病人性质列表
export const aGetBrxzList = () => {
  return axios.request({
    url: '/hisapi/opghksManage/getPubBrxzList',
    method: 'post',
  })
}

// 查询身份证号
export const aQuerySfzh = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doQueryPersonByIdcard',
    method: 'post',
    data
  })
}

// 查询身份证号
export const aQueryCard = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doQueryPersonByCardno',
    method: 'post',
    data
  })
}

// 卡注销
export const aLogoffCard = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doCancelCard',
    method: 'post',
    data
  })
}

// 卡挂失
export const aLockCard = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doLostCard',
    method: 'post',
    data
  })
}

// 卡解挂
export const aUnLockCard = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doUnlatchCard',
    method: 'post',
    data
  })
}
