// 输液接药登记
import axios from '@/utils/request'

// 登记查询（根据卡号/发票号查询病人已收费、已发药、未输液注射的处方）
export const aQueryUnregistList = (data: any) => {
  return axios.request({
    url: '/hisapi/syjydjzb/doQueryUnregistList',
    method: 'post',
    data
  })
}

// 登记
export const aSySaveRegist = (data: any) => {
  return axios.request({
    url: '/hisapi/syjydjzb/doSySaveRegist',
    method: 'post',
    data,
    headers:{
			"Content-Type": "application/json"
		}
  })
}

// 查看处方详情
export const aQueryRegistList = (data: any) => {
  return axios.request({
    url: '/hisapi/syjydjzb/doQueryRegistList',
    method: 'post',
    data
  })
}

// 输液完成
export const aUpdateSyZt = (data: any) => {
  return axios.request({
    url: '/hisapi/syjydjzb/doUpdateSyZt',
    method: 'post',
    data
  })
}