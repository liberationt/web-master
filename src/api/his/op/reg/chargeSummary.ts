// 收费汇总
import axios from '@/utils/request'

// 收费汇总产生前验证
export const aChargesSummaryBefVerification = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/doChargesSummaryBefVerification',
    method: 'post',
    data
  })
}

// 收费汇总报表产生
export const aChargesFsbSummaryCs = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/chargesFsbSummaryCs',
    method: 'post',
    data
  })
}

// 收费汇总-汇总前验证
export const aChargesSummaryCheckOutBefVerification = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/doChargesSummaryCheckOutBefVerification',
    method: 'post',
    data
  })
}

// 收费汇总-取消汇总查询
export const aQueryCancelHzCommit = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/doQueryCancelHzCommit',
    method: 'post',
    data
  })
}

// 收费汇总-取消汇总
export const aCancelCommit = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/cancelCommit',
    method: 'post',
    data
  })
}

// 收费汇总-查询
export const aQuerySQLList = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/doQuerySQLList',
    method: 'post',
    data
  })
}