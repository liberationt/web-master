// 非实时结算上传-非实时结算住院费用明细库
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
            <el-button type="text" size="mini">
              <i class="icon his-report"></i>产生
            </el-button>
            <el-button type="text" size="mini">
              <i class="icon his-save"></i>上传
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
          :height="listSlotHeight-159"
          class="scroll-bar"
          tooltip-effect="light"
        >
          <el-table-column type="index" width="32" align="center"></el-table-column>
          <el-table-column prop="ybid" width="100" label="就医凭证号"></el-table-column>
          <el-table-column prop="zyid" label="住院号"></el-table-column>
          <el-table-column width="150" prop="bxid" label="身份证号"></el-table-column>
          <el-table-column prop="ksid" label="科室编码"></el-table-column>
          <el-table-column prop="ksna" label="科室名称"></el-table-column>
          <el-table-column prop="ysgh" label="医生工号"></el-table-column>
          <el-table-column prop="ysxm" label="医生姓名"></el-table-column>
          <el-table-column prop="fylb" label="费用类别">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.ZYFY_CATEGORY_DICT.find(item=> item.dv == scope.row.fylb)&& $store.state.webSqlDict.ZYFY_CATEGORY_DICT.find(item=> item.dv==scope.row.fylb).dn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="xmbm" width="110" label="明细项目编码"></el-table-column>
          <el-table-column prop="xmmc" width="110" label="明细项目名称"></el-table-column>
          <el-table-column prop="xmdw" width="110" label="明细项目单位"></el-table-column>
          <el-table-column prop="xmdj" width="110" label="明细项目单价"></el-table-column>
          <el-table-column prop="tymc" width="150" label="药品通用名/性材料品牌"></el-table-column>
          <el-table-column prop="zczh" label="注册证号"></el-table-column>
          <el-table-column prop="mxgg" width="120" label="明细项目规格"></el-table-column>
          <el-table-column prop="xmsl" width="120" label="明细项目数量"></el-table-column>
          <el-table-column prop="xmje" width="120" label="明细项目金额"></el-table-column>
          <el-table-column prop="jytotfy" width="155" label="明细项目交易费用金额"></el-table-column>
          <el-table-column prop="totfy" width="175" label="明细项目医保结算范围金额"></el-table-column>
          <el-table-column prop="bxbz" label="可报标志">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.REPORTABLE_IDENTIF_DICT.find(item=> item.dv == scope.row.bxbz)&& $store.state.webSqlDict.REPORTABLE_IDENTIF_DICT.find(item=> item.dv==scope.row.bxbz).dn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="rylx" label="人员类型">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.PERSON_TYPE_DICT.find(item=> item.dv == scope.row.rylx)&& $store.state.webSqlDict.PERSON_TYPE_DICT.find(item=> item.dv==scope.row.rylx).dn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="xmsyrq" width="100" label="项目使用日期"></el-table-column>
          <el-table-column prop="tfbz" width="100" label="收费、退费标志">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.REFUND_IDENTIF_DICT.find(item=> item.dv == scope.row.tfbz)&& $store.state.webSqlDict.REFUND_IDENTIF_DICT.find(item=> item.dv==scope.row.tfbz).dn}}</div>
            </template>
          </el-table-column>
        </el-table>
      </pagenation-list>
      <!-- <div
        class="row his-yb-row"
        style="padding-top: 8px;border-bottom: none;padding-bottom: 0;margin-bottom: 0"
      >
        <div class="label">
          <el-checkbox v-model="checked">完成后提示完成信息|你上传数据后目录为:（c:\上传数据\）</el-checkbox>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { getNow } from '@/api/his/basic/index.ts'
import { parseTime } from '@/utils'
import { retrieval, reporting } from '@/api/his/medinsuinterface/fssjszyfymxLibrary.ts'
@Component({
  name: 'fssjszyfymxLibrary',
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
  private checked: boolean = false
  private tableData: Array<any> = []
  private searchData: any = {
    daa: '',
    datefrom: '',
    dateto: '',
    mzlb: ''
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

.his-yb-row {
    position: absolute;
    bottom: 6px;
}
</style>