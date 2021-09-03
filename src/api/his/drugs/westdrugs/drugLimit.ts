/*
 * @Date: 2020-07-14 18:45:30
 * @LastEditTime: 2020-08-12 19:14:03
 * @Description: 药品限制
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugLimit.ts
 */ 
import request from "@/utils/request"

export const queryDrugLimit= (data: any) => {
    return request({
      url: '/hisapi/drugstypk/drug/stint',
      method: 'post',
      data
    })
  }

  export const queryCostLimit= (data: any) => {
    return request({
      url: '/hisapi/dicsfxmlb/queryCostLimit',
      method: 'post',
      data
    })
  }
  // 修改
  export const editDrugLimit = (data: any) => {
    return request({
      url: '/hisapi/drugstypk/drug/stint/save',
      method: 'post',
      data,
      headers: {
        "Content-Type": "application/json"
    }
    })
  }
