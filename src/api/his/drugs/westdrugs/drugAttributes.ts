/*
 * @Date: 2020-07-06 10:54:01
 * @LastEditTime: 2020-09-11 14:54:24
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugAttributes.ts
 */ 
import request from '@/utils/request'

// 药品剂型新增
export const addDosageForm= (data: any) => {
    return request({
      url: '/hisapi/drugsypsx/add',
      method: 'post',
      data
    })
  }
  // 药品剂型修改
  export const editDosageForm = (data: any) => {
    return request({
      url: '/hisapi/drugsypsx/edit',
      method: 'post',
      data
    })
  }
  // 药品剂型删除
  export const delDosageForm = (data: any) => {
    return request({
      url: '/hisapi/drugsypsx/delete',
      method: 'post',
      data
    })
  }

 // 药品剂型校验重复
 export const checkDosageForm = (data: any) => {
  return request({
    url: '/hisapi/drug/property/maintenance/check/name/repeat/ypsx',
    method: 'post',
    data
  })
}

  // 发药方式新增
export const addsendDrugMethod= (data: any) => {
  return request({
    url: '/hisapi/imfyfs/add',
    method: 'post',
    data
  })
}
// 发药方式修改
export const editsendDrugMethod = (data: any) => {
  return request({
    url: '/hisapi/imfyfs/edit',
    method: 'post',
    data
  })
}
// 发药方式删除
export const delsendDrugMethod = (data: any) => {
  return request({
    url: '/hisapi/imfyfs/delete',
    method: 'post',
    data
  })
}

// 发药方式校验重复
export const checkSendDrugMethod = (data: any) => {
  return request({
    url: '/hisapi/drug/property/maintenance/check/name/repeat/fyfs',
    method: 'post',
    data
  })
}
