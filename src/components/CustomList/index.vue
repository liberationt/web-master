<!--
 * @Author: 曹俊
 * @LastEditTime: 2020-07-16 10:06:12
 * @LastEditors: 曹俊
 * @Description: 
 * @FilePath: \web-master\src\components\CustomList\index.vue
--> 
<template>
  <div class="pagenation-list" v-loading="showLoading">
    <!-- <div v-for="(item,index) in tableColumn" :key="index">
      {{item.tableName+'_'+item.columnName}}
    </div> -->
    <!-- 头部标题插槽 -->
    <slot name="header"></slot>
    <!-- 表格/列表插槽 -->
    <slot name="list"></slot>
    <!-- 描述内容插槽 -->
    <slot name="remark"></slot>
    <!-- 其他渲染 -->
    <slot name="render"></slot>
    <div class="page-footer">
      <el-pagination
        class="pagination"
        v-bind="pagePropsMixin"
        :pager-count="5"
        @current-change="
          (val) => {
            showLoading = true
            page = val
            getList(true)
          }
        "
        @size-change="
          (val) => {
            showLoading = true
            pageSize = val
            searchList()
          }
        "
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { customPageReq, getDesign , customPageRequest} from '@/api/his/basic/index.ts'
import { getTableData, dictExecuteSql } from '@/websql/functions'
import { formatInt, id2Name } from '@/utils'
import { log } from 'util'

@Component({
  name: 'pagenation-list',
})
export default class extends Vue {
  @Prop({ required: true }) private dataName!: string // 英文名称
  // @Prop({ required: true }) private dataUrl!: string // 查询接口
  @Prop({ required: false, default: 400 }) private listHeight!: string | number // tableList列表区域的高度, 最小400
  @Prop({ required: false, default: 40 }) private prec!: string | number // 插槽"list"区域内每条数据的高度, 默认40
  @Prop({ required: false, default: 'post' }) private httpMethod!: string // 请求方式
  @Prop({ required: false, default: () => {} }) private searchData!: Object // 搜索条件
  @Prop({ required: false, default: () => null }) private pageProps!: any //分页码选项

  private total: number = 0 //列表所有条数
  private page: number = 1 //当前页码
  private pageSizeOpts: Array<any> = [] //分页选项
  private pageSize: any = null //每页条数
  private showLoading: boolean = false
  private tableList: Array<any> = [] // 列表数据
  private tableColumn: Array<any> = [] // 列表字段
  private fixed: string | false = ''
  private dataList: Array<any> = [] 
  get pagePropsMixin() {
    // page组件的props混合
    return {
      // "background":true,
      layout: 'total, sizes, prev, pager, next, jumper', //默认全部功能
      ...this.pageProps, //根据外部定义覆盖
      total: this.total, //当前总数，内部维护
      'page-sizes': this.pageSizeOpts, //根据情况取值
      'page-size': this.pageSize, //默认取分页码选项第一个
      'current-page': this.page, //当前分页数，内部维护
    }
  }

  @Watch('pageSize', { immediate: true })
  private onPageSizeChange(val: any) {
    this.$emit('getPageSize', this.page, this.pageSize)
  }
  @Watch('page', { immediate: true })
  private onPageChange(val: any) {
    this.$emit('getPageSize', this.page, this.pageSize)
  }

  // 监听table数据
  @Watch('tableList', { immediate: true })
  private onTableListChange(val: any) {
    this.$emit('getTableData', this.tableList)
  }

  // 监听表格表头数据
  @Watch('tableColumn', { immediate: true })
  private onTableColumnChange(val: any) {
    this.$emit('getTableColumn', this.tableColumn)
  }

  created() {
   
  }
  mounted() {
    this.init()
    // this.getList()
    // console.log('dataName='+this.dataName)
  }

  get tableFormat() {
    let newData: Array<any> = []
    // newData = id2Name(this.tableList, 'MDC_TumourInspectionItem_startUsing', 'MDC_TumourInspectionItem_startUsing', this.dataList, 'dv', 'dn')
    // newData = id2Name(this.tableData, 'deptId', 'deptName', this.deptList, 'dv', 'dn')
    // newData = id2Name(this.tableData, 'postClassId', 'postName', this.postList, 'dv', 'dn')
    return newData
  }

