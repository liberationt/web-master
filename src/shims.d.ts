/*
 * @Author: wangyao
 * @LastEditTime: 2021-04-27 21:12:15
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \web-master\src\shims.d.ts
 */
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}

declare module '*.gif' {
  export const gif: any
}
declare module '*.js'

// TODO: remove this part after vue-count-to has its typescript file
declare module 'vue-count-to'

// TODO: remove this part after vuedraggable has its typescript file
declare module 'vuedraggable'

// TODO: remove this part after vue2-dropzone has its typescript file
declare module 'vue2-dropzone'

// TODO: remove this part after vue-image-crop-upload has its typescript file
declare module 'vue-image-crop-upload'

// TODO: remove this part after vue-splitpane has its typescript file
declare module 'vue-splitpane'

declare module 'wl-core'

//解决引用本地js文件
declare module '@/plugins/lodop/index.js'
declare module '@/components/Temperature/util.js'

// Typescript给window对象添加全局变量
interface Window {
  test: string
  openDatabase: any
  ele: any
  flagLodop: boolean
  lodopHTMLData: string
}
