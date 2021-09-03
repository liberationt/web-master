/**
 * @Description:
 * @author: zhml
 * @param {type}:
 * @return:
 * @date 2020/6/30
*/

import request from '@/utils/request'


//新增
export const add = (data: any) => {
  return request({
    url: '/hisapi/mzzydj/saveHosReg',
    method: 'post',
    data,
  })
}

//edit
export const edit = (data: any) => {
  return request({
    url: '/hisapi/mzzydj/updateHosReg',
    method: 'post',
    data,
  })
}

//delete
export const deleteById = (data: any) => {
  return request({
    url: '/hisapi/mzzydj/deleteById',
    method: 'post',
    data,
  })
}

/**
 * @Description: updateStatus
 * @author: zhml
 * @param {type}: djid , sqzt 登记id。申请状态
 * @return:
 * @date 2020/7/1
*/
export const updateStatus = (data: any) => {
  return request({
    url: '/hisapi/mzzydj/updateHosRegStatus',
    method: 'post',
    data,
  })
}
