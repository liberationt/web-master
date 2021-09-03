/*
 * @Date: 2020-07-14 15:56:24
 * @LastEditTime: 2020-07-14 16:11:49
 * @Description: 药品别名
 * @FilePath: \web-master\src\api\his\drugs\westdrugs\drugAlias.ts
 */ 
import request from '@/utils/request.ts'
export interface AliasItem{
    webSortNumber:number
    bhdm: string | null,
    bmfl: number | null,
    bmxh: number | null,
    jxdm: string | null
    pydm: string|null,
    qtdm: string|null,
    wbdm: string|null,
    ypmc: string|null,
    ypxh: number|null
}
  // 获取拼音码
  export const getMnemonic = (data: any) => {
    return request({
        url: '/system-service/system/public/get/mnemonic',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
  }
  
  // 药品别名保存
  export const saveDrugAlias = (data: any) => {
    return request({
      url: '/hisapi/drugstypk/save/alias',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  
    // 药品别名删除
    export const delDrugAlias = (data: any) => {
      return request({
        url: '/hisapi/drugstypk/drug/alias/delete',
        method: 'post',
        data
      })
    }
