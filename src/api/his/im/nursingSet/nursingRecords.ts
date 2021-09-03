/*
 * @Author: wangyao
 * @LastEditTime: 2020-09-14 10:30:32
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\nursingSet\nursingRecords.ts
 */

import request from '@/utils/request'

// 查询护理记录
export const queryHzmbTree = (data: any) => {
    return request({
        url: '/hisapi/nishzmb/queryHzmbTree',
        method: 'post',
        data
    })
}
// 保存护理记录
export const saveHzmb = (data: any) => {
    return request({
        url: '/hisapi/nishzmb/saveHzmb',
        method: 'post',
        data,
        // headers: {
        //     "Content-Type": "application/json"
        // }
    })
}
// 一般护理记录
    // 查询
    export const queryHljlByDate = (data: any) => {
        return request({
            url: '/hisapi/nishljl/queryHljlByDate',
            method: 'post',
            data,
        })
    }
    // 保存
    export const saveHljl = (data: any) => {
        return request({
            url: '/hisapi/nishljl/saveHljl',
            method: 'post',
            data,
        })
    }
    // 删除
    export const deleteByJlxh = (data: any) => {
        return request({
            url: '/hisapi/nishljl/deleteByJlxh',
            method: 'post',
            data,
        })
}
    // 打印护理记录 表头
    export const nursingPrintColumnHead = (data: any) => {
        return request({
            url: '/hisapi/nishljl/nursingPrintColumnHead',
            method: 'post',
            data
        })
    }
    // 打印护理记录
    export const nursingPrint = (data: any) => {
        return request({
            url: '/hisapi/nishljl/nursingPrint',
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

// 危重护理记录
    // 查询
    export const queryNisWzhldByDate = (data: any) => {
        return request({
            url: '/hisapi/niswzhld/queryNisWzhldByDate',
            method: 'post',
            data,
        })
    }
    // 保存
    export const saveNisWzhld = (data: any) => {
        return request({
            url: '/hisapi/niswzhld/saveNisWzhld',
            method: 'post',
            data,
        })
    }
    // 删除
    export const deleteNisWzhldByJlxh = (data: any) => {
        return request({
            url: '/hisapi/niswzhld/deleteNisWzhldByJlxh',
            method: 'post',
            data,
        })
    }
    // 打印护理记录 表头
    export const criticalCareRecordsPrintColumnHead = (data: any) => {
        return request({
            url: '/hisapi/niswzhld/criticalCareRecordsPrintColumnHead',
            method: 'post',
            data
        })
    }
    // 打印护理记录
    export const criticalCareRecordsPrint = (data: any) => {
        return request({
            url: '/hisapi/niswzhld/criticalCareRecordsPrint',
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
// 患者病情预警评估单
    // 查询
    export const queryBqyjpgdByDate = (data: any) => {
        return request({
            url: '/hisapi/nisbqyjpgd/queryBqyjpgdByDate',
            method: 'post',
            data,
        })
    }
    // 保存
    export const saveBqyjpgd = (data: any) => {
        return request({
            url: '/hisapi/nisbqyjpgd/saveBqyjpgd',
            method: 'post',
            data,
        })
    }
    // 删除
    export const deleteBqyjpgdByJlxh = (data: any) => {
        return request({
            url: '/hisapi/nisbqyjpgd/deleteBqyjpgdByJlxh',
            method: 'post',
            data,
        })
    }
    // 打印护理记录 表头
    export const patientConditionWarningColumnHead = (data: any) => {
        return request({
            url: '/hisapi/nisbqyjpgd/patientConditionWarningColumnHead',
            method: 'post',
            data
        })
    }
    // 打印护理记录
    export const patientConditionWarningPrint = (data: any) => {
        return request({
            url: '/hisapi/nisbqyjpgd/patientConditionWarningPrint',
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
// barthelRecord指数评定量表
    // 查询
    export const queryZspdlByDate = (data: any) => {
        return request({
            url: '/hisapi/niszspdl/queryZspdlByDate',
            method: 'post',
            data,
        })
    }
    // 保存
    export const saveZspdld = (data: any) => {
        return request({
            url: '/hisapi/niszspdl/saveZspdl',
            method: 'post',
            data,
        })
    }
    // 删除
    export const deleteZspdlByJlxh = (data: any) => {
        return request({
            url: '/hisapi/niszspdl/deleteZspdlByJlxh',
            method: 'post',
            data,
        })
    }
    // 打印护理记录 表头
    export const indexRatingScaleColumnHead = (data: any) => {
        return request({
            url: '/hisapi/niszspdl/indexRatingScaleColumnHead',
            method: 'post',
            data
        })
    }
    // 打印护理记录
    export const indexRatingScalePrint = (data: any) => {
        return request({
            url: '/hisapi/niszspdl/indexRatingScalePrint',
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

// 产前护理记录单
    // 查询
    export const queryCqhldByDate = (data: any) => {
        return request({
            url: '/hisapi/niscqhld/queryCqhldByDate',
            method: 'post',
            data,
        })
    }
    // 保存
    export const saveCqhld = (data: any) => {
        return request({
            url: '/hisapi/niscqhld/saveCqhld',
            method: 'post',
            data,
        })
    }
    // 删除
    export const deleteCqhldByJlxh = (data: any) => {
        return request({
            url: '/hisapi/niscqhld/deleteCqhldByJlxh',
            method: 'post',
            data,
        })
    }
    // 打印护理记录 表头
    export const prenatalCareRecordColumnHead = (data: any) => {
        return request({
            url: '/hisapi/niscqhld/prenatalCareRecordColumnHead',
            method: 'post',
            data
        })
    }
    // 打印护理记录
    export const prenatalCareRecordPrint = (data: any) => {
        return request({
            url: '/hisapi/niscqhld/prenatalCareRecordPrint',
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
// 产后护理记录单
    // 查询
    export const queryChhldByDate = (data: any) => {
        return request({
            url: '/hisapi/nischhld/queryChhldByDate',
            method: 'post',
            data,
        })
    }
    // 保存
    export const saveChhld = (data: any) => {
        return request({
            url: '/hisapi/nischhld/saveChhld',
            method: 'post',
            data,
        })
    }
    // 删除
    export const deleteChhldByJlxh = (data: any) => {
        return request({
            url: '/hisapi/nischhld/deleteChhldByJlxh',
            method: 'post',
            data,
        })
    }
    // 打印护理记录 表头
    export const postpartumNursingRecordColumnHead = (data: any) => {
        return request({
            url: '/hisapi/nischhld/postpartumNursingRecordColumnHead',
            method: 'post',
            data
        })
    }
    // 打印护理记录
    export const postpartumNursingRecordPrint = (data: any) => {
        return request({
            url: '/hisapi/nischhld/postpartumNursingRecordPrint',
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
// 住院患者压疮危险因素评估表
    // 查询
    export const queryYcwxpgbByDate = (data: any) => {
        return request({
            url: '/hisapi/nisycwxpgb/queryYcwxpgbByDate',
            method: 'post',
            data,
        })
    }
    // 保存
    export const saveYcwxpgb = (data: any) => {
        return request({
            url: '/hisapi/nisycwxpgb/saveYcwxpgb',
            method: 'post',
            data,
        })
    }
    // 删除
    export const deleteYcwxpgbByJlxh = (data: any) => {
        return request({
            url: '/hisapi/nisycwxpgb/deleteYcwxpgbByJlxh',
            method: 'post',
            data,
        })
    }
    // 打印护理记录 表头
    export const riskFactorsColumnHead = (data: any) => {
        return request({
            url: '/hisapi/nisycwxpgb/riskFactorsColumnHead',
            method: 'post',
            data
        })
    }
    // 打印护理记录
    export const riskFactorsPrint = (data: any) => {
        return request({
            url: '/hisapi/nisycwxpgb/riskFactorsPrint',
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
// 医院获得性肺炎风险因素评估单
    // 查询
    export const queryFyfxpgdByDate = (data: any) => {
        return request({
            url: '/hisapi/nisfyfxpgd/queryFyfxpgdByDate',
            method: 'post',
            data,
        })
    }
    // 保存
    export const saveFyfxpgd = (data: any) => {
        return request({
            url: '/hisapi/nisfyfxpgd/saveFyfxpgd',
            method: 'post',
            data,
        })
    }
    // 删除
    export const deleteFyfxpgdByJlxh = (data: any) => {
        return request({
            url: '/hisapi/nisfyfxpgd/deleteFyfxpgdByJlxh',
            method: 'post',
            data,
        })
    }
    // 打印护理记录 表头
    export const acquiredPneumoniaColumnHead = (data: any) => {
        return request({
            url: '/hisapi/nisfyfxpgd/acquiredPneumoniaColumnHead',
            method: 'post',
            data
        })
    }
    // 打印护理记录
    export const acquiredPneumoniaPrint = (data: any) => {
        return request({
            url: '/hisapi/nisfyfxpgd/acquiredPneumoniaPrint',
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }