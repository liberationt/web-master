/*
 * @Author: 曹俊
 * @LastEditTime: 2020-04-29 10:19:12
 * @LastEditors: 曹俊
 * @Description: 
 * @FilePath: \web-master\src\api\his\op\guidance\clinic\clinic.ts
 */
import axios from '@/utils/request.ts'

// 获取已选择的诊室列表
export const queryChoosed = (data: any) =>
    axios.request({
        url: "/hisapi/opmzzs/queryZsByFwtId",
        method: "post",
        data
    });
 
export const queryToChoose = (data: any) =>
    axios.request({
        url: "/hisapi/opmzzs/queryWaitMs",
        method: "post",
        data
    });

 
export const editChoose = (data: any) =>
    axios.request({
        url: "/hisapi/opmzzs/fwtKsChange",
        method: "post",
        data
    });


export const queryFwtByZsmc = (data: any) =>
    axios.request({
        url: "/hisapi/opmzzs/getFwtIdByZsmc",
        method: "post",
        data
    });

