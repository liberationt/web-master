/*
 * @Date: 2020-07-08 10:58:19
 * @LastEditTime: 2020-09-27 16:37:03
 * @Description: 出库方式维护
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\outputStoreMethods.ts
 */ 

import request from '@/utils/request'

// 新增
export const addOutMethod = (data: any) => {
  return request({
    url: '/hisapi/drugsckfs/add',
    method: 'post',
    data
  })
}


// 校验
export const checkOutMethod = (data: any) => {
  return request({
    url: '/hisapi/out/in/mode/check/name',
    method: 'post',
    data
  })
}

// 修改
export const editOutMethod = (data: any) => {
  return request({
    url: '/hisapi/drugsckfs/edit',
    method: 'post',
    data
  })
}
// 删除
export const delOutMethod = (data: any) => {
  return request({
    url: '/hisapi/drugsckfs/delete',
    method: 'post',
    data
  })
}
