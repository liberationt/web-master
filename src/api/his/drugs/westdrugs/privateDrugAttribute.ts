/*
 * @Date: 2020-07-23 10:16:07
 * @LastEditTime: 2020-07-23 10:18:54
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\privateDrugAttribute.ts
 */ 
import request from '@/utils/request'

// 药品属性查询
export const queryDrugBaseAttributes= (data: any) => {
    return request({
      url: '/hisapi/drugstock/detail',
      method: 'post',
      data
    })
  }
  
// 药品属性保存
export const saveDrugBaseAttributes= (data: any) => {
    return request({
      url: '/hisapi/drugstock/edit',
      method: 'post',
      data
    })
  }

 // 药品类型查询
export const queryDrugClasses= (data: any) => {
  return request({
    url: '/hisapi/drugsbmzd/queryAllPages',
    method: 'post',
    data
  })
} 
