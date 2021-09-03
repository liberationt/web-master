import { wlMessage } from '@/plugins/element';

import { getLodop } from '@/plugins/lodop/index.js'

/**
 * @name 退出登录
 */
const logout = () => {
  wlMessage('退出登录')
}

export default {
  getLodop,
  logout
}