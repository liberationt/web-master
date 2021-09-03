<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 上海数据采集
 -->
<template>
  <div class="content">
    <div class="his-module his-small his-mrms-center" >
      <el-row type="flex">
        <div>上海全数据采集</div>
      </el-row>
      <el-form :model="collectData" ref="collectDataRef" label-width="60px">
        <el-row type="flex">
          <el-form-item label="年度" prop="nd">
            <el-input v-model="collectData.nd" placeholder="请输入年度"></el-input>
          </el-form-item>
          <el-form-item label="月份" prop="yf">
            <el-input v-model="collectData.yf" placeholder="请输入月份"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="出院日期" prop="cyrq">
            <el-date-picker
              type="daterange"
              v-model="collectData.cyrq"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              class="date-wrapper"
            ></el-date-picker>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="导出文件" prop="dcwj">
            <el-input v-model="collectData.dcwj" placeholder="请输入导出DBF文件路径和文件名"></el-input>
          </el-form-item>
          <div class="operate">
            <el-button type="primary" class="blue-gra" size="mini">选择</el-button>
          </div>
        </el-row>
        <el-row type="flex">
          <div class="operate">
            <el-button type="primary" class="blue-gra" size="mini">执行</el-button>
          </div>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'

@Component({
  name: 'collectData',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private collectData: any = {
    nd: '',
    yf: '',
    cyrq: '',
    dcwj: ''
  }

  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style lang="scss" scoped>
.his-mrms-center .el-row {
    justify-content: center;
    .el-form-item:nth-of-type(1) {
        margin-right: 10px;
    }
}
</style>