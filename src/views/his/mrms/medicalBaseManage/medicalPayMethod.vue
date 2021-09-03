<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 医疗付费方式
 -->
<template>
  <div class="content">
    <el-row class="ht" :gutter="10">
      <el-col class="ht" :span="16">
        <div class="his-module his-small">
          <el-row class="ht">
            <div class="row">
              <div class="label">
                <h1 class="title">医疗付费方式</h1>
              </div>
            </div>
            <el-col :span="12">
              <el-table
                :data="tableData1"
                border
                stripe
                highlight-current-rows
                class="no-underline"
                :height="listSlotHeight - 72"
              >
                <el-table-column prop="yldm" width='50' label="代码"></el-table-column>
                <el-table-column prop="ylfffs" label="医疗付费方式"></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table
                :data="tableData2"
                border
                stripe
                highlight-current-rows
                class="no-underline"
                :height="listSlotHeight - 72"
              >
                <el-table-column prop="yldm" width='50' label="代码"></el-table-column>
                <el-table-column prop="ylfffs" label="医疗付费方式"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col class="ht" :span="8">
        <div class="his-module his-small">
          <div class="row" style="padding-bottom: 8px">
            <div class="lable">
              <h1 class="title">付费方式对应SQL</h1>
            </div>
          </div>
          <el-form
            label-width="86px"
            style="margin:16px auto"
            :model="ruleForm"
            ref="ruleForm"
          >
            <el-form-item label="代码" prop="value">
              <el-input v-model="ruleForm.yldm" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="医疗付费方式">
              <el-input v-model="ruleForm.ylfffs" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="SQL语句">
              <el-input type="textarea" :rows="5" v-model="ruleForm.sql" placeholder="请输入..."></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'

@Component({
  name: 'medicalPayMethod',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight = 0
  private ruleForm: any = {
    yldm: '',
    ylfffs: '',
    sql: ''
  }
  private tableData1:Array<any> = [
      {
          yldm: '1',
          ylfffs: '城镇职工基本医疗保险'
      },
      {
          yldm: '2',
          ylfffs: '城镇居民基本医疗保险'
      },
      {
          yldm: '3',
          ylfffs: '新型农村合作医疗'
      },
      {
          yldm: '4',
          ylfffs: '贫困救助'
      },
      {
          yldm: '5',
          ylfffs: '商业医疗保险'
      }
  ]

  private tableData2:Array<any> = [
      {
          yldm: '6',
          ylfffs: '全公费'
      },
      {
          yldm: '7',
          ylfffs: '全自费'
      },
      {
          yldm: '8',
          ylfffs: '其他社会保险'
      },
      {
          yldm: '9',
          ylfffs: '其他'
      }
  ]
  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
.content .his-small .el-form{
  padding: 0 23px;
}
</style>
