/*
 * @Date: 2020-07-23 10:30:02
 * @LastEditTime: 2020-07-23 10:38:00
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\privateDrugLimit.ts
 */ 
import request from "@/utils/request"

export const queryDrugLimit= (data: any) => {
    return request({
      url: '/hisapi/drugstock/drug/stint',
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
