/*
 * @Date: 2020-06-17 13:26:41
 * @LastEditors: zhml
 * @LastEditTime: 2020-06-17 13:27:16
 * @description:
 */


import request from '@/utils/request'
export const saveDialo = (data: any) => {
    return request({
        url: '/hisapi/yygl/saveAppointedInfomation',
        method: 'post',
        data,
    })
}

// 预约挂号校验
export const aCheckAppointedToday = (data: any) => {
  return request({
      url: '/hisapi/yygl/checkCanAppointedToday',
      method: 'post',
      data,
  })
}

export const aQueryPatientInfo = (data: any) => {
    return request({
      url: '/hisapi/opghksManage/doQueryPerson',
      method: 'post',
      data
    })
  }


export const getDoctorList = (data: any) => {
  return request({
    url: '/hisapi/yygl/queryYyksYsInfo',
    method: 'post',
    data
  })
}
