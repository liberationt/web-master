<!--
 * @Date:
 * @LastEditors:
 * @LastEditTime: 
 * @description: 病案资料复印
 -->
 <template>
  <div class="content">
    <!-- tab 标签页 -->
    <el-tabs class="tab-small" v-model="activeName" @table-click="chooseName">
      <el-tab-pane label="复印登记" name="copyRegistration">
        <copyRegistration ref="copyRegistration"></copyRegistration>
      </el-tab-pane>
      <el-tab-pane label="复印查询" name="copySearch">
        <copySearch ref="copySearch"></copySearch>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
import copyRegistration from './components/copyRegistration.vue'
import copySearch from './components/copySearch.vue'
@Component({
  name: 'medicalRecordsCopy',
  filters: {},
  components: {
    copyRegistration,
    copySearch
  }
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private activeName: string = 'copyRegistration'

  /* 切换tab，并查询对应tab的列表数据 */
  private chooseName(tab: any, event: any) {
    this.activeName = tab.name
    // this.searchData = {}
    // this.list = []
    // this.isCreateNew = true //修改状态
    // switch (tab.name) {
    //   case 'clinicUsing':
    //     this.searchData.ybdataId = 1
    //     ;(this.$refs.clinicUsing as any).getList()
    //     break
    //   case 'hisUsing':
    //     ;(this.$refs.hisUsing as any).getList()
    //     break
      
    // }
  }
  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
.tags-view-item {
  display: inline-block;
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  color: #9ca0ab;
  background: #eceded;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  border-radius: 8px;

  &:first-of-type {
    margin-left: 15px;
  }
  &:last-of-type {
    margin-right: 15px;
  }
  &.active {
    background: linear-gradient(315deg, rgba(45, 187, 255, 1) 0%, rgba(20, 133, 255, 1) 100%);
    color: #fff;
  }
}

.tab-small ::v-deep .el-tabs__header {
  border-bottom: 1px solid #f0f0f0 !important;
}

::v-deep .el-tabs__nav-scroll {
  background: $white;
  border-radius: 8px;
  padding: 8px 10px;
}
</style>