import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { AppModule } from '@/store/modules/app'
import router from '@/router/index'
import { getUserIP } from "./getIp"

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000,
})
var count = 0
// Request interceptors
service.interceptors.request.use(
  (config) => {
    config = Object.assign({}, config)
    // if (localStorage.getItem('SET_PN_PARAM')) {
    //   let cc: any = localStorage.getItem('SET_PN_PARAM')
    //   if (cc && cc > 0 && config.data) {
    //     if (typeof (config.data) === 'number') {
    //       (config as any).data = {},
    //         (config as any).data['jzlsh'] = cc
    //     } else if (typeof config.data == 'string' && typeof JSON.parse(config.data) == 'object') {
    //       JSON.parse(config.data)['jzlsh'] = cc
    //     } else {
    //       config.data.jzlsh = cc
    //     }

    //   }
    // }

    if (UserModule.token) {
      config.headers['token'] = UserModule.token
      // config.data['jzlsh'] = pnParam
    }
    if (AppModule.language) {
      config.headers['lang'] = AppModule.language
    }
    const contentType = config.headers['Content-Type']
    config.headers['Content-Type'] = contentType ? contentType : 'application/x-www-form-urlencoded'
    config.headers['REQUEST-IP'] = localStorage.getItem('ipInfo') || ''
    //form提交
    if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
      let ret = ''
      for (let it in config.data) {
        var y = config.data[it]
        if (y === 'null' || y === null || y === '' || typeof y === 'undefined' || (y instanceof Object && Object.keys(y).length == 0)) {
        } else {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&'
        }
      }
      config.data = ret
    }
    //json提交
    if (config.headers['Content-Type'] == 'application/json') {
      for (let it in config.data) {
        var y = config.data[it]
        if (y === 'null' || y === null || y === '' || typeof y === 'undefined' || (y instanceof Object && Object.keys(y).length == 0)) {
          delete config.data[it]
        }
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    if (response.config.headers['Res-Type'] && response.config.headers['Res-Type'] == 'special') {
      return response.data
    } else {
      const res = response.data
      if (res.errorCode !== 'SUCCESS') {
        // if (res.errorCode == 'ERROR_USER_0000') {
        //   if(response.config.headers['Res-Type'] && response.config.headers['Res-Type'] == 'noLoginCheck'){
        //     return 
        //   }else{
        //     MessageBox.confirm('登录已失效，请重新登录', '确定重新登录', {
        //       confirmButtonText: '重新登录',
        //       showCancelButton: false,
        //       showClose: false,
        //       type: 'warning',
        //     }).then(() => {
        //       UserModule.ResetToken()
        //       // location.reload()
        //       router.push('/login').catch((err: any) => {
        //         console.log(err)
        //       })
        //     })
        //   }
        // } else {
        //   Message({
        //     message: res.message || 'Error',
        //     type: 'error',
        //     duration: 2 * 1000,
        //   })
        // }
        if (res.errorCode == 'ERROR_USER_0000') {
          //这段代码不知道谁加的  ---- 田
          if(response.config.headers['Res-Type'] && response.config.headers['Res-Type'] == 'noLoginCheck'){
            return 
          }else{
            //校验只退出一次
            // if(count===0){
              MessageBox.confirm(
                '登录已失效，请重新登录',
                '确定重新登录',
                {
                  confirmButtonText: '重新登录',
                  showCancelButton: false,
                  showClose: false,
                  type: 'warning'
                }
              ).then(() => {
                UserModule.ResetToken()
                location.reload()
              })
            // }
            count++
          }
        }else{
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 2 * 1000
          })
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return response.data
      }
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
