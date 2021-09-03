/*
 * @Date: 2020-06-02 20:21:03
 * @LastEditTime: 2020-07-06 10:54:34
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\medicalInsuranceDrug.ts
 */ 
import request from '@/utils/request'

// 新增
export const newMedicalInsuranceDrug = (data: any) => {
  return request({
    url: '/hisapi/ybdzypxx/add',
    method: 'post',
    data
  })
}
// 修改
export const editMedicalInsuranceDrug = (data: any) => {
  return request({
    url: '/hisapi/ybdzypxx/edit',
    method: 'post',
    data
  })
}
// 删除
export const delMedicalInsuranceDrug = (data: any) => {
  return request({
    url: '/hisapi/ybdzypxx/delete',
    method: 'post',
    data
  })
}
