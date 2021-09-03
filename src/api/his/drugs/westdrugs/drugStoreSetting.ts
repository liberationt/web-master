/*
 * @Date: 2020-05-20 18:58:25
 * @LastEditTime: 2020-09-09 20:05:55
 * @Description: 药库设置
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugStoreSetting.ts
 */ 
import request from '@/utils/request'
  // 新增
  export const addDrugStore= (data: any) => {
    return request({
      url: '/hisapi/drugsyklb/add',
      method: 'post',
      data
    })
  }
  // 修改
  export const editDrugStore = (data: any) => {
    return request({
      url: '/hisapi/drug/storage/setting/save',
      method: 'post',
      data
    })
  }
  // 删除
  export const delDrugStore = (data: any) => {
    return request({
        url: '/hisapi/drugsyklb/delete',
        method: 'post',
        data
      })
  }
