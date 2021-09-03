// 挂号管理
import axios from '@/utils/request'

// 初始化挂号管理,判断票据号是否设置，判断是否排班，初始化挂号科室信息
export const aInitReg = () => {
  return axios.request({
    url: '/hisapi/opghksManage/doUpdateDoctorNumbers',
    method: 'post'
  })
}

// 查询当日值班科室（区分门诊类别）
export const aQuerySchDept = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doQuerySchedulingDepartment',
    method: 'post',
    data,
    headers: {
      'Res-Type': 'special'
    }
  })
}

// 根据卡号查询病人信息
export const aQueryPatientInfo = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doQueryPerson',
    method: 'post',
    data
  })
}

// 查询该病人是否挂过同一科室
export const aCheckSameGhks = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doCheckGhks',
    method: 'post',
    data
  })
}

// 查询专家、特需门诊是否有医生排班
export const aCheckExpertSch = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doCheckZjmzpb',
    method: 'post',
    data
  })
}

// 根据科室查询排班医生
export const aQueryDeptSchDoc = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doQuerySchedulingDoctor',
    method: 'post',
    data
  })
}

// 挂号结算查询
export const aQueryRegSettlement = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doQueryRegisteredSettlement',
    method: 'post',
    data
  })
}

// 确认挂号
export const aSaveReg = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doSaveRegisteredManagement',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Res-Type': 'special'
    }
  })
}

// 挂号单据查询（退号查询）
export const aQueryGhdj = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doQueryGhdj',
    method: 'post',
    data
  })
}

// 退号
export const aSaveRetireRegistered = (data: any) => {
  return axios.request({
    url: '/hisapi/opmzxx/doSaveRetireRegistered',
    method: 'post',
    data
  })
}

// 转科查询
export const aQueryTurnDept = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doQueryTurnDept',
    method: 'post',
    data
  })
}

// 转科验证科室费用
export const aCheckKSFY = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doCheckKSFY',
    method: 'post',
    data
  })
}

// 转科
export const aCommitTurnDept = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doCommitTurnDept',
    method: 'post',
    data
  })
}

// 调入预约病人查询
export const aGetAnAppointment = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doGetAnAppointment',
    method: 'post',
    data
  })
}

// 根据病人性质查询上级性质
export const aQuerySjBrxz = (data: any) => {
  return axios.request({
    url: '/hisapi/opmzxx/querySjBrxz',
    method: 'post',
    data,
    headers: {
      'Res-Type': 'special'
    }
  })
}

// 判断是否为减免病人
export const aCheckJmbr = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doQueryJmbr',
    method: 'post',
    data,
    headers: {
      'Res-Type': 'special'
    }
  })
}

// 打印发票
export const aPrintghxx = (data: any) => {
  return axios.request({
    url: '/hisapi/opghksManage/doPrintghxx',
    method: 'post',
    data,
    headers: {
      // 'Res-Type': 'special'
    }
  })
}

// 调用emr病程记录信息
export const aQueryBcjlByEmr = (data: any) => {
  return axios.request({
    url: '/hisapi/msbcjl/queryBcjlByEmr',
    method: 'post',
    data,
    headers: {
      // 'Res-Type': 'special'
    }
  })
}
