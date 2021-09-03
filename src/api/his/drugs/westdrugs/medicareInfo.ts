/*
 * @Date: 2020-07-17 14:12:31
 * @LastEditTime: 2020-09-09 17:30:56
 * @Description: 药品价格-医保信息
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\medicareInfo.ts
 */ 
import request from '@/utils/request.ts'

 // 医保信息查询
 export const queryMedicareInfo= (data: any) => {
  return request({
    url: '/hisapi/drug/public/info/query/ybyp/list',
    method: 'post',
    data
  })
}
 // 医保信息保存
 export const saveMedicareInfo= (data: any) => {
    return request({
      url: '/hisapi/drug/public/info/save',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
    // 医保信息删除
    export const delMedicareInfo = (data: any) => {
      return request({
        url: '/hisapi/drug/public/info/delete',
        method: 'post',
        data
      })
    }
    
