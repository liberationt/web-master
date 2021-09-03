/*
 * @Date: 2020-11-10 17:15:24
 * @LastEditTime: 2021-04-12 18:49:13
 * @Description:
 * @FilePath: \web-master\src\utils\dic.ts
 */
// 语言列表
export const langList = [
  { language: '中文', value: 'zh_CN', menuName: 'menuName' },
  { language: 'English', value: 'en_US', menuName: 'menuName1' },
  { language: 'Español', value: 'es_ES', menuName: 'menuName2' },
  { language: '日本語', value: 'ja_JP', menuName: 'menuName3' },
  // {language: '한국어', value: 'ko_KR', menuName: 'menuName4'},
  { language: 'Монгол', value: 'mn_MN', menuName: 'menuName4' },
]

export const subApps = [
  {
    module: 'web-system',
    defaultRegister: false,
    devEntry: '//localhost:9530/system',
    depEntry: 'http://192.168.102.252:96/system',
    routerBase: '/system',
    data: [],
  },
  {
    module: 'web-im',
    defaultRegister: true,
    devEntry: '//localhost:9532/im',
    depEntry: 'http://192.168.102.252:90/im',
    routerBase: '/im',
    data: [],
  },
  {
    module: 'web-mms',
    defaultRegister: false,
    devEntry: '//localhost:9533',
    depEntry: 'http://192.168.102.252:91/',
    routerBase: '/mms',
    data: [],
  },
  {
    module: 'web-mtdms',
    defaultRegister: false,
    devEntry: '//localhost:9535',
    depEntry: 'http://192.168.102.252:93/',
    routerBase: '/mtdms',
    data: [],
  },
  {
    module: 'web-op',
    defaultRegister: false,
    devEntry: '//localhost:9531',
    depEntry: 'http://192.168.102.252:88/',
    routerBase: '/op',
    data: [],
  },
  {
    module: 'web-mrms',
    defaultRegister: false,
    devEntry: '//localhost:9537',
    depEntry: 'http://192.168.102.252:92/',
    routerBase: '/mrms',
    data: [],
  },
  // {
  //   module: "web-prereview",
  //   defaultRegister: false,
  //   devEntry: "//localhost:9538",
  //   depEntry: "http://192.168.102.252:81/web-prereview",
  //   routerBase: "/prereview",
  //   data: []
  // },
  {
    module: 'web-ybapi',
    defaultRegister: false,
    devEntry: '//localhost:9534',
    depEntry: 'http://192.168.102.252:97/',
    routerBase: '/ybapi',
    data: [],
  },
  {
    module: 'web-drug',
    defaultRegister: false,
    devEntry: '//localhost:9536',
    depEntry: 'http://192.168.102.252:89/',
    routerBase: '/drug',
    data: [],
  },
]
