// Set utils function parseTime to filter
export { parseTime } from '@/utils';

// Filter for article status
export const articleStatusFilter = (status: string) => {
	const statusMap: { [key: string]: string } = {
		published: 'success',
		draft: 'info',
		deleted: 'danger'
	};
	return statusMap[status];
};

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @LastEditors: zhml
 * @Description: 将数字转换为两位小数
 * @param {type} string
 * @return: string.xx
 */
export const makeTwoPoints = (num: string) => {
	var re = /^[0-9]+$/;
	var re2 = /^[0-9]+(\.[0-9]{1})$/;
	if (re.test(num)) {
		num += '.00';
	}
	if (re2.test(num)) {
		num += '0';
	}
	return num;
};
/**
 * @LastEditors: zhml
 * @Description: 根据value的值，回显不同的值 西药，中药，草药，项目
 * @param {type} params
 * @return:
 */
export const filterSuiteType = (value: string | number) => {
	switch (value) {
		case 1:
			return '西药';
		case 2:
			return '中药';
		case 3:
			return '草药';
		case 4:
			return '项目';
	}
};

export const filterStatus = (value: string | number) => {
	switch (value) {
		case 0:
			return '已停用';
		case 1:
			return '已启用';
		case null:
			return '已停用';
	}
};

export const filterGh = (value: string | number) => {
	switch (value) {
		case '0':
			return '人工挂号';
		case '1':
			return '自助挂号';
	}
};

export const dateYMD = (value: string) => {
	if (value !== null) return value.slice(0, 10);
};

export const trueOrFalse = (value: string | number) => {
	switch (value) {
		case '0':
			return '否';
		case '1':
			return '是';
		case 0:
			return '否';
		case 1:
			return '是';
	}
};
//将金额数字转换成2位的浮点数（如果金额数的小数点后超过2位则不转换）
export const moneyFixed = (val: number) => {
	if (val == null) {
		return '0.00';
	} else {
		if (val.toString().split('.')[1] && val.toString().split('.')[1].length > 2) {
			return val;
		} else {
			return val.toFixed(2);
		}
	}
};

export const FixedFour = (val: number) => {
	if (val == null) {
		return '0.0000';
	} else {
		if (val.toString().split('.')[1] && val.toString().split('.')[1].length > 4) {
			return val;
		} else {
			return val.toFixed(4);
		}
	}
};