  // 初始化参数
  private init() {
    let that = this
    // 获取列表表头
    getDesign(that.dataName).then((res: any) => {  
      if(res.data != null){
        let selectList: Array<any> = res.data.selectList
        this.tableColumn = selectList
      }
    })
    // 设置pageSizeOpts,pageSize初始值
    try {
      this.pageSizeOpts =
        this.pageProps['page-sizes'] != undefined
          ? this.pageProps['page-sizes']
          : [10, 20, 30, 40]
      this.pageSize = this.pageSizeOpts[0]
    } catch {
      this.pageSizeOpts = [10, 20, 30, 40]
      this.pageSize = formatInt(Number(this.listHeight) / Number(this.prec))
    }
    // console.log(this.listHeight , Number(this.listHeight) / Number(this.prec) ,this.pageSize)
  }
  private getList() {
    let that = this
    that.showLoading = true
    that.showLoading = false // 后期删掉
    // let proxy: string = this.dataType == '1' ? '/design' : '/hisapi' // 改变代理
    var param = {
      ...this.searchData,
      enName: that.dataName,
      pageSize: that.pageSize,
      pageNum: that.page,
    }
    customPageRequest(param).then((res: any) => {
      if (res.errorCode === 'SUCCESS') {
        res.data.list.map((item: any, index: number) => {
          item.webSortNumber = index + 1 + (that.page - 1) * that.pageSize
          item.webRowStatus = false
        }) 
        // console.log("list=")
        // console.log(res.data.list)
        that.tableList = res.data.list // 列表数据
        that.total = res.data.total // 总条数
        // 获取列匹配字典
        // console.log(this.tableColumn);
        if(that.tableColumn.length>0){
          that.$nextTick(function () {
            that.tableColumn.map((val:any) => {
              if(val.dicType != null && val.dicFid != null){
                // console.log(val)
                let fieldName = val.tableName +'_'+ val.columnName
                console.log(fieldName);
                
                if(val.dicType == 'SYS_DICT_CONFIG'){
                  // 获取 SYS_DICT_CONFIG 字典
                  that.getSysDictConfig(val.dicType,val.dicFid,fieldName)
                } else if(val.dicType == 'SYS_FLAG_DATA'){
                  // 获取 SYS_FLAG_DATA 字典
                  getTableData(
                    `${val.dicType}`,  
                    `${val.dicFid}`,
                    `select dv,dn from ${val.dicType}_VALUE where dk='${val.dicFid}'`,
                    function (data: any) {
                      // console.log(data)
                      if(data.length > 0){
                        that.tableList = id2Name(that.tableList, fieldName, fieldName, data, 'dv', 'dn')
                      }
                    }
                  )
                } else {
                  console.log(4)
                  // 获取 SYS_PRIMARY_DATA 字典
                  getTableData(
                    `${val.dicType}`,  
                    `${val.dicFid}`,
                    `select dv,dn from ${val.dicType}_VALUE where dk='${val.dicFid}'`,
                    function (data: any) {
                      // console.log(data)
                      if(data.length > 0){
                        that.tableList = id2Name(that.tableList, fieldName, fieldName, data, 'dv', 'dn')
                      }
                    }
                  )
                }
              }
            })
          })
        } 
        this.$emit('reqComplete',that.tableList)
      }else{
        this.$emit('input', [])
        this.total = 0
      }
    })
  }
  // 获取SYS_DICT_CONFIG字典
  private getSysDictConfig(dicType: string, dicFid: string,fieldName: string){
    let that = this
    getTableData(
      `${dicType}`,  
      // `SYS_DICT_CONFIG`,
      `${dicFid}`,
      // `12`,
      `select dv,dn from ${dicType}_VALUE where dk='${dicFid}'`,
      // `select dv,dn from SYS_DICT_CONFIG_VALUE where dk='12'`,
      function (data: any) {
        console.log("data=")
        console.log(data)
        if(data.length > 0){
          that.tableList = id2Name(that.tableList, fieldName, fieldName, data, 'dv', 'dn')
        }else{
          
        }
      }
    )
  }
  private searchList() {
    this.page = 1
    this.showLoading = true
    this.getList()
  }

  // 选中当前行
  private handleSelectRow(data: any){
    console.log(data);
    let param: any = {
      data: data,
      enName: this.dataName
    }
    this.$emit('selectCurrentRow',param)
  }
}
</script>

<style scoped lang="scss">
.pagenation-list {
  .page-footer {
    text-align: right;
    margin-top: 8px;
  }
}
.pagenation-small {
  .page-footer {
    text-align: left;
    width: 100%;
  }
}
</style>
