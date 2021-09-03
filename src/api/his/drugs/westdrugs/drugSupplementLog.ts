/*
 * @Date: 2020-07-14 19:47:18
 * @LastEditTime: 2020-07-14 20:26:56
 * @Description: 基本药物增补日志
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugSupplementLog.ts
 */ 
import request from '@/utils/request.ts'
  // 药品别名保存
  export const saveDrugSupplementLog= (data: any) => {
    return request({
      url: '/hisapi/drugstypk/logs/save',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
