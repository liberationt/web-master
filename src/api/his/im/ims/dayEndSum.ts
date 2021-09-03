import axios from '@/utils/request.ts';

// 查询前的校验
export const doQueryVerification = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doQueryVerification',
		method: 'post',
		data
	});

//产生前的校验
export const doGenerateVerification = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doGenerateVerification',
		method: 'post',
		data
	});
//产生后的校验
export const doGenerateAfterVerification = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doGenerateAfterVerification',
		method: 'post',
		data
	});
//汇总前的校验
export const doCollectVerification = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doCollectVerification',
		method: 'post',
		data
	});
//汇总保存
export const doSaveCollect = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doSaveCollect',
		method: 'post',
		data
	});
//取消汇总前的查询
export const doQueryCancelCollectCommit = () =>
	axios.request({
		url: '/hisapi/zyReport/doQueryCancelCollectCommit',
		method: 'post'
	});
//确定取消汇总
export const doCancelCollectCommit = (data: any) =>
	axios.request({
		url: '/hisapi/zyReport/doCancelCollectCommit',
		method: 'post',
		data
	});
