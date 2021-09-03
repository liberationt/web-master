// 流动人口上报月报-门诊月报
<template>
  <div>
    <div class="his-module his-small">
      <div class="row">
        <div class="label">
          <div class="tag">上报月份</div>
          <el-date-picker
            type="month"
            style="margin-right: 8px; width: 148px"
            placeholder="请选择日期"
            v-model="monthData"
            value-format="yyyy-MM"
            clearable
          ></el-date-picker>
          <div class="tag">起止时间</div>
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
          ></el-date-picker><el-divider direction="vertical"></el-divider>
          <div class="tag">门诊类别</div>
          <el-select v-model="MZLB" multiple collapse-tags placeholder="门诊线路">
            <el-option v-for="item in mzlbList" :key="item.dv" :value="item.dv" :label="item.dn"></el-option>
          </el-select>
          <el-divider direction="vertical"></el-divider>
          <div class="btn">
            <el-button type="text" size="mini" @click="handleStatis">
              <i class="icon his-report"></i>统计
            </el-button>
            <el-button type="text" size="mini">
              <i class="icon his-btn-print"></i>打印
            </el-button>
          </div>
        </div>
      </div>
      <el-table
        show-summary
        stripe
        :data="tableData"
        border
        highlight-current-row
        :height="listSlotHeight-127"
        class="scroll-bar"
        tooltip-effect="light"
      >
        <el-table-column type="index" width="32" align="center"></el-table-column>
        <el-table-column prop="name" width="70" label="姓名"></el-table-column>
        <el-table-column prop="cardno" label="卡号"></el-table-column>
        <el-table-column prop="zzzh" label="暂住证号"></el-table-column>
        <el-table-column prop="jzdate" label="就诊日期"></el-table-column>
        <el-table-column prop="jznum" label="就诊次数"></el-table-column>
        <el-table-column prop="grxz" label="在退标识">
          <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.RETURN_SIGN_DICT.find(item=> item.dv == scope.row.grxz)&& $store.state.webSqlDict.RETURN_SIGN_DICT.find(item=> item.dv==scope.row.grxz).dn}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="zfy" label="总费用"></el-table-column>
        <el-table-column prop="zzkfy" width="100" label="总折扣费用"></el-table-column>
        <el-table-column prop="zgrzf" width="100" label="总个人支付"></el-table-column>
        <el-table-column prop="fy00" width="100" label="诊疗费折扣"></el-table-column>
        <el-table-column prop="fy01" width="100" label="治疗费折扣"></el-table-column>
        <el-table-column prop="fy02" width="100" label="手材费折扣"></el-table-column>
        <el-table-column prop="fy03" width="100" label="检查费折扣"></el-table-column>
        <el-table-column prop="fy04" width="100" label="化验费折扣"></el-table-column>
        <el-table-column prop="fy05" width="100" label="摄片费折扣"></el-table-column>
        <el-table-column prop="fy06" width="100" label="透视费折扣"></el-table-column>
        <el-table-column prop="fy07" width="100" label="西药费折扣"></el-table-column>
        <el-table-column prop="fy08" width="120" label="中成药费折扣"></el-table-column>
        <el-table-column prop="fy09" width="120" label="中草药费折扣"></el-table-column>
        <el-table-column prop="fy10" label="其他折扣"></el-table-column>
        <el-table-column prop="fy20" width="100" label="诊疗费个人"></el-table-column>
        <el-table-column prop="fy21" width="110" label="治疗费个人"></el-table-column>
        <el-table-column prop="fy22" width="110" label="手材费个人"></el-table-column>
        <el-table-column prop="fy23" width="110" label="检查费个人"></el-table-column>
        <el-table-column prop="fy24" width="110" label="化验费个人"></el-table-column>
        <el-table-column prop="fy25" width="110" label="摄片费个人"></el-table-column>
        <el-table-column prop="fy26" width="110" label="透视费个人"></el-table-column>
        <el-table-column prop="fy27" width="110" label="西药费个人"></el-table-column>
        <el-table-column prop="fy28" width="110" label="中成药费个人"></el-table-column>
        <el-table-column prop="fy29" width="110" label="中草药费个人"></el-table-column>
        <el-table-column prop="fy30" label="其他个人"></el-table-column>
        <el-table-column prop="daa" label="上报年月"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { getNow } from '@/api/his/basic/index.ts'
import { parseTime } from '@/utils'
import { statistics } from '@/api/his/medinsuinterface/outpatientMonthlyReport.ts'
@Component({
  name: 'outpatientMonthlyReport',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private currentDate: any = '' // 存放起止时间
  private monthData: any = '' //上报月份
  private nowTime: any = '' // 当前服务器时间
  private nowDate: any = '' // 当前服务器日期
  private nowMonth: any = '' // 当前服务器月份
  private mzlbList: Array<any> = [] // 门诊类别数组
  private MZLB: Array<any> = [] //门诊类别
  private tableData: Array<any> = []
  private searchData: any = {
    daa: '',
    datefrom: '',
    dateto: '',
    mzlb: ''
  }

  // 统计按钮
  private handleStatis() {
    this.getRetrieval()
  }
  // 获取统计数据
  private getRetrieval() {
    this.searchData.daa = this.monthData
    this.searchData.datefrom = this.currentDate[0]
    this.searchData.dateto = this.currentDate[1]
    this.searchData.mzlb = this.MZLB.join(',')
    if (this.MZLB.length) {
      const pageTable: any = this.$refs.pageTable
      pageTable.getList()
    } else {
      this.$message({
        message: '请先选择门诊类别！',
        type: 'warning'
      })
    }
  }

  // 获取当前服务器时间
  private getNowTime() {
    getNow().then((res: any) => {
      this.nowDate = parseTime(res.data, '{y}-{m}-{d}')
      this.nowMonth = parseTime(res.data, '{y}-{m}')
      this.monthData = parseTime(res.data, '{y}.{m}')
      let dateFrom = this.nowMonth + '-01'
      this.currentDate = [dateFrom, this.nowDate]
      console.log(this.currentDate)
    })
  }

  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {
    this.mzlbList = this.$store.state.webSqlDict.OUTPATIENT_TYPE
    console.log(this.mzlbList)

    this.getNowTime()
  }
}
</script>
<style scoped lang="scss">
.his-small .row .label .el-input::v-deep .el-input__inner {
  width: 150px;
}

.his-small .row .label .tag {
  padding-left: 0;
  color: #6a6d78;
  font-size: 13px;
}
::v-deep .el-checkbox__label {
  font-size: 13px !important;
}
</style>