// 民政帮困报表-医保上报表8
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
          ></el-date-picker>
          <el-divider direction="vertical"></el-divider>
          <div class="tag">门诊类别</div>
          <el-select v-model="MZLB" multiple collapse-tags placeholder="门诊线路">
            <el-option v-for="item in mzlbList" :key="item.dv" :value="item.dv" :label="item.dn"></el-option>
          </el-select>
          <el-divider direction="vertical"></el-divider>
          <div class="btn">
            <el-button type="text" size="mini" @click="handleRetrieval">
              <i class="icon his-caozuo-update-information"></i>检索
            </el-button>
            <el-button type="text" size="mini">
              <i class="icon his-caozuo-update-information"></i>分拆
            </el-button>
            <el-button type="text" size="mini" @click="handleReport">
              <i class="icon his-caozuo-update-information"></i>上报
            </el-button>
            <el-button type="text" size="mini">
              <i class="icon his-caozuo-update-information"></i>校对
            </el-button>
          </div>
        </div>
      </div>
      <pagenation-list
        ref="pageTable"
        data-url="/hisapi/shybdz/mzbkbb"
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
          :height="listSlotHeight-159"
          class="scroll-bar"
          tooltip-effect="light"
        >
          <el-table-column type="index" width="32" align="center"></el-table-column>
          <el-table-column prop="name" width="70" label="姓名"></el-table-column>
          <el-table-column prop="bxid" label="身份证"></el-table-column>
          <el-table-column prop="ybid" label="凭证号码"></el-table-column>
          <el-table-column prop="ksid" label="科别编码"></el-table-column>
          <el-table-column prop="ksna" label="科别名称"></el-table-column>
          <el-table-column prop="jzdate" label="就诊日期"></el-table-column>
          <el-table-column prop="jznum" label="就诊次数"></el-table-column>
          <el-table-column prop="grxz" label="在退标识">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.RETURN_SIGN_DICT.find(item=> item.dv == scope.row.grxz)&& $store.state.webSqlDict.RETURN_SIGN_DICT.find(item=> item.dv==scope.row.grxz).dn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="jytotfy" label="总费用"></el-table-column>
          <el-table-column prop="grxj" label="现金支付"></el-table-column>
          <el-table-column prop="grzfd" label="当年支付"></el-table-column>
          <el-table-column prop="grzfl" label="历年支付"></el-table-column>
          <el-table-column prop="totfy" width="100" label="医保内总费用"></el-table-column>
          <el-table-column prop="fy00" label="诊疗费"></el-table-column>
          <el-table-column prop="fy01" label="治疗费"></el-table-column>
          <el-table-column prop="fy02" label="手材费"></el-table-column>
          <el-table-column prop="fy03" label="检查费"></el-table-column>
          <el-table-column prop="fy04" label="化验费"></el-table-column>
          <el-table-column prop="fy05" label="摄片费"></el-table-column>
          <el-table-column prop="fy06" label="透视费"></el-table-column>
          <el-table-column prop="fy07" label="西药费"></el-table-column>
          <el-table-column prop="fy08" label="中成药费"></el-table-column>
          <el-table-column prop="fy09" label="中草药费"></el-table-column>
          <el-table-column prop="fy10" label="其他"></el-table-column>
          <el-table-column prop="flgrzf" width="100" label="自负合计"></el-table-column>
          <el-table-column prop="fy20" width="110" label="自负诊疗费"></el-table-column>
          <el-table-column prop="fy21" width="110" label="自负治疗费"></el-table-column>
          <el-table-column prop="fy22" width="110" label="自负手材费"></el-table-column>
          <el-table-column prop="fy23" width="110" label="自负检查费"></el-table-column>
          <el-table-column prop="fy24" width="110" label="自负化验费"></el-table-column>
          <el-table-column prop="fy25" width="110" label="自负摄片费"></el-table-column>
          <el-table-column prop="fy26" width="110" label="自负透视费"></el-table-column>
          <el-table-column prop="fy27" width="110" label="自负西药费"></el-table-column>
          <el-table-column prop="fy28" width="130" label="自负中成药费"></el-table-column>
          <el-table-column prop="fy29" width="130" label="自负中草药费"></el-table-column>
          <el-table-column prop="fy30" width="100" label="自负其他"></el-table-column>
          <el-table-column prop="zf" width="110" label="非医保个人自费"></el-table-column>
          <el-table-column prop="zdicd" label="诊断编码"></el-table-column>
          <el-table-column prop="zdname" label="诊断说明"></el-table-column>
          <el-table-column prop="bjqk" label="保健情况">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.HEALTH_CARE_DICT.find(item=> item.dv == scope.row.bjqk)&& $store.state.webSqlDict.HEALTH_CARE_DICT.find(item=> item.dv==scope.row.bjqk).dn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="daa" label="上报年月"></el-table-column>
          <el-table-column prop="yyid" width="90" label="医院法人码"></el-table-column>
          <el-table-column prop="lsh" label="流水号"></el-table-column>
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
import { retrieval, reporting } from '@/api/his/medinsuinterface/medicalInsureReport8.ts'
@Component({
  name: 'medicalInsureReport8',
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