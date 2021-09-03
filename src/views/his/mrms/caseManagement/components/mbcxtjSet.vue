<template>
  <div class="content" style="padding: 0">
    <div class="his-module his-small">
      <div class="row">
        <div class="label">
          <div class="title">已设置的查询条件</div>
          <el-divider direction="vertical"></el-divider>
          <div class="btn">
            <el-button type="text" size="mini">
              <i class="icon his-btn-add"></i>新增
            </el-button>
            <el-button type="text" size="mini">
              <i class="icon his-btn-save"></i>保存
            </el-button>
          </div>
        </div>
      </div>
      <el-table
        border
        stripe
        highlight-current-rows
        ref="tableData"
        :fit="true"
        class="no-underline action-btns input-table"
        :height="listSlotHeight - 127"
        tooltip-effect="light"
        :data="tableData"
      >
        <el-table-column label="逻辑" prop>
            <template slot-scope="scope">
                <el-select v-model="value" placeholder=" ">
                    <el-option label="并且" value="并且"></el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="查询字段" prop>
            <template slot-scope="scope">
                <el-select v-model="value" placeholder=" ">
                    <el-option label="并且" value="并且"></el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="条件" prop>
            <template slot-scope="scope">
                <el-select v-model="value" placeholder=" ">
                    <el-option label="并且" value="并且"></el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="内容" prop>
            <template slot-scope="scope">
                <el-input v-model="value"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="52" align="center">
          <template slot-scope="scope">
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
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
@Component({
  name: 'mbcxtjSet',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private value: any =''
  private tableData:Array<any> = [{},{}] 

  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
@import '@/styles/inputTable.scss';
</style>