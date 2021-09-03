/*
 * @Date: 2020-08-12 14:01:49
 * @LastEditTime: 2020-09-24 11:24:27
 * @Description: 不合格药品处理
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\unqualifiedDrugs.ts
 */
import request from '@/utils/request'

  // 审核
  export const checkUnqualifiedDrugs= (data: any) => {
    return request({
      url: '/hisapi/drugstycl/check',
      method: 'post',
      data,
    })
  }
  // 修改
  export const editUnqualifiedDrugs = (data: any) => {
    return request({
      url: '/hisapi/drugsjhdw/edit',
      method: 'post',
      data
    })
  }

   //转换不合格药品报损
   export const detailUnqualifiedDrugs = (data: any) => {
    return request({
      url: '/hisapi/drugstycl/revertBsData',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  //转换不合格药品退回
  export const revertThData= (data: any) => {
    return request({
      url: '/hisapi/drugstycl/revertThData',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // 退回公司
  export const saveBack= (data: any) => {
    return request({
      url: '/hisapi/drugstycl/save/back',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  
  // 查询出库方式的报损方式
  export const querySfbs = (data: any) => {
    return request({
      url: '/hisapi/drugstycl/querySfbs',
      method: 'post',
      data
    })
  }
  
  //入库方式查询
  export const queryInputStoreType = (data: any) => {
    return request({
      url: '/hisapi/drug/storage/public/inout/way',
      method: 'post',
      data,
    })
  }

//提交报损
export const saveBsData = (data: any) => {
  return request({
    url: '/hisapi/drugstycl/saveBsData',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
