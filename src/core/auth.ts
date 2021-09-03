/*
 * @Author: your name
 * @Date: 2020-11-22 19:40:55
 * @LastEditTime: 2021-01-11 14:03:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \web-master\src\core\auth.ts
 */
import store from "../store";
import { DataType } from "wl-core"
/**
* @name 导入获取本地身份token函数
*/
// import { getStorageToken } from "@/utils/user-vali"
import { UserModule } from '@/store/modules/user'
/**
 * @name 导入接口获取子应用注册表接口
 */
// import { getAppConfigsApi } from "@/api/app-configs"
/**
 * @name 导入消息组件
 */
import { wlMessage } from '@/plugins/element';
/**
 * @name 导入qiankun注册微应用方法
 */
import qianKunStart from "./app-register"
/**
 * @name 导入无需服务端获取的微应用
 */
import noAuthApps from "./app-config"

/**
 * @name 请求获取服务端子应用注册表
 */

/**
 * @name 启用qiankun微前端应用，已启动过用手动加载，未启动过正常注册
 */
import { subApps } from '@/utils/dic'
import { getAllSystem,findListSystem } from '@/api/users'

const  getAppConfigs = () => {
  let subApps  = <any>[]
   findListSystem().then((res:any)=>{
    if (res.errorCode== "SUCCESS") {
      // debugger
      console.log(res.data)
      subApps  =  res.data
      getAllSystem().then(res => {
        if (res.data) {
          res.data.forEach((item: any) => {
            subApps.forEach((iitem: any) => {
              if (item.systemName == iitem.module) {
                let nindex = 0
                item.menuList.forEach((ele: any, i: number) => {
                  if (ele.menuUrl == null) {
                    nindex = i
                  } else {
                    ele.routeName = iitem.routerBase + "/" + ele.routeName
                    ele.menuUrl = iitem.routerBase + "/" + ele.menuUrl
                  }
    
                });
                item.menuList.splice(nindex, 1)
                if (iitem.data.length <= 0) {
                  iitem.data = item.menuList
                }
    
              }
            })
          });
          let newList = subApps.filter((v: any) => { return v.data && v.data.length > 0 })
          qianKunStart(newList)
        }
      })
    }
  })
}

/**
 * @name 验证用户身份并注册微应用
 */
const microAppStart = () => {
  // debugger
  const token = UserModule.token;
  /**
   * @name 已登录状态获取服务端微应用注册表
   */
  if (token) {
    // 处理token状态共享
    // store.dispatch('app/setToken', token);
    getAppConfigs();
    return;
  }
  /**
   * @name 默认加载未登录时无需服务端获取的微应用
   */
  // qianKunStart(noAuthApps)
}

export default microAppStart