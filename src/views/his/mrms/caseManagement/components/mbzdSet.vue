<template>
  <div class="content" style="height: auto;padding:0">
    <el-row class="ht" :gutter="10">
      <el-col :span="8">
        <div class="his-module his-small">
          <div class="row">
            <div class="label">
              <div class="title">待选择的列</div>
              <el-divider direction="vertical"></el-divider>
              <div class="tag" style="padding-left: 0">列名</div>
              <div>
                <el-input v-model="value" placeholder="请输入列名查询"></el-input>
              </div>
            </div>
          </div>
          <el-table
            border
            stripe
            highlight-current-rows
            ref="tableData"
            :fit="true"
            class="no-underline action-btns"
            :height="listSlotHeight - 127"
            tooltip-effect="light"
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="32"></el-table-column>
            <el-table-column prop="lm" label="列名"></el-table-column>
            <el-table-column prop="xzz" label="选择值"></el-table-column>
          </el-table>
          <!-- 穿梭按钮 -->
          <div class="left-right">
            <div style="margin-bottom:26px">
              <el-button
                :type="tableData.length!=0 ? 'primary': 'info'"
                :disabled="tableData.length==0"
                circle
                @click="toLeft"
              >
                <i class="icon his-lt-arrow"></i>
              </el-button>
            </div>
            <div>
              <el-button
                :type="tableData.length!=0 ? 'primary': 'info'"
                :disabled="tableData.length==0"
                circle
                @click="toRight"
              >
                <i class="icon his-rt-arrow"></i>
              </el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="his-module his-small">
          <div class="row">
            <div class="label">
              <div class="title">可选择的列</div>
              <el-divider direction="vertical"></el-divider>
              <div class="tag" style="padding-left: 0">列名</div>
              <div>
                <el-input v-model="value" placeholder="请输入列名查询"></el-input>
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="32"></el-table-column>
            <el-table-column prop="lm" label="列名"></el-table-column>
            <el-table-column prop="xzz" label="选择值"></el-table-column>
            <el-table-column prop label="新列名">
              <template slot-scope="scope">
                <el-input v-model="value"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop label="统计函数">
              <template slot-scope="scope">
                <el-select v-model="value" placeholder=" ">
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop label="排序号">
              <template slot-scope="scope">
                <el-input v-model="value"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop label="排序规则">
              <template>
                <el-select v-model="value" placeholder=" ">
                  <el-option label="从大到小" value="1" placeholder=" "></el-option>
                  <el-option label="从小到大" value="2" placeholder=" "></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
@Component({
  name: 'mbzdSet',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private value: any = '' // 调接口时删掉
  private tableData: Array<any> = [{}, {}]

  private handleSelectionChange() {}
  private toLeft() {}
  private toRight() {}

  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
@import '@/styles/inputTable.scss';
.his-small .row .label .el-input::v-deep .el-input__inner {
  width: 132px;
}

.left-right {
  // float: right;
  position: absolute;
  top: 30%;
  right: -24px;
  z-index: 9999;
  button {
    border: 1px solid $white;
  }
  .el-button--info.is-disabled,
  .el-button--info.is-disabled:hover,
  .el-button--info.is-disabled:focus,
  .el-button--info.is-disabled:active {
    background: $disabled;
  }
  .el-button--primary {
    background: $blue;
  }
  .el-button--medium.is-circle {
    position: relative;
    padding: 0;
    width: 36px;
    height: 36px;
    line-height: 36px;
    display: flex;
    justify-content: center;
    .icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
      font-size: 12px;
    }
  }
}
</style>