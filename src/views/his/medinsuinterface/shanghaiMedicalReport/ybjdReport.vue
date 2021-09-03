// 医保监督报表
<template>
  <div class="content">
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
          ></el-date-picker>
          <el-divider direction="vertical"></el-divider>
          <div class="tag">门诊类别</div>
          <el-select v-model="MZLB" multiple collapse-tags placeholder="门诊线路">
            <el-option v-for="item in mzlbList" :key="item.dv" :value="item.dv" :label="item.dn"></el-option>
          </el-select>
          <el-divider direction="vertical"></el-divider>
          <div class="btn">
            <el-button type="text" size="mini">
              <i class="icon his-report"></i>检索
            </el-button>
            <el-button type="text" size="mini">
              <i class="icon his-save"></i>上报
            </el-button>
          </div>
        </div>
      </div>
      <pagenation-list
        ref="pageTable"
        data-url
        v-model="tableData"
        :list-height="listSlotHeight"
        :searchData="searchData"
        http-method="post"
      >
        <el-table
          slot="list"
          stripe
          :data="tableData"
          border
          highlight-current-row
          :height="listSlotHeight-108"
          class="scroll-bar"
          tooltip-effect="light"
        >
          <el-table-column type="index" width="32" align="center"></el-table-column>
          <el-table-column prop="lsh" label="流水号"></el-table-column>
          <el-table-column prop="xm" label="患者姓名"></el-table-column>
          <el-table-column prop="kh" label="卡号"></el-table-column>
          <el-table-column prop="ksdm" label="科室代码"></el-table-column>
          <el-table-column prop="ksmc" label="科室名称"></el-table-column>
          <el-table-column prop="ysdm" label="医生代码"></el-table-column>
          <el-table-column prop="ysmc" label="医生名称"></el-table-column>
          <el-table-column prop="fylb" label="费用类别"></el-table-column>
          <el-table-column prop="mxdm" label="明细代码"></el-table-column>
          <el-table-column prop="mxmc" label="明细名称"></el-table-column>
          <el-table-column prop="mxdw" label="明细单位"></el-table-column>
          <el-table-column prop="mxdj" label="明细单价"></el-table-column>
          <el-table-column prop="mxsl" label="明细数量"></el-table-column>
          <el-table-column prop="mxxmgg" width="100" label="明细项目规格"></el-table-column>
          <el-table-column prop="mxje" label="明细金额"></el-table-column>
          <el-table-column prop="mxybje" width="100" label="结算范围金额"></el-table-column>
          <el-table-column prop="mxybjyje" label="交易金额"></el-table-column>
          <el-table-column prop="bxbz" label="报销标志"></el-table-column>
          <el-table-column prop="jyrq" label="交易日期"></el-table-column>
          <el-table-column prop="zfpb" label="作废判别"></el-table-column>
          <el-table-column prop="yymc" label="医院名称"></el-table-column>
          <el-table-column prop="jslx" label="结算类型"></el-table-column>
          <el-table-column prop="yyid" label="机构代码"></el-table-column>
          <el-table-column prop="ghlsh" width="90" label="挂号流水号"></el-table-column>
          <el-table-column prop="cfh" label="处方号"></el-table-column>
          <el-table-column prop="zhbz" label="账户标志"></el-table-column>
          <el-table-column prop="sfzh" label="身份证号"></el-table-column>
          <el-table-column prop="zdbm1" label="诊断编码1"></el-table-column>
          <el-table-column prop="zdbm2" label="诊断编码2"></el-table-column>
          <el-table-column prop="zdbm3" label="诊断编码3"></el-table-column>
          <el-table-column prop="ysflsh" width="100" label="原收费流水号"></el-table-column>
        </el-table>
      </pagenation-list>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { getNow } from '@/api/his/basic/index.ts'
import { parseTime } from '@/utils'
import { retrieval, reporting } from '@/api/his/medinsuinterface/ybjdReport.ts'
@Component({
  name: 'ybjdReport',
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

  // 检索
  private handleRetrieval() {
    this.getRetrieval()
  }

  // 获取检索数据
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

  // 上报
  private handleReport() {
    const params: any = {
      daa: this.monthData,
      datefrom: this.currentDate[0],
      dateto: this.currentDate[1],
      mzlb: this.MZLB.join(',')
    }
    reporting(params).then((res: any) => {
      if (res.errorCode == 'SUCCESS') {
        this.$notify({
          title: res.data,
          message: '',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    })
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