<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
  >
    <span>
      <!-- Tips: Web打印服务CLodop未安装启动，点击这里→ -->
      {{lodopHTMLData}}
      <a href="/pic/CLodop_Setup.exe" target="_self">下载执行安装</a>
    </span>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
      <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
    </span>
  </el-dialog>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'lodop-tips',
})
export default class extends Vue {
  private total: number = 0 //列表所有条数
  private dialogVisible: boolean = false
  private lodopHTMLData: string = ''

  mounted() {
    // this.init()
    const _this = this
    window.flagLodop = false;
    window.lodopHTMLData = '';
    let value = ''
    // 监听window的属性flagLodop是否变化
    Object.defineProperty(window, 'flagLodop', {
        get(){
            return value;
        },
        set(newVal){
            _this.lodopHTMLData = window.lodopHTMLData // 这里的lodopHTMLData是从lodop插件的LodopFuncs.js中赋值的
            _this.dialogVisible = true
            value = newVal;
        }
    })
  }
  // 初始化参数
  private init() {
    this.dialogVisible = true
  }
  handleClose() {
    this.$emit('handleClose')
    this.dialogVisible = false
  }
}
</script>

<style scoped lang="scss">
.el-dialog .el-dialog__footer {
  padding: 20px 24px !important;
}
</style>
