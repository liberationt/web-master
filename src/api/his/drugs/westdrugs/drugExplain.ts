/*
 * @Date: 2020-07-20 19:44:08
 * @LastEditTime: 2020-07-20 20:03:36
 * @Description: 药品说明
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugExplain.ts
 */ 
import request from '@/utils/request'

// 药品剂型新增
export const queryDrugExplain= (data: any) => {
    return request({
      url: '/hisapi/drugstypk/remark/detail',
      method: 'post',
      data
    })
  }
  // 药品剂型修改
  export const editDrugExplain = (data: any) => {
    return request({
      url: '/hisapi/drugstypk/remark',
      method: 'post',
      data
    })
  }
