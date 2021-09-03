// 首页数据综合查询
<template>
  <div class="content">
    <el-row class="ht" :gutter="10">
      <el-col :span="5">
        <div class="his-module his-small">
          <div>
            <div class="row">
              <div class="label">
                <div class="title">首页数据综合查询</div>
                <el-divider direction="vertical"></el-divider>
                <div class="btn">
                  <el-button type="text" size="mini" @click="handleAdd">
                    <i class="icon his-btn-add-copy"></i>新增
                  </el-button>
                </div>
              </div>
            </div>
            <el-table
              border
              stripe
              highlight-current-rows
              ref="searchData"
              :fit="true"
              class="no-underline action-btns"
              :height="listSlotHeight - 72"
              tooltip-effect="light"
              :data="searchData"
            >
              <el-table-column prop="mbmc" label="模板名称"></el-table-column>
              <el-table-column label="操作" width="67" align="center">
                <template slot-scope="scope">
                  <el-tooltip content="修改" effect="light">
                    <el-button size="mini" type="text" @click="handleEdit">
                      <i class="icon his-edit"></i>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip :content="$t('common.delete')" effect="light" :enterable="false">
                    <el-popconfirm
                      hideIcon
                      :confirmButtonText="$t('common.confirm')"
                      :cancelButtonText="$t('common.cancel')"
                      :title="$t('common.delTip')"
                      @onConfirm="handleDelete(scope.row)"
                    >
                      <el-button slot="reference" class="red">
                        <i class="icon his-del"></i>
                      </el-button>
                    </el-popconfirm>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <el-tabs class="tab-small" v-model="activeName" @tab-click="chooseName">
          <el-tab-pane label="模板字段设置" name="mbzdSet">
            <mbzd-set ref="mbzdSetRef"></mbzd-set>
          </el-tab-pane>
          <el-tab-pane label="模板查询条件设置" name="mbcxtjSet">
            <mbcxtj-set ref="mbcxtjSet"></mbcxtj-set>
          </el-tab-pane>
          <el-tab-pane label="查询结果显示" name="cxjgDisplay">
            <cxjg-display ref="cxjgDisplay"></cxjg-display>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog :title="isUpd ? '新增模板' : '修改模板'" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form :model="templateData" ref="templateRef" label-width="70px">
          <el-form-item label="模板名称">
            <el-input v-model="value"></el-input>
          </el-form-item>
          <el-form-item label="拼音码">
            <el-input v-model="value"></el-input>
          </el-form-item>
          <el-form-item label="五笔码">
            <el-input v-model="value"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
import mbzdSet from './components/mbzdSet.vue'
import mbcxtjSet from './components/mbcxtjSet.vue'
import cxjgDisplay from './components/cxjgDisplay.vue'
@Component({
  name: 'medicalDetailUpload',
  filters: {},
  components: {
    mbzdSet,
    mbcxtjSet,
    cxjgDisplay
  }
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private activeName: string = 'cxjgDisplay'
  private value: any = ''
  private dialogVisible: boolean = false
  private isUpd: boolean = true
  private templateData: any = {}
  private tableData: Array<any> = [{}]
  private searchData: Array<any> = [{ mbmc: '死亡病人' }, { mbmc: '抢救病人' }, { mbmc: '输血病人' }]

  private chooseName() {}
  private handleAdd() {
    this.dialogVisible = true
  }
  private handleEdit() {
    this.dialogVisible = true
  }

  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
::v-deep .el-tabs__nav-scroll {
  background: $white;
  border-radius: 8px;
  padding: 8px 10px;
}
::v-deep .el-dialog .el-dialog__body .el-form-item {
  margin-bottom: 16px;
}
</style>