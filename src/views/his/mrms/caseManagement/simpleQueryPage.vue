<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 首页数据简单查询
 -->
<template>
  <div class="content">
    <div class="his-module his-small">
      <div class="row">
        <div class="label">
          <div>首页数据简单查询</div>
          <el-divider direction="vertical"></el-divider>
          <div class="btn">
            <el-button size="mini" type="text">
              <i class="icon his-caozuo_search"></i>查询
            </el-button>
            <el-button size="mini" type="text">
              <i class="icon his-btn-print"></i>打印
            </el-button>
          </div>
        </div>
      </div>
      <el-form :model="searchList" ref="searchListRef" label-width="60px" class="retrieval">
        <el-row type="flex">
          <el-form-item label="姓名" prop="xm">
            <el-input v-model="searchList.xm" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="病院号" prop="byh">
            <el-input v-model="searchList.byh" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="出院科室" prop="cyks">
            <el-select v-model="searchList.cyks" placeholder="请输入">
                <el-option label="呼吸内科" value="1"></el-option>
                <el-option label="消化内科" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出院日期" prop="cyrq">
            <el-date-picker
              type="daterange"
              v-model="searchList.cyrq"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              class="date-wrapper"
              style="width: 215px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="searchList.examine1">已审核</el-checkbox>
            <el-checkbox v-model="searchList.examine2">未审核</el-checkbox>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="出院病区" prop="cybq">
            <el-select v-model="searchList.cybq" placeholder="请输入">
                <el-option label="一病区" value="1"></el-option>
                <el-option label="二病区" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主诊断" prop="zzd">
            <el-input v-model="searchList.zzd" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="主手术" prop="zss">
            <el-input v-model="searchList.zss" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="次诊断" prop="czd">
            <el-input v-model="searchList.czd" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="次手术" prop="css">
            <el-input v-model="searchList.css" placeholder="请输入"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <pagenation-list
        ref="pageTable"
        data-url
        http-method="post"
        v-model="tableData"
        :searchData="searchData"
        :list-height="listSlotHeight -120"
      >
        <el-table
          border
          stripe
          slot="list"
          highlight-current-row
          ref="tableData"
          :fit="true"
          class="no-underline action-btns"
          :height="listSlotHeight -182"
          :data="tableData"
          tooltip-effect="light"
        >
          <el-table-column type="index" width="32" align="center"></el-table-column>
          <el-table-column prop="bah" label="病案号" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xm" label="姓名" width="70"></el-table-column>
          <el-table-column prop="xb" label="性别" width="50"></el-table-column>
          <el-table-column prop="nl" label="年龄" width="50"></el-table-column>
          <el-table-column prop="cyrq" label="出院日期" width="85"></el-table-column>
          <el-table-column prop="zyts" label="住院天数" width="70"></el-table-column>
          <el-table-column prop="cyks" label="出院科室" min-width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zfy" label="总费用" width="60"></el-table-column>
          <el-table-column prop="zzd" label="主诊断" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lrsj" label="录入时间" min-width="95"></el-table-column>
          <el-table-column prop="shsj" label="审核时间" min-width="95"></el-table-column>
          <el-table-column prop="zt" label="状态" width="70"></el-table-column>
          <el-table-column label="操作" width="52" align="center">
            <template>
              <el-tooltip content="查看首页" effect="light">
                <el-button size="mini" type="text">
                  <i class="icon his-home"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </pagenation-list>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
@Component({
  name: 'simpleQueryPage',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private searchData: any = {}
  private searchList: any = {
    cyrq: '',
    examine1: '',
    examine2: '',
    xm: '',
    byh: ''
  }
  private tableData: Array<any> = [
    {
      bah: '202007012452',
      xm: '王小虎',
      xb: '男',
      nl: '70岁',
      cyrq: '2020-07-20',
      zyts: '10',
      cyks: '呼吸内科',
      zfy: '12000',
      zzd: '左手掌复合痣',
      lrsj: '2020-07-10 10:00',
      shsj: '2020-07-10 11:00',
      zt: '已审核'
    },
    {
      bah: '202007012452',
      xm: '王小虎',
      xb: '男',
      nl: '70岁',
      cyrq: '2020-07-20',
      zyts: '10',
      cyks: '呼吸内科',
      zfy: '12000',
      zzd: '左手掌复合痣',
      lrsj: '2020-07-10 10:00',
      shsj: '2020-07-10 11:00',
      zt: '已审核'
    },
    {
      bah: '202007012452',
      xm: '王小虎',
      xb: '男',
      nl: '70岁',
      cyrq: '2020-07-20',
      zyts: '10',
      cyks: '呼吸内科',
      zfy: '12000',
      zzd: '左手掌复合痣',
      lrsj: '2020-07-10 10:00',
      shsj: '2020-07-10 11:00',
      zt: '已审核'
    },
    {
      bah: '202007012452',
      xm: '王小虎',
      xb: '男',
      nl: '70岁',
      cyrq: '2020-07-20',
      zyts: '10',
      cyks: '呼吸内科',
      zfy: '12000',
      zzd: '左手掌复合痣',
      lrsj: '2020-07-10 10:00',
      shsj: '2020-07-10 11:00',
      zt: '已审核'
    },
  ]
  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style lang="scss" scoped>
.content .his-small .retrieval .el-row .el-form-item {
  width: calc(20% - 8px);
  white-space: nowrap;
}


</style>