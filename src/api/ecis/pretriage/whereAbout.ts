import request from '@/utils/request'

// 去向
export const chooseToW = (data: any) => {
  return request({
    url: '/hisapi/erpreyjfz/patientWhereabouts',
    method: 'post',
    data, 
  })
}
 
// 取消
export const cancleManage = (data: any) => {
  return request({
    url: '/hisapi/erpreyjfz/cancel',
    method: 'post',
    data, 
  })
}
 