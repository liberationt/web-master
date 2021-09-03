<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 复印查询
 -->
<template>
  <div>
    <div class="his-module his-small">
      <div class="row">
        <div class="label">
          <div class="querySearch">
            <div class="tag" style="padding-left: 0">复印日期</div>
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
            <div class="tag">住院号</div>
            <el-input v-model="value" placeholder="请输入住院号" style="width: 148px"></el-input>
            <div class="tag">接待人</div>
            <el-select v-model="doctorList"  style="width: 148px">
              <el-option label="张医生" value="1"></el-option>
              <el-option label="王医生" value="2"></el-option>
            </el-select>
          </div>
        </div>
        <div class="operate">
          <el-button type="primary" class="blue-gra" size="mini">查询</el-button>
        </div>
      </div>
      <pagenation-list
        ref="pageTable"
        data-url
        http-method="post"
        v-model="tableData"
        :searchData="searchData"
        :list-height="listSlotHeight"
      >
        <el-table
          slot="list"
          stripe
          :data="tableData"
          border
          :height="listSlotHeight-158"
          class="scroll-bar"
          tooltip-effect="light"
          highlight-current-row
        >
            <el-table-column type="index" width="32" align="center"></el-table-column>
            <el-table-column prop="sqfyr" width="83" label="申请复印人"></el-table-column>
            <el-table-column prop="sqrsfzh" min-width="140" label="申请人身份证号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jdr" label="接待人" width="70"></el-table-column>
            <el-table-column prop="jbr" label="经办人" width="70"></el-table-column>
            <el-table-column prop="fyslrq" label="复印受理日期" width="95"></el-table-column>
            <el-table-column prop="zyh" label="住院号" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xm" label="姓名" width="70"></el-table-column>
            <el-table-column prop="xb" label="性别" width="50"></el-table-column>
            <el-table-column prop="nl" label="年龄" width="50"></el-table-column>
            <el-table-column prop="cyrq" label="出院日期"></el-table-column>
            <el-table-column prop="fyxm" label="复印项目"></el-table-column>
            <el-table-column prop="fysl" label="复印数量" width="70"></el-table-column>
            <el-table-column prop="sfje" label="收费金额" width="70"></el-table-column>
        </el-table>
      </pagenation-list>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
@Component({
  name: 'copySearch',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private doctorList: Array<any> = []
  private currentDate: string = ''
  private value: string = ''
  private searchData: any = {}

  private tableData: Array<any> = [
    { sqfyr: '张三', sqrsfzh: '320125197412160715', jdr: '赵医生', jbr: '张小三', fyslrq: '2020-07-15', zyh: '202007012452', xm: '王小虎', xb: '男', nl: '70岁', cyrq: '2020-07-20',fyxm: '出院记录', fysl: 2, sfje: 10 },
    { sqfyr: '张三', sqrsfzh: '320125197412160715', jdr: '赵医生', jbr: '张小三', fyslrq: '2020-07-15', zyh: '202007012452', xm: '王小虎', xb: '男', nl: '70岁', cyrq: '2020-07-20',fyxm: '出院记录', fysl: 2, sfje: 10 },
    { sqfyr: '张三', sqrsfzh: '320125197412160715', jdr: '赵医生', jbr: '张小三', fyslrq: '2020-07-15', zyh: '202007012452', xm: '王小虎', xb: '男', nl: '70岁', cyrq: '2020-07-20',fyxm: '出院记录', fysl: 2, sfje: 10 },
    { sqfyr: '张三', sqrsfzh: '320125197412160715', jdr: '赵医生', jbr: '张小三', fyslrq: '2020-07-15', zyh: '202007012452', xm: '王小虎', xb: '男', nl: '70岁', cyrq: '2020-07-20',fyxm: '出院记录', fysl: 2, sfje: 10 }
  ]
  
  created() {
    // 计算表格列表高度
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
</style>