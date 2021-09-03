/*
 * @Date: 2020-07-24 15:47:14
 * @LastEditTime: 2020-09-10 15:11:17
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\inititalLedger.ts
 */ 
import request from '@/utils/request'

// 查询药库是否已经转账
export const doInitialQuery = (data: any) => {
  return request({
    url: '/hisapi/drugsjzjl/doInitialQuery',
    method: 'post',
    data,
    headers: {
      'Res-Type': 'special'
    }
  })
}

// 查询药库是否已经初始化
export const doDruginitialQuery = (data: any) => {
  return request({
    url: '/hisapi/drug/storage/public/druginitial/query',
    method: 'post',
    data,
    headers: {
      'Res-Type': 'special'
    }
  })
}


// 详情
export const detailInititalLedger = (data: any) => {
    return request({
      url: '/hisapi/drugsypxx/initBookDetail',
      method: 'post',
      data,
    })
  }

  // 详情
export const saveInititalLedger = (data: any) => {
  return request({
    url: '/hisapi/drugsypxx/initBook/add',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

   
