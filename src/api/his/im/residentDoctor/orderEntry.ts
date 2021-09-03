/*
 * @Author: wangyao
 * @LastEditTime: 2020-09-25 09:32:47
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\residentDoctor\orderEntry.ts
 */
import request from '@/utils/request'

// 患者信息保存
export const savePatientInfo = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/savePatientInfo',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// 病区病人管理病人基本信息和交款信息
export const queryPatientVisitInfo = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/queryPatientVisitInfo',
        method: 'post',
        data
    })
}
// 查询当前科室全部在院病人
export const loadPatientInfo = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/loadPatientInfo',
        method: 'post',
        data
    })
}

// 医嘱录入 保存
export const saveWardPatientInfo = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/saveWardPatientInfo',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 医嘱录入 查询
export const queryWardOrderList = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/queryWardOrderList',
        method: 'post',
        data
    })
}
// 医嘱录入 提交
export const saveDocSubmit = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/saveDocSubmit',
        method: 'post',
        data
    })
}
// 医嘱录入 取消提交
export const cancelYz = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/cancelYz',
        method: 'post',
        data
    })
}
// 医嘱录入 取消医嘱停嘱
export const updateAdviceStatus = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/updateAdviceStatus',
        method: 'post',
        data
    })
}
// 医嘱录入 病人管理医嘱作废或取消作废
export const saveYzzf = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/saveYzzf',
        method: 'post',
        data
    })
}
// 医嘱录入 病人管理取消已执行医嘱
export const yjIsPay = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/yjIsPay',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 医嘱录入 病人管理查询已执行医嘱
export const queryZtmx2 = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/queryZtmx2',
        method: 'post',
        data
    })
}
// 医嘱录入 病人管理自备药停嘱
export const zbyZx = (data: any) => {
    return request({
        url: '/hisapi/imhzrybydctwork/zbyZx',
        method: 'post',
        data
    })
}

// 医嘱录入 检验急诊或出院带药药房是否存在
export const queryJzyfsz = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryJzyfsz',
        method: 'post',
        data
    })
}
// 检查申请 住院检查申请保存
export const saveZySqd = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/saveZySqd',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 校验是否有足够药品库存
export const checkInventory = (data: any) => {
    return request({
        url: '/hisapi/mzcf/checkInventory',
        method: 'post',
        data
    })
}

// 获取系统参数
export const getParams = (data: any) => {
    return request({
        url: '/system-service/system/public/get/params',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 获取当天最大药品使用量
export const loadAmqcCount = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/loadAmqcCount',
        method: 'post',
        data
    })
}
// 获取全部药房
export const getAllYfs = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/getAllYfs',
        method: 'post',
        data
    })
}
// 全部复核（护士站）
export const saveReview = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveReview',
        method: 'post',
        data
    })
}
// 单组复核（护士站）
export const saveAreview = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveAreview',
        method: 'post',
        data
    })
}
// 取消复核（护士站）
export const saveUnReview = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveUnReview',
        method: 'post',
        data
    })
}
// 退回（护士站）
export const saveGoback = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveGoback',
        method: 'post',
        data
    })
}
// 检验医生最近是否重整过医嘱
export const checkYscz = (data: any) => {
    return request({
        url: '/hisapi/nursework/checkYscz',
        method: 'post',
        data
    })
}
// 根据打印序号更新重整护士
export const updateCzhs = (data: any) => {
    return request({
        url: '/hisapi/nursework/updateCzhs',
        method: 'post',
        data
    })
}
// 获取医嘱待提交列表（护士站）
export const getDoctorAdviceSubmitQuery = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/getDoctorAdviceSubmitQuery',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 提交医嘱校验库存（护士站）
export const checkInventoryInpatientPharmacy = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/checkInventoryInpatientPharmacy',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 提交医嘱确认提交（护士站）
export const saveDoctorAdviceSubmit = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/saveDoctorAdviceSubmit',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// 药品医嘱提交查询前间隔天数校验
export const doctorAdviceQueryVerification = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/doctorAdviceQueryVerification',
        method: 'post',
        data
    })
}
// 查询项目复核数量
export const queryFhsfxm = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryFhsfxm',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 查询病人需执行的医嘱明细列表
export const detailChargeQuery = (data: any) => {
    return request({
        url: '/hisapi/nursework/detailChargeQuery',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 查询病人需执行的医嘱  组套明细
export const queryZtmx = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryZtmx',
        method: 'post',
        data
    })
}
// 验证病区是否开启物品计费标志并判断是否存在二级库房
export const verificationWpjfbz = (data: any) => {
    return request({
        url: '/hisapi/nursework/verificationWpjfbz',
        method: 'post',
        data
    })
}
// 费用医嘱附加计价单查询
export const additionProjectsFeeQuery = (data: any) => {
    return request({
        url: '/hisapi/nursework/additionProjectsFeeQuery',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 护士医嘱执行确认
export const saveConfirm = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveConfirm',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 医嘱复核或停止复核
export const saveBatchReview = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveBatchReview',
        method: 'post',
        data
    })
}
// 查询可转床位-分页
export const queryTransferableBeds = (data: any) => {
    return request({
        url: '/hisapi/nursework/queryTransferableBeds',
        method: 'post',
        data
    })
}
// 能否出院
export const canLeaveHospital = (data: any) => {
    return request({
        url: '/hisapi/nursework/canLeaveHospital',
        method: 'post',
        data
    })
}

// 查询是否存在费用明细
export const tzcfYjfyCheck = (data: any) => {
    return request({
        url: '/hisapi/nursework/tzcfYjfyCheck',
        method: 'post',
        data
    })
}
// 出院通知确认
export const saveLeaveHospital = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveLeaveHospital',
        method: 'post',
        data
    })
}
// 出院通知取消
export const saveCancelLeaveHospital = (data: any) => {
    return request({
        url: '/hisapi/nursework/saveCancelLeaveHospital',
        method: 'post',
        data
    })
}

// 床位管理-退床处理
export const zyglCwszTc = (data: any) => {
    return request({
        url: '/hisapi/bedManage/zyglCwszTc',
        method: 'post',
        data
    })
}
// 检验申请保存
export const saveZyJySqd = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/saveZyJySqd',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 当前tabs附加项目查询 lsyz 0长 1临
export const queryAdditionalAdvice = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/queryAdditionalAdvice',
        method: 'post',
        data
    })
}
// 附加项目录入时查询
export const loadAppendAdvice = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/loadAppendAdvice',
        method: 'post',
        data
    })
}
// 皮试结果
export const updateSkinTest = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/updateSkinTest',
        method: 'post',
        data
    })
}
// 手术申请详情
export const querySssqInfo = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/querySssqInfo',
        method: 'post',
        data
    })
}

// 手术申请保存
export const handleSave = (data: any) => {
    return request({
        url: '/hisapi/optsssq/saveSssq',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 使用理由保存
export const updateAntibioticsStatus = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/updateAntibioticsStatus',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// 校验用户名密码
export const checkAntimicrobialRights = (data: any) => {
    return request({
        url: '/hisapi/cishzyz/checkAntimicrobialRights',
        method: 'post',
        data
    })
}

// 保存抗菌药申请单
export const saveAntibiotics = (data: any) => {
    return request({
        url: '/hisapi/amqckjywsysq/saveAntibiotics',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}


