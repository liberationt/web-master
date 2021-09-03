<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 病理诊断
 -->

<template>
  <div class="content">
    <el-row class="ht" :gutter="10">
      <el-col class="ht" :span="16">
        <div class="his-module his-small">
          <div class="row">
            <div class="label">
              <h1 class="title">病理诊断</h1>
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
          >
            <el-table-column type="index" width="32"></el-table-column>
            <el-table-column prop="blzd" label="病理诊断"></el-table-column>
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
              <h1 class="title">病理诊断详情</h1>
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
            label-width="67px"
            style="margin:16px auto"
            :model="ruleForm"
            ref="ruleForm"
            :rules="formRule"
          >
            <el-form-item label="病理诊断" prop="blzd">
              <el-input v-model="ruleForm.blzd" placeholder="请输入..."></el-input>
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
  name: 'pathologicDiagnosis',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight = 0
  private ruleForm: any = {
    blzd: '',
    jbbm: '',
    pydm: '',
    wbdm: ''
  }
  private tableData: Array<any> = [
    {
      blzd: '急性红细胞增多症',
      jbbm: 'M98410/3'
    },
    {
      blzd: '慢性红细胞增多症',
      jbbm: 'M98420/3'
    },
    {
      blzd: '海尔迈尔-舍纳症',
      jbbm: 'M98421/3'
    },
    {
      blzd: '淋巴肉瘤细胞白血病',
      jbbm: 'M98500/3'
    }
  ]
  private formRule: any = {
    blzd: [{ required: true, message: '请输入病理诊断', trigger: 'blur' }],
    jbbm: [{ required: true, message: '请输入疾病编码', trigger: 'blur' }],
    pydm: [{ required: true, message: '请输入拼音代码', trigger: 'blur' }],
    wbdm: [{ required: true, message: '请输入五笔代码', trigger: 'blur' }]
  }

  // 获取当前行数据
  private getRowData() {}

  // 新增
  private handleAdd() {

  }
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
