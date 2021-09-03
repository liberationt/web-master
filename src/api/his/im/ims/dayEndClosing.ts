import axios from '@/utils/request.ts';

// 判断本日是否已做过结帐
export const decideTodayIsSettle = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doIsreckon',
		method: 'post',
		data
	});

//取消日报查询
export const doQueryCancelCommit = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doQueryCancelCommit',
		method: 'post',
		data
	});

//查询是否产生业务数据
export const doCreateJzrb = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doCreateJzrb',
		method: 'post',
		data
	});

//取消日报查询
export const doCancelCommit = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doCancelCommit',
		method: 'post',
		data
	});

//结账
export const doSave = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doSaveJzrb',
		method: 'post',
		data
	});

//检验是否可以结账
export const doWfCheck = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doWfCheck',
		method: 'post',
		data
	});
//明细查询前的校验
export const doGenerateVerification = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/checkRecordCount',
		method: 'post',
		data
	});
