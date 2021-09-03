/**
 * @author andy
 * @time 2020.10.25
 * @name 无需服务端获取的微应用
 */

const noAuthApps = [
    {
      module: "web-login",
      defaultRegister: true,
      devEntry: "//localhost:9531",
      depEntry: "http://login.mfe.wlui.com.cn/",
      routerBase: "/login",
      data: [
        {
          id: "1",
          title: "login",
          icon: "el-icon-monitor",
          children: [
            {
              id: "1-1",
              path: '/login',
              title: "login",
              url: "/login"
            }
          ]
        }
      ]
    },
  ]
  
  export default noAuthApps;