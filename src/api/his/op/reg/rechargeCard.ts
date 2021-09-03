// 充值卡
import axios from '@/utils/request'

// 分页查询
export const aQueryCzkList = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doQueryCzkList',
    method: 'post',
    data
  })
}

// 查询详情
export const aQueryMPICard = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doQueryMPICard',
    method: 'post',
    data
  })
}

// 登记
export const aSaveIssuingCards = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doSaveIssuingCards',
    method: 'post',
    data
  })
}

// 充值卡信息查询
export const aQueryKpxx = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doQueryKpxx',
    method: 'post',
    data
  })
}

// 充值
export const aSaveRecharge = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doSaveRecharge',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 余额转出
export const aSaveTransfer = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doSaveTransfer',
    method: 'post',
    data
  })
}

// 退费
export const aSaveRefund = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doSaveRefund',
    method: 'post',
    data
  })
}

// 挂失
export const aSaveRegloss = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doSaveRegloss',
    method: 'post',
    data
  })
}

// 解挂
export const aSaveUnregloss = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doSaveUnregloss',
    method: 'post',
    data
  })
}

// 注销
export const aSaveLogout = (data: any) => {
  return axios.request({
    url: '/hisapi/mpikpxx/doSaveLogout',
    method: 'post',
    data
  })
}
