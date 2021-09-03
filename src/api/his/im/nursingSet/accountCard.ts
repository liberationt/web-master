/*
 * @Author: wangyao
 * @LastEditTime: 2020-06-29 14:12:57
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\his\im\nursingSet\accountCard.ts
 */
import axios from '@/utils/request.ts';
// 帐卡-费用帐卡(缴费记录)
export const queryCardPatientCostRecord = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/queryCardPatientCostRecord',
		method: 'post',
		data
		// headers: {
		//     "Content-Type": "application/json"
		// }
	});
};
// 帐卡-费用帐卡(查询病人帐卡信息)
export const queryCardPatientInfo = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/queryCardPatientInfo',
		method: 'post',
		data
	});
};
// 帐卡-费用帐卡(帐卡费用列表)
export const queryCardPatientCostInfoList = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/queryCardPatientCostInfoList',
		method: 'post',
		data
	});
};
// 帐卡-明细项目(按日期)
export const patientBalanceAccountsDetailDate = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/patientBalanceAccountsDetailDate',
		method: 'post',
		data
	});
};
// 帐卡-明细项目(按明细)
export const patientBalanceAccountsDetailMx = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/patientBalanceAccountsDetailMx',
		method: 'post',
		data
	});
};
// 帐卡-费用帐卡(费用清单-明细格式)
export const queryCardPatientCostDetail = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/queryCardPatientCostDetail',
		method: 'post',
		data
	});
};

// 帐卡-费用帐卡(费用清单-病人费用统计信息)
export const queryCardPatientCostBaseInfo = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/queryCardPatientCostBaseInfo',
		method: 'post',
		data
	});
};

// 病人管理form回填
export const doLoadBrxx = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/doLoadBrxx',
		method: 'post',
		data
	});
};

// 病人管理-病人注销
export const doDelBrry = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/doDelBrry',
		method: 'post',
		data
	});
};

// 病人管理-转换(病人性质转换)
export const doUpdateTransform = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/doUpdateTransform',
		method: 'post',
		data
	});
};

// 病人管理-病人入院信息修改
export const doUpdateBrry = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/doUpdateBrry',
		method: 'post',
		data,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

//批量修改折扣
export const plxgzk = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/updateZkbl',
		method: 'post',
		data,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

//查询住院天数
export const queryZyts = (data: any) => {
	return axios({
		url: '/hisapi/patientManage/queryZyts',
		method: 'post',
		data
	});
};
