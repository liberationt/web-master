import request from '@/utils/request'

export const getAppConfigsApi = () => request({
    url: '/Api/GetAppConfigs',
    method: 'get'
})
