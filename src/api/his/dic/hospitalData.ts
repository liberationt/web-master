import axios from '@/utils/request.ts'
// 医院数据设置

//医院数据列表
export const aDataList = (data:any) => {
	return axios.request({
		url: "/hisapi/hspbasicdata/findList",
        method: "post",
        data
	})
}

// 右侧数据列表子节点
export const aDataList2 = (data:any) => {
	return axios.request({
		url: "/hisapi/hspbasicdatavalue/queryNoPage",
        method: "post",
        data
	})
}

// 新增数据
export const aDataAdd = (data:any) => {
	return axios.request({
		url: "/hisapi/hspbasicdatavalue/add",
        method: "post",
        data
	})
}

// 修改数据
export const aDataEdit = (data:any) => {
	return axios.request({
		url: "/hisapi/hspbasicdatavalue/edit",
        method: "post",
        data
	})
}

// 停用数据
export const aDataStop = (data:any) => {
	return axios.request({
		url: "/hisapi/hspbasicdatavalue/discontinue",
        method: "post",
        data
	})
}

// 启用数据
export const aDataOpen = (data:any) => {
	return axios.request({
		url: "/hisapi/hspbasicdatavalue/enable",
        method: "post",
        data
	})
};
