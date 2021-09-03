/*
 * @Date: 2020-07-27 14:00:00
 * @LastEditTime: 2020-07-27 21:49:41
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\initialTransfer.ts
 */ 
import request from '@/utils/request'

// 执行转账
export const doInitTransfer= (data: any) => {
  return request({
    url: '/hisapi/drugsypxx/initTransfer/transfer',
    method: 'post',
    data,
  })
}
