// 西医病案首页填写
<template>
  <div class="content">
    <div class="his-module his-small scroll-bar" style="padding-top: 0">
      <el-tabs v-model="activeName" class="tab-basic tab-small underline">
        <el-tab-pane label="正面" name="positive">
          <positive ref="positiveRef"></positive>
        </el-tab-pane>
        <el-tab-pane label="反面" name="back">
          <back ref="backRef"></back>
        </el-tab-pane>
      </el-tabs>
      <div class="row" style="position:absolute;top: 7px; left: 99px;border-bottom:none">
        <div class="label">
          <el-divider direction="vertical"></el-divider>
          <div class="btn">
            <el-button size="mini" type="text">
              <i class="icon his-btn-refresh"></i>刷新
            </el-button>
            <el-button size="mini" type="text">
              <i class="icon his-btn-save-copy green"></i>保存
            </el-button>
            <el-button size="mini" type="text">
              <i class="icon his-btn-confirm"></i>提交
            </el-button>
            <el-button size="mini" type="text">
              <i class="icon his-btn-print"></i>打印
            </el-button>
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <div class="label">
          <div class="title">住院病案首页</div>
          <el-divider direction="vertical"></el-divider>
          <div class="title">上海天佑医院</div>
          <div class="his-mrms-tag">(组织机构代码：8887384992)</div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
import positive from './components/positive.vue'
import back from './components/back.vue'
@Component({
  name: 'xybasyWrite',
  filters: {},
  components: {
    positive,
    back
  }
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private activeName: string = 'positive'

  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
// ::v-deep .el-tabs__header {
//   margin: 0 0 2px;
// }
::v-deep .el-tabs .el-tabs__item {
  padding: 7px 24px 0 0 !important;
}

// .content .his-small .row .label {
//   height: 21px;
// }
::v-deep.el-tabs .el-tabs__item:last-child {
  padding-right: 12px !important;
}

// .el-tabs__header{
//     padding-top: 5px
// }

::v-deep .tab-small .el-tabs__item {
  height: 40px;
}
</style>