<template>
  <div class="content" style="padding: 0">
    <div class="his-module his-small">
      <div class="row">
        <div class="label">
          <div class="tag">出院日期</div>
          <el-date-picker
            type="daterange"
            v-model="currentDate"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            class="date-wrapper"
            style="width: 220px"
          ></el-date-picker>
        
        <el-divider direction="vertical"></el-divider>
        <div class="btn">
            <el-button type="text" size="mini">
                <i class="icon his-caozuo_search"></i>查询
            </el-button>
            <el-button type="text" size="mini">
                <i class="icon his-print"></i>打印
            </el-button>
        </div>
        </div>
      </div>
      <el-table
        border
        stripe
        highlight-current-rows
        ref="tableData"
        :fit="true"
        class="no-underline action-btns input-table"
        :height="listSlotHeight - 127"
        tooltip-effect="light"
        :data="tableData"
      >
        <el-table-column label="病案号" prop></el-table-column>
        <el-table-column label="姓名" prop></el-table-column>
        <el-table-column label="性别" prop></el-table-column>
        <el-table-column label="年龄" prop></el-table-column>
        <el-table-column label="病案质量" prop></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
@Component({
  name: 'cxjgDisplay',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private currentDate: any = ''
  private tableData:Array<any> = []
  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
</style>