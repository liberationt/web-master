/*
 * @Date: 2020-07-23 14:44:12
 * @LastEditTime: 2020-07-23 19:31:05
 * @Description: 私有信息-药品调入
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\privateImportInfo.ts
 */ 

import request from "@/utils/request"

export const queryPrivateImportInfo= (data: any) => {
    return request({
      url: '/hisapi/drugstock/callin/page',
      method: 'post',
      data
    })
  }
  // 修改
  export const savePrivateImportInfo = (data: any) => {
    return request({
      url: '/hisapi/drugstock/callin/save',
      method: 'post',
      data,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }