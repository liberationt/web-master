/*
 * @Author: wangyao
 * @LastEditTime: 2020-08-31 09:49:32
 * @LastEditors: wangyao
 * @Description:
 * @FilePath: \web-master\src\api\cis\op\dctwork\inspect.ts
 */
import request from '@/utils/request';

/**
 * @Description:
 * @author: zhml
 * @param {type}: pid  null 全部数据，pid为父级节点
 * @return: list
 * @date 2020/6/28
*/
export const queryData = (data: any) => {
	return request({
		url: '/hisapi/dicyjlx/loadDicData',
		method: 'post',
		data
	});
};

/**
 * @Description: 查询诊疗项目列表
 * @author: zhml
 * @param {type}: { brxz:'',yjlx:'',pageNum:'',pageSize:'' }
 * @return: list
 * @date 2020/6/29
*/
export const queryZlxmList = (data: any) => {
	return request({
		url: '/hisapi/diczlxm/queryZlxmList',
		method: 'post',
		data
	});
};

/**
 * @Description: 保存门诊检查申请单
 * @author: zhml
 * @param {type}: object
 * @return:
 * @date 2020/6/29
*/
export const saveZlxmList = (data: any) => {
	return request({
		url: '/hisapi/cisjcsq01/saveMzjcSqd',
		method: 'post',
		data,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

//根据id查询jclx
export const getById = (data: any) => {
	return request({
		url: '/hisapi/dicyjlx/getById',
		method: 'post',
		data
	});
};
//根据id查询申请单信息
export const queryEmrZlxmInfo = (data: any) => {
	return request({
		url: '/hisapi/cishzyz/queryDicZlxmInfo',
		method: 'post',
		data
	});
};
