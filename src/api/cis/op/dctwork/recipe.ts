import axios from '@/utils/request.ts'

export interface IRecipeForm {
  bzmc: string,
  bzxx: string,
  cfsb: number | null,
  cfts: number | null,
  dcypjxzts: number | null,
  dcypjxzzs: number | null,
  fphm: string,
  fygb: number | null,
  gmywlb: number | null,
  gytj: number | null | string,
  hjje: number | null,
  jf: number | null,
  jldw: string,
  jylx: number | null,
  kpdy: number | null,
  ksbz: number | null,
  mrcs: number | null,
  psjg: string,
  pspb: number | null,
  sfjg: number | null,
  sqys: string,
  syyy: string,
  tsyp: number | null,
  type: number | null,
  xdzfjbz: string,
  ycjl: number | null,
  ycyl: number | null,
  yfbz: number | null,
  yfdw: string,
  yfgg: string,
  ypcd: number | null,
  ypdc: number | null,
  ypdj: number | null,
  ypjl: number | null,
  ypjxz: number | null,
  ypmc: string,
  ypmrz: number | null,
  ypsl: number | null,
  ypxh: number | null,
  ypyf: string,
  ypzh: number | null,
  ypzs: number | null,
  yqsy: number | null,
  ysycjl: string,
  yybs: number | null,
  yyts: number | null,
  zby: number | null,
  zfbl: number | null,
  zfpb: number | null,
  zfyp: number | null
}

export interface ISvaeObj {
  // webSortNumber: number | null,
  zfyp: number,
  bzxx: string,
  djzt: number | null,
  dzbl: number | null,
  fygb: number | null,
  fymc: string,
  hjje: number | null,
  jlbs: number | null, // 几倍剂量
  gytj: number | string | null, // 用法
  ypyf: number | string, // 频次
  mrcs: number , // 每日次数
  ypdj: number | string,
  jgid: number | null,
  jlsl: number | null,
  jlxh: number | null,
  mzxh: number | null,
  opStatus: string,
  psjg: string,
  pageNum: number | null,
  pageSize: number | null,
  sbxh: number | null,
  spbh: number | null,
  sqdh: number | null,
  xflsh: string,
  xmlx: number | null,
  yjxh: number | null,
  yjzh: number | null,
  yjzx: number | null,
  yldj: number | null,
  ylsl: number | null,
  ylxh: number | null,
  ypzh: number | null,
  yxms: number | null,
  yyts: number | null,
  zfbl: number | null,
  zfpb: number | null,
  zhje: number | null,
  zkbl: number | null,
  zkje: number | null,
  ztbh: number | null,
  ztbz: number | null,
  ztyzsbxh: number | null,
  zxpb: number | null
}


/**
 * @Description:  查询明细
 * @author: zhml
 * @param {type}:
 * @return:
 * @date 2020/7/1
 */
export const queryDetail = (data: any) =>
  axios.request({
    url: '/hisapi/opcf01/findDetails',
    method: 'post',
    data
  })

/**
 * @Description: 查询处方列表
 * @author: zhml
 * @param {type}:
 * @return:
 * @date 2020/7/1
 */
export const queryData = (data: any) =>
  axios.request({
    url: '/hisapi/opcf01/findList',
    method: 'post',
    data
  })

/**
 * @Description: 保存处方
 * @author: zhml
 * @param {type}:
 * @return:
 * @date 2020/7/1
 */
export const saveCf01 = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/save',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })

/**
 * @Description: 获取费用自付比例
 * @author: zhml
 * @param {type}: { brxz：'',fygb: '',fyxh: '',type:'' }
 * @return:
 * @date 2020/7/2
 */
export const getPayProp = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/getPayProportion',
    method: 'post',
    data
  })

/**
 * @Description: 查询处方列表
 * @author: zhml
 * @param {type}:
 * @return: cfsb
 * @date 2020/7/9
*/
export const findList = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/findList',
    method: 'post',
    data
  })

/**
 * @Description: 查询复制处方列表
 * @author: zhml
 * @param {type}:
 * @return: cfsb
 * @date 2020/7/9
 */
export const findListNoJzlsh = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/findListNoJzlsh',
    method: 'post',
    data
  })
/**
 * @Description: 检验处方复制信息
 * @author: zhml
 * @param {type}:
 * @return:
 * @date 2020/7/21
*/
export const checkCopyInfo = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/perscriptionCopyCheck',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })


export const checkDetailInfo = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/checkInventory',
    method: 'post',
    data
  })


/**
 * @Description: 查询明细
 * @author: zhml
 * @param {type}: cfsb
 * @return:
 * @date 2020/7/9
*/
export const findDetails = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/findDetails',
    method: 'post',
    data
  })

/**
 * @Description: 处方首页  载入附加项目
 * @author: zhml
 * @param {type}:
 * @return:
 * @date 2020/7/22
*/
export const findAddition = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/loadAddition',
    method: 'post',
    data
  })



/**
 * @Description:  根据组套载入组套明细信息
 * @author: zhml
 * @param {type}:
 * @return:
 * @date 2020/7/16
*/
export const loadPersonalSet = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/loadPersonalSet',
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })

/**
 * @Description: 根据药品序号获取药品信息（助手方式）
 * @author: zhml
 * @param {type}:
 * @return:
 * @date 2020/7/16
*/
export const loadMedcineInfo = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/loadMedcineInfo',
    method: 'post',
    data
  })


export const removeMedcineInfo = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/removeClinicInfo',
    method: 'post',
    data
  })


/**
 * @Description: 获取公共参数
 * @author: zhml
 * @param {type}: commons :['HLYYIP', 'SFQYHLYY', 'ZYKS']
 * @return: data
 * @date 2020/7/29
*/
export const getPubParams = (data: any) =>
  axios.request({
    url: '/system-service/system/public/get/params',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })


// 查询上级病人性质
export const querySjBrxz = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/querySjBrxz',
    method: 'post',
    data
  })

// 获取皮试历史信息
export const getSkinTest = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/getSkinTest',
    method: 'post',
    data
  })



// 获取医生权限
export const getDoctPersimmion = (data: any) =>
  axios.request({
    url: '/hisapi/mzcf/loadOutClinicInitParams',
    method: 'post',
    data
  })




// 打印发票
export const PrintRecipe = (data: any) => {
  return axios.request({
    url: '/hisapi/mzcf/cfPrint',
    method: 'post',
    data,
    headers: {
      // 'Res-Type': 'special'
    }
  })
}
