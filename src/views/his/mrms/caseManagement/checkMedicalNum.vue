<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 核对病案数
 -->
<template>
  <div class="content">
    <el-row class="navigation">
      <div class="his-module his-small">
        <div class="row">
          <div class="label">
            <div class="querySearch">
              <div class="tag" style="padding-left: 0">出院日期</div>
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
              <div class="tag">出院科室</div>
              <el-select v-model="doctorList">
                <el-option label="心内科" value="1"></el-option>
                <el-option label="呼吸内科" value="2"></el-option>
              </el-select>
              <el-divider direction="vertical"></el-divider>
              <el-radio v-model="medicalRecordNum" label="1">全部</el-radio>
              <el-radio v-model="medicalRecordNum" label="2">有差异</el-radio>
              <div class="operate">
                <el-button type="primary" class="blue-gra" size="mini">查询</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-row>
    <div class="main">
      <el-row class="ht" :gutter="10">
        <el-col class="ht" :span="12">
          <div class="his-module his-small" :style="{ height: listSlotHeight + 'px' }">
            <pagenation-list
              ref="pageTable"
              data-url
              v-model="medicalNumData"
              :list-height="listSlotHeight - 16 - 38 - 64"
              :searchData="searchData"
              http-method="post"
            >
              <el-table
                slot="list"
                stripe
                :data="medicalNumData"
                ref="pageTable"
                highlight-current-row
                :height="listSlotHeight - 16 - 38 - 64"
                class="scroll-bar"
                border
              >
                <el-table-column type="index" align="center" width="32"></el-table-column>
                <el-table-column prop="cyrq" label="出院日期"></el-table-column>
                <el-table-column prop="cyks" label="出院科室"></el-table-column>
                <el-table-column prop="cys" label="出院数"></el-table-column>
                <el-table-column prop="bas" label="病案数"></el-table-column>
                <el-table-column prop="dzjg" label="对照结果"></el-table-column>
              </el-table>
            </pagenation-list>
          </div>
        </el-col>
        <el-col class="ht" :span="12">
          <div class="his-module his-small" :style="{ height: listSlotHeight + 'px' }">
            <pagenation-list
              ref="pageTable"
              data-url
              v-model="medicalNumData"
              :list-height="listSlotHeight - 16 - 38 - 64"
              :searchData="searchData"
              http-method="post"
            >
              <el-table
                slot="list"
                stripe
                :data="medicalNumDetail"
                ref="pageTable"
                highlight-current-row
                :height="listSlotHeight - 16 - 38 - 64"
                class="scroll-bar"
                border
              >
                <el-table-column type="index" align="center" width="32"></el-table-column>
                <el-table-column prop="cyrq" label="出院日期"></el-table-column>
                <el-table-column prop="cyks" label="出院科室" width="70" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bah" label="病案号" width="87"></el-table-column>
                <el-table-column prop="xm" label="姓名" width="70"></el-table-column>
                <el-table-column prop="xb" label="性别" width="50"></el-table-column>
                <el-table-column prop="nl" label="年龄" width="60"></el-table-column>
                <el-table-column prop="dzjg" label="对照结果"></el-table-column>
              </el-table>
            </pagenation-list>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
@Component({
  name: 'checkMedicalNum',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private currentDate: string = ''
  private medicalRecordNum: string = ''
  private doctorList: Array<any> = []
  private medicalNumData: Array<any> = [
    { cyrq: '2016-05-02', cyks: '骨科', cys: 3, bas: 3 },
    { cyrq: '2016-05-01', cyks: '骨科', cys: 4, bas: 4 },
    { cyrq: '2016-05-02', cyks: '呼吸内科', cys: 5, bas: 4 },
    { cyrq: '2016-05-01', cyks: '呼吸内科', cys: 6, bas: 6 }
  ]
  private medicalNumDetail: Array<any> = [
    { cyrq: '2016-05-01', cyks: '骨科', bah: '7842423245', xm: '张三', xb: '男', nl: '70岁' },
    { cyrq: '2016-05-02', cyks: '呼吸内科', bah: '7842423243', xm: '李四', xb: '男', nl: '70岁' },
    { cyrq: '2016-05-01', cyks: '呼吸内科', bah: '7842423248', xm: '王五', xb: '男', nl: '70岁' }
  ]
  private searchData: any = {}
  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
.navigation {
  margin-bottom: 10px;
  .row {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
}
.content .his-module {
  height: auto !important;
}

.date-wrapper.el-input__inner{
    width: 220px;
}
</style>