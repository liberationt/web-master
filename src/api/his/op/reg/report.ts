// 报表
import axios from '@/utils/request'

// 挂号日报
export const aRegReport = (data: any) => {
  return axios.request({
    url: '/hisapi/ghrbReport/registerDailyTableView',
    method: 'post',
    data
  })
}