// 贫困精神病报表
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
        data-url="/hisapi/shybdz/pkjsbbb"
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
          <el-table-column prop="ylzh" label="医疗证号"></el-table-column>
          <el-table-column prop="mzhm" label="门诊号码"></el-table-column>
          <el-table-column prop="name" width="70" label="姓名"></el-table-column>
          <el-table-column prop="brxb" label="病人性别"></el-table-column>
          <el-table-column prop="totfy" label="总费用"></el-table-column>
          <el-table-column prop="ghf" label="挂号费"></el-table-column>
          <el-table-column prop="zlf" label="诊疗费"></el-table-column>
          <el-table-column prop="zyf" label="药费"></el-table-column>
          <el-table-column prop="zfyf" label="药费自负"></el-table-column>
          <el-table-column prop="zlf_z" label="治疗费"></el-table-column>
          <el-table-column prop="jyf" label="检验费"></el-table-column>
          <el-table-column prop="jcf" label="检查费"></el-table-column>
          <el-table-column prop="qtf" label="其他"></el-table-column>
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
import { retrieval, reporting } from '@/api/his/medinsuinterface/povertyPsychosReport.ts'
@Component({
  name: 'povertyPsychosReport',
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
    const pageTable: any = this.$refs.pageTable
    pageTable.getList()
  }

  // 上报
  private handleReport() {
    const params: any = {
      daa: this.monthData,
      datefrom: this.currentDate[0],
      dateto: this.currentDate[1]
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