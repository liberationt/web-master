<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 损伤中毒外部原因
 -->

<template>
  <div class="content">
    <el-row class="ht" :gutter="10">
      <el-col class="ht" :span="16">
        <div class="his-module his-small">
          <div class="row">
            <div class="label">
              <h1 class="title">损伤中毒外部原因</h1>
            </div>
            <div class="operate">
              <el-button
                type="primary"
                class="blue-gra"
                icon="icon his-add"
                @click="handleAdd"
                size="mini"
              >{{$t('common.add')}}</el-button>
            </div>
          </div>

          <el-table
            :data="tableData"
            border
            stripe
            highlight-current-rows
            class="no-underline action-btns"
            :height="listSlotHeight - 72"
            @row-click="getRowData"
            tooltip-effect="light"
          >
            <el-table-column type="index" width="32"></el-table-column>
            <el-table-column prop="sszdwbyy" label="损伤中毒外部原因" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jbbm" label="疾病编码"></el-table-column>
            <el-table-column label="操作" width="67">
              <template slot-scope="scope">
                <!-- 删除 -->
                <el-tooltip :content="$t('common.delete')" effect="light">
                  <el-popconfirm
                    hideIcon
                    :confirmButtonText="$t('common.confirm')"
                    :cancelButtonText="$t('common.cancel')"
                    :title="$t('sysManage.confirmDeleted')"
                    @onConfirm="handleDelete(scope.row)"
                  >
                    <el-button slot="reference" class="red">
                      <i class="icon his-del his-cancellationicon"></i>
                    </el-button>
                  </el-popconfirm>
                </el-tooltip>
                <el-tooltip>
                  <el-popconfirm
                    class="action-btn"
                    hideIcon
                    :confirmButtonText="
                  scope.row.stopFlag == '0'
                    ? $t('common.disable')
                    : $t('common.enable')
                "
                    :cancelButtonText="$t('common.cancel')"
                    :title="
                  scope.row.stopFlag == '0'
                    ? $t('sysManage.confirmDisabled')
                    : $t('sysManage.confirmAutomated')
                "
                    @onConfirm="handleEnable(scope.row)"
                  >
                    <el-button
                      slot="reference"
                      :class="[scope.row.stopFlag == '0' ? 'red' : 'green']"
                    >
                      <i
                        class="icon"
                        :class="[
                      scope.row.stopFlag == '0'
                        ? 'his-disabled'
                        : 'his-automated',
                    ]"
                      ></i>
                    </el-button>
                  </el-popconfirm>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col class="ht" :span="8">
        <div class="his-module his-small">
          <div class="row" style="padding-bottom: 8px">
            <div class="lable">
              <h1 class="title">损伤中毒外部原因详情</h1>
            </div>
            <div class="operate">
              <el-button
                type="primary"
                class="green-gra"
                icon="icon his-save"
                @click="handleSave"
                size="mini"
              >{{$t('common.save')}}</el-button>
            </div>
          </div>
          <el-form
            label-width="120px"
            style="margin:16px auto"
            :model="ruleForm"
            ref="ruleForm"
            :rules="formRule"
          >
            <el-form-item label="损伤中毒外部原因" prop="sszdwbyy">
              <el-input v-model="ruleForm.sszdwbyy" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="疾病编码" prop="jbbm">
              <el-input v-model="ruleForm.jbbm" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="拼音码" prop="pydm">
              <el-input v-model="ruleForm.pydm" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="五笔码" prop="wbdm">
              <el-input v-model="ruleForm.wbdm" placeholder="请输入..."></el-input>
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
  name: 'sszdwbyy',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight = 0
  private ruleForm: any = {
    sszdwbyy: '',
    jbbm: '',
    pydm: '',
    wbdm: ''
  }
  private tableData: Array<any> = [
    {
      sszdwbyy: '维生素A意外中毒',
      jbbm: 'X44.912'
    },
    {
      sszdwbyy: '胃复安意外中毒',
      jbbm: 'X44.913'
    },
    {
      sszdwbyy: '抗过敏药意外中毒',
      jbbm: 'X44.914'
    },
    {
      sszdwbyy: '有机溶剂和卤素烃及其蒸汽意外中毒及暴露于该类物质',
      jbbm: 'X46.900'
    }
  ]
  private formRule: any = {
    sszdwbyy: [{ required: true, message: '请输入损伤中毒外部原因', trigger: 'blur' }],
    jbbm: [{ required: true, message: '请输入疾病编码', trigger: 'blur' }],
    pydm: [{ required: true, message: '请输入拼音代码', trigger: 'blur' }],
    wbdm: [{ required: true, message: '请输入五笔代码', trigger: 'blur' }]
  }

  // 获取当前行数据
  private getRowData() {}

  // 新增
  private handleAdd() {}
  // 保存
  private handleSave() {}

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
