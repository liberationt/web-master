/*
 * @Date: 2020-05-18 13:59:11
 * @LastEditTime: 2020-09-02 16:21:22
 * @Description: 
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\manufacturer.ts
 */ 
import axios from '@/utils/request.ts'

/**
 * @Description: 分页查询
 * @param {type} params
 * @return:
 */
export const queryManufacturerList = (data: any) =>
  axios.request({
    url: '/hisapi/drugscddz/queryPage',
    method: 'post',
    data
  })
/**
 * @description: 编辑
 * @param {type} 
 * @return: 
 */
export const editManufacturer = (data: any) =>
  axios.request({
    url: '/hisapi/drugscddz/edit',
    method: 'post',
    data
  })

/**
 * @description: 新增
 * @param {type} 
 * @return: 
 */
export const addManufacturer = (data: any) =>
  axios.request({
    url: '/hisapi/drugscddz/add',
    method: 'post',
    data
  })

  /**
 * @description: 删除
 * @param {type} 
 * @return: 
 */
export const deleteManufacturer = (data: any) => 
    axios.request({
        url: `/hisapi/drugscddz/delete`, 
        method: "post",
        data
    });
