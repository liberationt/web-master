// 非实时结算上传-非实时结算住院结算记录库
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
          <el-table-column prop="rylx" label="人员类型">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.PERSON_TYPE_DICT.find(item=> item.dv == scope.row.rylx)&& $store.state.webSqlDict.PERSON_TYPE_DICT.find(item=> item.dv==scope.row.rylx).dn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="ybid" width="100" label="就医凭证号"></el-table-column>
          <el-table-column prop="zyid" label="住院号"></el-table-column>
          <el-table-column prop="zyts" width="130" label="本次结算住院天数"></el-table-column>
          <el-table-column prop="jsksrq" width="130" label="住院结算开始时间"></el-table-column>
          <el-table-column prop="ryzdbm" width="100" label="入院诊断编码"></el-table-column>
          <el-table-column prop="ryzdmc" width="100" label="入院诊断说明"></el-table-column>
          <el-table-column prop="jsjsrq" width="130" label="住院结算结束日期"></el-table-column>
          <el-table-column prop="zyjgbz" width="100" label="急观住院标志">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.JGZY_IDENTIF_DICT.find(item=> item.dv == scope.row.zyjgbz)&& $store.state.webSqlDict.JGZY_IDENTIF_DICT.find(item=> item.dv==scope.row.zyjgbz).dn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="cybz" label="出院标志">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.CY_IDENTIF_DICT.find(item=> item.dv == scope.row.cybz)&& $store.state.webSqlDict.CY_IDENTIF_DICT.find(item=> item.dv==scope.row.cybz).dn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="cyzdbm" width="100" label="出院诊断编码"></el-table-column>
          <el-table-column prop="cyzdmc" width="100" label="出院诊断说明"></el-table-column>
          <el-table-column prop="zljg" width="100" label="治疗结果代码">
            <template slot-scope="scope">
              <div>{{$store.state.webSqlDict.TREATMENT_RESULT_DICT.find(item=> item.dv == scope.row.zljg)&& $store.state.webSqlDict.TREATMENT_RESULT_DICT.find(item=> item.dv==scope.row.zljg).dn}}</div>
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
import { retrieval, reporting } from '@/api/his/medinsuinterface/fssjszyjsjlLibrary.ts'
@Component({
  name: 'fssjszyjsjlLibrary',
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