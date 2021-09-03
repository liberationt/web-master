/*
 * @Date: 2020-07-08 16:14:41
 * @LastEditTime: 2020-07-13 10:49:20
 * @Description: 进口药特殊限制
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\importedDrugLimit.ts
 */ 
import request from '@/utils/request'



// 保存
export const addImportedDrugLimit = (data: any) => {
  return request({
    url: '/hisapi/opypxz/drug/add',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 删除
export const delImportedDrugLimit = (data: any) => {
  return request({
    url: '/hisapi/opypxz/drug/delete',
    method: 'post',
    data
  })
}

// 查询右侧列表
export const queryLimitRightListData = (data: any) => {
    return request({
      url: '/hisapi/opypxz/drug/limit',
      method: 'post',
      data
    })
  }
