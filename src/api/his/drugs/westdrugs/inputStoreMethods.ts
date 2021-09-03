/*
 * @Date: 2020-06-02 20:21:03
 * @LastEditTime: 2020-09-27 16:31:33
 * @Description: 入库方式维护
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\inputStoreMethods.ts
 */ 
import request from '@/utils/request'

// 新增
export const newInputMethod = (data: any) => {
  return request({
    url: '/hisapi/drugsrkfs/add',
    method: 'post',
    data
  })
}

// 校验
export const checkInputMethod = (data: any) => {
  return request({
    url: '/hisapi/out/in/mode/check/name',
    method: 'post',
    data
  })
}


// 修改
export const editInputMethod = (data: any) => {
  return request({
    url: '/hisapi/drugsrkfs/edit',
    method: 'post',
    data
  })
}
// 删除
export const delInputMethod = (data: any) => {
  return request({
    url: '/hisapi/drugsrkfs/delete/',
    method: 'post',
    data
  })
}
