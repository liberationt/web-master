// 医技管理-医技执行确认
import axios from '@/utils/request'

// 医技确费列表
export const aQueryYjqfList = (data: any) => {
  return axios.request({
    url: '/hisapi/opyjzx/doQueryYjqfList',
    method: 'post',
    data,
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
}