// 医技管理-执行确认查询
import axios from '@/utils/request'

// 皮试项目列表查询
export const aQuerySkinTestList = (data: any) => {
  return axios.request({
    url: '/hisapi/skinxm/doQuerySkinTestList',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}