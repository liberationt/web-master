<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 病案借阅归还
 -->
<template>
  <div class="content">
    <div class="his-module his-small">
      <div class="row">
        <div class="label" headInput>
          <div class="querySearch">
            <div class="tag" style="padding-left: 0">借阅日期</div>
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
          <div class="tag">住院号</div>
          <el-input v-model="value" placeholder="请输入住院号"></el-input>
          <div class="tag">借阅医生</div>
          <el-select v-model="doctorList" class="selectDoc">
            <el-option label="张医生" value="1"></el-option>
            <el-option label="王医生" value="2"></el-option>
          </el-select>
          <el-divider direction="vertical"></el-divider>
          <el-radio v-model="medicalRecordNum" label="1">已借未还</el-radio>
          <el-radio v-model="medicalRecordNum" label="2">逾期未还</el-radio>
          <el-radio v-model="medicalRecordNum" label="1">已归还</el-radio>
          <el-radio v-model="medicalRecordNum" label="2">已丢失</el-radio>
          <div class="operate" style="padding-left: 8px">
            <el-button type="primary" class="blue-gra" size="mini">查询</el-button>
          </div>
        </div>
        <div class="operate">
          <el-button type="primary" class="blue-gra" size="mini" @click="borrowDialog=true">借阅</el-button>
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
        >
          <el-table-column type="index" width="32" align="center"></el-table-column>
          <el-table-column prop="ksdm" label="科室" width="80"></el-table-column>
          <el-table-column prop="jyys" label="借阅医生" width="70"></el-table-column>
          <el-table-column prop="jyrq" label="借阅日期" min-width="85"></el-table-column>
          <el-table-column prop="yhrq" label="应还日期" min-width="85"></el-table-column>
          <el-table-column prop="zyh" label="住院号" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xm" label="姓名" width="70"></el-table-column>
          <el-table-column prop="xb" label="性别" width="50"></el-table-column>
          <el-table-column prop="nl" label="年龄" width="55"></el-table-column>
          <el-table-column prop="cyrq" label="出院日期" width="85"></el-table-column>
          <el-table-column prop="zyts" label="住院天数" width="70"></el-table-column>
          <el-table-column prop="cyks" label="出院科室" width="70"></el-table-column>
          <el-table-column prop="zfy" label="总费用" width="70"></el-table-column>
          <el-table-column prop="zzd" label="主诊断" width="90" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zt" label="状态" width="70"></el-table-column>
          <el-table-column label="操作" width="87" fixed="right" align="center">
            <template>
              <el-tooltip content="归还" effect="light">
                <el-button size="mini" type="text">
                  <i class="icon his-caozuo-Audit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip content="丢失" effect="light">
                <el-button size="mini" type="text">
                  <i class="icon his-caidan_binglimoban"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip content="续借" effect="light">
                <el-button size="mini" type="text">
                  <i class="icon his-caidan_binglimoban"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </pagenation-list>
    </div>
    <el-dialog
      title="借阅"
      :visible.sync="borrowDialog"
      width="600px"
      :close-on-click-modal="false"
      class="narrow-dialog"
    >
      <div class="content his-sys-content" style="height: auto;background: #fff">
        <div class="his-module his-small" style="padding: 8px 0;">
          <el-form :model="borrowData" ref="borrowDataRef" class="retrieval" label-width="75px">
            <el-row type="flex">
              <el-form-item label="借阅日期" prop="jyrq">
                <el-date-picker v-model="borrowData.jyrq" type="date" placeholder="选择日期" class="date-wrapper"></el-date-picker>
              </el-form-item>
              <el-form-item label="应还日期" prop="yhrq">
                <el-date-picker v-model="borrowData.yhrq" type="date" placeholder="选择日期" class="date-wrapper"></el-date-picker>
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="借阅医生" prop="jyys">
                <el-input v-model="borrowData.jyys" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="所在科室" prop="szks">
                <el-input v-model="borrowData.szks" placeholder="请输入"></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="借阅用途" prop="jyyt">
                <el-input v-model="borrowData.jyyt" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="住院号" prop="zyh">
                <el-input v-model="borrowData.zyh" placeholder="请输入"></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="姓名" prop="xm">
                <el-input v-model="borrowData.xm" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="xb">
                <el-input v-model="borrowData.xb" placeholder="请输入"></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="出生日期" prop="csrq">
                <el-input v-model="borrowData.csrq" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="nl">
                <el-input v-model="borrowData.nl" placeholder="请输入"></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="出院科室" prop="cyks">
                <el-input v-model="borrowData.cyks" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="入院时间" prop="rysj">
                <el-input v-model="borrowData.rysj" placeholder="请输入"></el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="出院时间" prop="cysj">
                <el-input v-model="borrowData.cysj" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="经手人" prop="jsr">
                <el-input v-model="borrowData.jsr" placeholder="请输入"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="borrowDialog = false">取 消</el-button>
        <el-button type="primary" @click="borrowDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
//命名文件名称，过滤器什么的都再这里写
@Component({
  name: 'medicalRecords'
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private currentDate: Array<any> = [] // 当天日期
  private doctorList: Array<any> = []
  private value: string = ''
  private borrowDialog: boolean = false //借阅弹窗默认隐藏
  private medicalRecordNum: string = ''
  private borrowData: any = {}
  private searchData: any = {}
  private tableData: Array<any> = [
    { ksdm: '普外科', jyys: '赵医生', jyrq: '2020-07-15', yhrq: '2020-07-20', zyh: '202007012452', xm: '张三', xb: '男', nl: '70岁', cyrq: '2020-07-20', zyts: '10', cyks: '呼吸内科', zfy: '12000', zzd: '左手掌复合痣', zt: '已借未还' },
    { ksdm: '普外科', jyys: '赵医生', jyrq: '2020-07-13', yhrq: '2020-07-20', zyh: '202007012352', xm: '李四', xb: '男', nl: '60岁', cyrq: '2020-07-20', zyts: '10', cyks: '血液内科', zfy: '12000', zzd: '右前臂黑痣', zt: '已借未还' },
    { ksdm: '妇产科', jyys: '李医生', jyrq: '2020-07-12', yhrq: '2020-07-20', zyh: '202007012552', xm: '孙丽', xb: '女', nl: '30岁', cyrq: '2020-07-20', zyts: '10', cyks: '骨科', zfy: '12000', zzd: '肩黑素细胞痣', zt: '已借未还' },
    { ksdm: '妇产科', jyys: '李医生', jyrq: '2020-07-10', yhrq: '2020-07-20', zyh: '202007012462', xm: '赵琳', xb: '女', nl: '36岁', cyrq: '2020-07-20', zyts: '10', cyks: '儿科', zfy: '12000', zzd: '手黑素细胞痣', zt: '已借未还' }
  ]
  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
.date-wrapper.el-input__inner {
  width: 220px;
}

.his-small .row .label .el-input::v-deep .el-input__inner {
  width: 120px !important;
}
.row .label .el-select.selectDoc::v-deep .el-input .el-input__inner {
  width: 120px !important;
}
//右侧状态框悬浮
::v-deep .el-table__fixed-right {
  height: 100% !important;
}
</style>