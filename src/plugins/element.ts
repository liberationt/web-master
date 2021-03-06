import { DataType } from "wl-core"
import { Button, Menu, Submenu,Input, MenuItem, MenuItemGroup, Loading, Message, MessageBox } from "element-ui";

/**
 * message方法 默认可关闭
 * @param {*} options 消息 | 配置项
 */
export function wlMessage(options: any) {
  DataType.isObject(options)
    ? Message({
      showClose: true,
      ...options
    })
    : Message({
      showClose: true,
      message: options
    })
}

/**
 * 确认框，默认确定取消按钮，警告状态
 * @param {*} message 提示语
 * @param {*} title 标题
 * @param {*} options 配置
 */
export function wlConfirm(message: any, title = "提示", options: any = {}) {
  let _options = {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    ...options
  }
  return MessageBox.confirm(message, title, _options)
}

export default {
  components: [
    Button, Menu, Submenu, MenuItem, MenuItemGroup,Input
  ],
  serve: [Loading],
  methods: [wlMessage, wlConfirm]
}

