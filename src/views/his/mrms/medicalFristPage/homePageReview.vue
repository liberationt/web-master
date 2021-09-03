<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 病案首页审核
 -->
<template>
  <div class="content">
    <div class="his-module his-small">
      <div class="row">
        <div class="label" headInput>
          <div class="querySearch">
            <div class="tag" style="padding-left: 0">录入日期</div>
            <el-date-picker
              type="daterange"
              v-model="currentDate"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              class="date-wrapper"
            ></el-date-picker>
          </div>
          <div class="querySearch">
            <div class="tag" style="font-size: 13px">出院日期</div>
            <el-date-picker
              type="daterange"
              v-model="currentDate"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              class="date-wrapper"
            ></el-date-picker>
          </div>
          <div class="tag">病案号</div>
          <el-input v-model="value" placeholder="请输入病案号"></el-input>
          <el-divider direction="vertical"></el-divider>
          <el-radio v-model="medicalRecordNum" label="1">未审核</el-radio>
          <el-radio v-model="medicalRecordNum" label="2">已审核</el-radio>
          <div class="operate">
            <el-button type="primary" class="blue-gra" size="mini">查询</el-button>
          </div>
        </div>
        <div class="operate">
          <el-button type="primary" class="blue-gra" size="mini">审核</el-button>
        </div>
      </div>
      <pagenation-list
        ref="pageTable"
        data-url
        http-method="post"
        v-model="tableData"
        :searchData="searchData"
        :list-height="listSlotHeight- 72"
      >
        <el-table
          border
          stripe
          slot="list"
          highlight-current-rows
          ref="tableData"
          :fit="true"
          class="no-underline action-btns"
          :height="listSlotHeight - 106"
          :data="tableData"
          tooltip-effect="light"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" width="32"></el-table-column>
          <el-table-column type="selection" width="32"></el-table-column>
          <el-table-column prop="bah" label="病案号"></el-table-column>
          <el-table-column prop="xb" label="性别" width="45"></el-table-column>
          <el-table-column prop="nl" label="年龄" width="55"></el-table-column>
          <el-table-column prop="cyrq" label="出院日期"></el-table-column>
          <el-table-column prop="zyts" label="住院天数" width="70"></el-table-column>
          <el-table-column prop="cyks" label="出院科室" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zfy" label="总费用" width="70"></el-table-column>
          <el-table-column prop="zzd" label="主诊断" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lrsj" label="录入时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zt" label="状态" width="70"></el-table-column>
          <el-table-column label="操作" width="67">
            <template>
              <el-tooltip content="审核" effect="light">
                <el-button size="mini" type="text">
                  <i class="icon his-caozuo-Audit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip content="修改首页" effect="light">
                <el-button size="mini" type="text">
                  <i class="icon his-edit"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </pagenation-list>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
//命名文件名称，过滤器什么的都再这里写
@Component({
  name: 'homePageReView'
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private currentDate: Array<any> = [] // 当天日期
  private value: string = ''
  private medicalRecordNum: string = ''
  private searchData: any = {}
  private tableData: Array<any> = [
    { bah: '202007012452', xm: '王小虎', xb: '男', nl: '70岁', cyrq: '2020-07-20', zyts: '10', cyks: '呼吸内科', zfy: '12000', zzd: '左手掌复合痣', lrsj: '2020-07-10 10:00', zt: '未审核' },
    { bah: '202007012452', xm: '王小龙', xb: '男', nl: '70岁', cyrq: '2020-07-20', zyts: '10', cyks: '血液内科', zfy: '12000', zzd: '右前臂黑痣', lrsj: '2020-07-10 10:00', zt: '未审核' },
    { bah: '202007012452', xm: '王一', xb: '男', nl: '70岁', cyrq: '2020-07-20', zyts: '10', cyks: '骨科', zfy: '12000', zzd: '肩黑素细胞痣', lrsj: '2020-07-10 10:00', zt: '未审核' },
    { bah: '202007012452', xm: '王二', xb: '男', nl: '70岁', cyrq: '2020-07-20', zyts: '10', cyks: '小儿科', zfy: '12000', zzd: '手黑素细胞痣', lrsj: '2020-07-10 10:00', zt: '未审核' }
  ]

  // 表格多选操作
  private handleSelectionChange() {}
  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
.date-wrapper.el-input__inner {
  width: 190px;
}
</style>