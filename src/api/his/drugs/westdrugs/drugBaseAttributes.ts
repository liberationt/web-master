/*
 * @Date: 2020-07-20 10:53:10
 * @LastEditTime: 2020-07-22 14:14:45
 * @Description: 药品属性
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugBaseAttributes.ts
 */ 

import request from '@/utils/request'

// 药品属性查询
export const queryDrugBaseAttributes= (data: any) => {
    return request({
      url: '/hisapi/drugstypk/detail',
      method: 'post',
      data
    })
  }
  
// 药品属性保存
export const saveDrugBaseAttributes= (data: any) => {
    return request({
      url: '/hisapi/drugstypk/save/base',
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
