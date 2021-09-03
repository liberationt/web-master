<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 复印登记
 -->
<template>
  <div class="content" style="padding: 0;">
    <div class="his-module his-small" :style="{ height:listSlotHeight -67 + 'px'}">
      <div class="row">
        <div class="label">
          <div class="title">复印登记</div>
        </div>
        <div class="operate">
          <el-button type="primary" class="blue-gra" size="mini">保存</el-button>
        </div>
      </div>
      <el-form :model="registData" ref="registDataRef" label-width="90px" class="retrieval">
        <div class="row" style="margin-top: 5px">
          <span class="separatedRegion line">
            <i class="icon his-detail"></i>病案信息
          </span>
        </div>
        <el-row type="flex" class="row1">
          <el-form-item label="住院号" prop="zyh">
            <el-input v-model="registData.zyh" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="xm">
            <el-input v-model="registData.xm" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="xb">
            <el-input v-model="registData.xb" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="nl">
            <el-input v-model="registData.nl" placeholder="请输入"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex" class="row2">
          <el-form-item label="出生日期" prop="csrq">
            <el-input v-model="registData.csrq" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="出院科室" prop="cyks">
            <el-input v-model="registData.cyks" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="医生" prop="ys">
            <el-input v-model="registData.ys" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
        </el-row>
        <div class="row" style="margin-top: 5px">
          <span class="separatedRegion line">
            <i class="icon his-detail"></i>复印信息
          </span>
        </div>
        <el-row type="flex" class="row3">
          <el-form-item label="申请复印人" prop="sqfyr">
            <el-input v-model="registData.sqfyr" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="申请人身份证号" prop="sqrsfzh">
            <el-input v-model="registData.sqrsfzh" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
        </el-row>
        <el-row type="flex" class="row4">
          <el-form-item label="接待人" prop="jdr">
            <el-input v-model="registData.jdr" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="经办人" prop="jbr">
            <el-input v-model="registData.jbr" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="复印受理日期" prop="fyslrq">
            <el-input v-model="registData.fyslrq" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="复印项目" prop="fyxm" style="width: 100%">
            <el-input v-model="registData.sqfyr" placeholder="请输入" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="复印数量" prop="fysl">
            <el-input v-model="registData.fysl" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="收费金额" prop="sfje">
            <el-input v-model="registData.sfje" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
@Component({
  name: 'copyRegistration',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private registData: any = {
    zyh: '',
    xm: '',
    xb: '',
    nl: '',
    csrq: '',
    cyks: '',
    ys: '',
    sqfjr: '',
    sqrsfzh: '',
    jdr: '',
    jbr: '',
    fyslrq: '',
    fyxm: '',
    fysl: '',
    sfje: ''
  }

  created() {
    // 计算表格列表高度
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
// 右侧表单样式分布
.content .his-small .retrieval .el-row .el-form-item {
  width: calc(25% - 8px);
}

.row .line {
  height: 18px;
  line-height: 18px;
  padding-bottom: 0px;
}
.content .his-small .el-form .el-form-item::v-deep .el-form-item__label {
  line-height: 14px;
}
</style>