<template>
  <div id="app">
    <div v-if="isState" style="height: 100%">
      <div :class="classObj" class="app-wrapper" v-if="!isLogin">
        <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <sidebar class="sidebar-container" />
        <div :class="{ hasTagsView: showTagsView }" class="main-container">
          <div :class="{ 'fixed-header': fixedHeader }">
            <navbar @changeAuth="changeAuth()" v-if="isShow"></navbar>
            <tags-view />
            <!-- <tags-view v-if="showTagsView" /> -->
          </div>
          <!-- <router-view v-if="isShow" /> -->
          <service-worker-update-popup />
          <!-- 子应用渲染区 -->
          <!-- qiankun2.0  container 模式-->
          <div id="subapp-viewport" class="app-view-box"></div>
        </div>
      </div>
      <router-view v-else />
    </div>
    <div v-else style="position: absolute; top: 0; left: 0; z-index: 999; width: 100%; height: 100%" v-loading="fullscreenLoading" element-loading-text="加载中..."></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'
import { getTableData, getNewDict } from '@/websql/functions'
import { mixins } from 'vue-class-component'
import { DeviceType, AppModule } from '@/store/modules/app'
import { SettingsModule } from '@/store/modules/settings'
import { Navbar, Settings, Sidebar, TagsView } from '@/layout/components'
import RightPanel from '@/components/RightPanel/index.vue'
import ResizeMixin from '@/layout/mixin/resize'

@Component({
  name: 'App',
  components: {
    ServiceWorkerUpdatePopup,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
  },
})
// export default class extends Vue {
export default class extends mixins(ResizeMixin) {
  @Provide('reload')
  private reload() {
    this.isShow = false
    this.$nextTick(() => {
      this.isShow = true
    })
  }
  private setIntervalFun: any = null
  private isShow: boolean = true

  private height = 0

  private isLogin = true

  private isGetAuth: boolean = false //判断navbar是否已渲染完毕

  private stateArr: number[] = [] //自定加载状态

  private isState = false
  private fullscreenLoading = true

  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile,
    }
  }

  get showSettings() {
    return SettingsModule.showSettings
  }

  get showTagsView() {
    return SettingsModule.showTagsView
  }

  get fixedHeader() {
    return SettingsModule.fixedHeader
  }

  get dialogItem() {
    return AppModule.dialogInfo
  }

  // get isLogin(){
  //   if (location.href?.indexOf('his/login') != -1 || location.href?.indexOf('his/LoadingData') != -1) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  @Watch('$route', { immediate: true })
  private onRouteChange() {
    if (location.href?.indexOf('/login') != -1 || location.href?.indexOf('/LoadingData') != -1) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }

  @Watch('stateArr', { immediate: true })
  private onChangeVaue(val: number[]) {
    if (val && val.length > 0) {
      // console.log(val.length);
      if (val.length == 206) {
        this.isState = true
        this.fullscreenLoading = false
        // console.log('):', this.isState)
      }
    } else {
      this.isState = false
    }
  }

  private handleClickOutside() {
    AppModule.CloseSideBar(false)
  }
  private changeAuth(val: boolean) {
    // console.log("可以渲染界面了!")
    this.isGetAuth = true
  }

  beforeMount() {
    this.height = document.documentElement.clientHeight || document.body.clientHeight
  }

  created() {
    const store: any = this.$store // 声明store实例
    const sessionStorageStore = sessionStorage.getItem('store') || ''
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorageStore)))
      sessionStorage.removeItem('store')
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })
  }

  mounted() {
    let that = this
    window.addEventListener('resize', function () {
      that.height = document.documentElement.clientHeight || document.body.clientHeight
    })
    // 定时获取前端字典
    const store: any = that.$store // 声明store实例
    that.getDictNewData(store) // 直接用实例获取一次最新数据
    // that.setIntervalFun = setInterval(function () {
    //   that.getDictNewData(store) // 直接用实例获取一次最新数据
    //   getNewDict() // 开始定时请求最新dict数据
    // }, 60000 * 10)
  }
  beforeDestroy() {
    let that = this
    // 销毁定时器
    // clearInterval(that.setIntervalFun)
  }

  @Watch('height', { immediate: true })
  private onHeightChange(val: number) {
    Vue.prototype.PageHeight = val - 32 - 38 //减去页面上固定高度height
  }

  private getDictNewData(store: any) {
    let _this = this
    _this.stateArr = []
    // 号表字典取最新
    getTableData('SYS_DICT_CONFIG', '1', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='1'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TABLE_NO_DICT', data)
      // console.log('号表字典:', store.state.webSqlDict.TABLE_NO_DICT)
    })
    // 诊室字典取最新
    getTableData('SYS_DICT_CONFIG', '2', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='2'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DIAG_ROOM_DICT', data)
      // console.log('诊室字典:', store.state.webSqlDict.DIAG_ROOM_DICT)
    })
    // 科室字典取最新（不要用）
    getTableData('SYS_DICT_CONFIG', '4', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='4'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DEPT_DICT', data)
      // console.log('科室字典:', store.state.webSqlDict.DEPT_DICT)
    })

    // 住院病区字典
    getTableData('SYS_DICT_CONFIG', '47', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='47'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SYS_HOSPITAL_DICT', data)
      // console.log('科室字典:', store.state.webSqlDict.SYS_HOSPITAL_DICT)
    })

    // 停用标识取最新
    getTableData('SYS_FLAG_DATA', 'FD000011', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000011'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_STOP_FLAG_DICT', data)
      // console.log('停用标识字典:', store.state.webSqlDict.STOP_FLAG_DICT)
    })

    // 病人性质标识取最新
    getTableData('SYS_DICT_CONFIG', '14', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='14'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TABLE_PATIENT_DICT', data)
      // console.log('病人性质标识字典:', store.state.webSqlDict.TABLE_PATIENT_DICT)
    })
    // 医生字典取最新
    getTableData('SYS_DICT_CONFIG', '17', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='17'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TABLE_DOCTOR_DICT', data)
      // console.log('医生字典:', store.state.webSqlDict.TABLE_DOCTOR_DICT)
    })
    // 结算类型字典取最新
    getTableData('SYS_PRIMARY_DATA', 'PD0000000734', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000734'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SETTLEMENT_TYPE_DICT', data)
      // console.log(data, '结算类型字典')
      // console.log('结算类型字典:', store.state.webSqlDict.SETTLEMENT_TYPE_DICT)
    })
    // 性别字典取最新
    getTableData('SYS_PRIMARY_DATA', 'PD0000000269', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000269'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SEX_DICT', data)
      // console.log('性别字典:', store.state.webSqlDict.SEX_DICT)
    })
    // 病区字典取最新
    getTableData('SYS_DICT_CONFIG', '18', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='18'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_WARD_DICT', data)
      // console.log('病区字典:', store.state.webSqlDict.WARD_DICT)
    })
    // 出院判别字典取最新
    getTableData('SYS_PRIMARY_DATA', 'PD0000000728', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000728'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_OUTP_JUDGE_DICT', data)
      // console.log('出院判别字典:', store.state.webSqlDict.OUTP_JUDGE_DICT)
    })
    //  诊断部位取最新
    getTableData('SYS_PRIMARY_DATA', 'PD0000000042', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000042'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DIAGNOSE_BODY_PART', data)
      // console.log('诊断部位字典:', store.state.webSqlDict.DIAGNOSE_BODY_PART)
    })
    // 缴款方式取最新
    getTableData('SYS_DICT_CONFIG', '20', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='20'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PAY_METHOD_DICT', data)
      // console.log('缴款方式字典:', store.state.webSqlDict.PAY_METHOD_DICT)
    })
    // 转存判别取最新
    getTableData('SYS_FLAG_DATA', 'ZY000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='ZY000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REDEPOSIT_JUDGE_DICT', data)
      // console.log('转存判别字典:', store.state.webSqlDict.REDEPOSIT_JUDGE_DICT)
    })
    // 科室代码取最新
    getTableData('SYS_DICT_CONFIG', '15', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='15'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DEP_CODE_DICT', data)
      // console.log('科室代码:', store.state.webSqlDict.DEP_CODE_DICT)
    })
    // 主治医生取最新
    getTableData('SYS_DICT_CONFIG', '19', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='19'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ZZYS_DICT', data)
      // console.log('主治医生字典:', store.state.webSqlDict.ZZYS_DICT)
    })
    // 入院目的取最新
    getTableData('SYS_PRIMARY_DATA', 'PD0000000729', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000729'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_INPAT_MD_DICT', data)
      // console.log('入院目的字典:', store.state.webSqlDict.INPAT_MD_DICT)
    })
    // 登记类型字典取最新
    getTableData('SYS_PRIMARY_DATA', 'PD0000000731', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000731'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REGISTER_TYPE_DICT', data)
      // console.log('登记类型字典:', store.state.webSqlDict.REGISTER_TYPE_DICT)
    })
    // 住院登记申请状态字典取最新
    getTableData('SYS_PRIMARY_DATA', 'PD0000000730', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000730'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_INPAT_REQ_STATUS_DICT', data)
      // console.log('住院登记申请状态字典:', store.state.webSqlDict.INPAT_REQ_STATUS_DICT)
    })
    // 门诊科室列表字典取最新
    getTableData('SYS_DICT_CONFIG', '10', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='10'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_OUTPATIENT_DEPARTMENT', data)
      // console.log('门诊科室列表:', store.state.webSqlDict.OUTPATIENT_DEPARTMENT)
    })
    // 检查状态字典取最新
    getTableData('SYS_PRIMARY_DATA', 'PD0000000732', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000732'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CHECK_STATUS', data)
      // console.log('检查状态列表:', store.state.webSqlDict.CHECK_STATUS)
    })
    // 入院情况字典取最新
    getTableData('SYS_FLAG_DATA', 'RY000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='RY000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_INPAT_HOSP_STATUS_DICT', data)
      // console.log('入院情况:', store.state.webSqlDict.INPAT_HOSP_STATUS_DICT)
    })
    // 诊断类别字典取最新
    getTableData('SYS_FLAG_DATA', 'ZD000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='ZD000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ZD_CATEGORY_DICT', data)
      // console.log('诊断类别:', store.state.webSqlDict.ZD_CATEGORY_DICT)
    })
    // 入院病情字典取最新
    getTableData('SYS_FLAG_DATA', 'RY000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='RY000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_INPAT_HOSP_DICT', data)
      // console.log('入院病情:', store.state.webSqlDict.INPAT_HOSP_DICT)
    })
    // 结果情况字典取最新
    getTableData('SYS_FLAG_DATA', 'JG000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JG000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_RESILT_STATUS_DICT', data)
      // console.log('结果情况:', store.state.webSqlDict.RESILT_STATUS_DICT)
    })
    // 使用标志字典取最新
    getTableData('SYS_FLAG_DATA', 'TJ000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='TJ000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_USE_FLAG_DICT', data)
      // console.log('使用标志:', store.state.webSqlDict.USE_FLAG_DICT)
    })
    // 频次字典取最新
    getTableData('SYS_DICT_CONFIG', '26', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='26'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_FREQUENCY_DICT', data)
      // console.log('频次字典:', store.state.webSqlDict.FREQUENCY_DICT)
    })
    // 住院药房字典取最新
    getTableData('SYS_DICT_CONFIG', '24', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='24'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PHARMACY_INPAT_DICT', data)
      // console.log('住院药房字典:', store.state.webSqlDict.PHARMACY_INPAT_DICT)
    })
    // 发药药房字典取最新
    getTableData('SYS_DICT_CONFIG', '38', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='38'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DISPENSARY_DICT', data)
      // console.log('发药药房字典:', store.state.webSqlDict.DISPENSARY_DICT)
    })
    // 药品用法字典取最新
    getTableData('SYS_DICT_CONFIG', '25', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='25'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_METHOD_DICT', data)
      // console.log('药品用法:', store.state.webSqlDict.DRUG_METHOD_DICT)
    })
    // 执行标志字典取最新
    getTableData('SYS_FLAG_DATA', 'QR000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='QR000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CAST_FLAG_DICT', data)
      // console.log('执行标志:', store.state.webSqlDict.CAST_FLAG_DICT)
    })
    getTableData('SYS_FLAG_DATA', 'FD000020', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000020'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_INVENTORY_STATUS_DICT', data)
      // console.log('执行标志:', store.state.webSqlDict.INVENTORY_STATUS_DICT)
    })
    // 结束标志字典取最新
    getTableData('SYS_FLAG_DATA', 'JS000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JS000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_END_FLAG_DICT', data)
      // console.log('结束标志:', store.state.webSqlDict.END_FLAG_DICT)
    })
    // 提交标志字典取最新
    getTableData('SYS_FLAG_DATA', 'TJ000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='TJ000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SUBMIT_FLAG_DICT', data)
      // console.log('提交标志:', store.state.webSqlDict.SUBMIT_FLAG_DICT)
    })
    // 紧急标志字典取最新
    getTableData('SYS_FLAG_DATA', 'JJ000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JJ000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_URGENT_FLAG_DICT', data)
      // console.log('紧急标志:', store.state.webSqlDict.URGENT_FLAG_DICT)
    })
    // 医疗机构
    getTableData('SYS_DICT_CONFIG', '28', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='28'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_HOSPITAL_DICT', data)
      // console.log('医疗机构:', store.state.webSqlDict.HOSPITAL_DICT)
    })
    // 门诊药房包装类别字典取最新
    getTableData('SYS_FLAG_DATA', 'FD000004', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000004'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PACK_STYLE_DICT', data)
      // console.log('包装类别:', store.state.webSqlDict.SET_PACK_STYLE_DICT)
    })
    // 门诊药房上级机构字典取最新（医疗机构）
    getTableData('SYS_DICT_CONFIG', '6', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='6'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SUPER_ORGAN_DICT', data)
      // console.log('上级机构:', store.state.webSqlDict.SUPER_ORGAN_DICT)
    })
    // 门诊药房上级药房字典取最新
    getTableData('SYS_DICT_CONFIG', '5', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='5'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SUPER_PHA_DICT', data)
      // console.log('上级药房:', store.state.webSqlDict.SUPER_PHA_DICT)
    })
    // 门诊药房对应药库字典取最新
    getTableData('SYS_DICT_CONFIG', '7', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='7'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CORRES_PHA_DICT', data)
      // console.log('对应药库:', store.state.webSqlDict.CORRES_PHA_DICT)
    })
    // 脚注字典取最新
    getTableData('SYS_PRIMARY_DATA', 'PD0000000733', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000733'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_JZ_DICT', data)
      // console.log('执行标志:', store.state.webSqlDict.JZ_DICT)
    })
    // 药库-入库对应方式字典
    getTableData('SYS_FLAG_DATA', 'YK000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YK000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_INPUTCORRESPOND_DICT', data)
      // console.log('入库对应方式字典:', store.state.webSqlDict.DRUG_INPUTCORRESPOND_DICT)
    })
    // 药库-出库对应方式字典
    getTableData('SYS_FLAG_DATA', 'YK000003', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YK000003'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_OUTCORRESPOND_DICT', data)
      // console.log('出库对应方式字典:', store.state.webSqlDict.DRUG_OUTCORRESPOND_DICT)
    })
    // 药库-药品类别字典
    getTableData('SYS_FLAG_DATA', 'FD000016', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000016'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_DRUGTYPE_DICT', data)
      // console.log('药品类别字典:', store.state.webSqlDict.DRUG_DRUGTYPE_DICT)
    })
    // 药库-医保分类字典
    getTableData('SYS_FLAG_DATA', 'FD000023', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000023'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_MEDICARECLASS_DICT', data)
      // console.log('医保分类字典:', store.state.webSqlDict.DRUG_MEDICARECLASS_DICT)
    })
    // 药库-药品档次字典
    getTableData('SYS_FLAG_DATA', 'FD000021', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000021'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_DRUGGRADE_DICT', data)
      // console.log('药品档次字典:', store.state.webSqlDict.DRUG_DRUGGRADE_DICT)
    })
    // 药库-药品费别字典
    getTableData('SYS_FLAG_DATA', 'FD000017', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000017'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_DRUGCHARGES_DICT', data)
      // console.log('药品费别字典:', store.state.webSqlDict.DRUG_DRUGCHARGES_DICT)
    })
    // 药库-药品剂型字典
    getTableData('SYS_DICT_CONFIG', '30', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='30'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_DRUGDOSAGEFORM_DICT', data)
      // console.log('药品剂型字典:', store.state.webSqlDict.DRUG_DRUGDOSAGEFORM_DICT)
    })
    // 药库-药品贮藏字典
    getTableData('SYS_FLAG_DATA', 'FD000022', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000022'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_DRUGSTORAGE_DICT', data)
      // console.log('药品贮藏字典:', store.state.webSqlDict.DRUG_DRUGSTORAGE_DICT)
    })
    // 药库-药品产地字典
    getTableData('SYS_DICT_CONFIG', '27', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='27'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_DRUGMADEIN_DICT', data)
      // console.log('药品产地字典:', store.state.webSqlDict.DRUG_DRUGMADEIN_DICT)
    })
    // 药库-特殊药品|指定药品字典
    getTableData('SYS_FLAG_DATA', 'FD000024', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000024' and stop = 0`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_SEPCIALDRUG_DICT', data)
      // console.log('特殊药品|指定药品字典:', store.state.webSqlDict.DRUG_SEPCIALDRUG_DICT)
    })
    // 药库-处方药品
    getTableData('SYS_FLAG_DATA', 'FD000032', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000032'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_PRESCIBEDRUG_DICT', data)
      // console.log('处方药品:', store.state.webSqlDict.DRUG_PRESCIBEDRUG_DICT)
    })
    // 药库-零售价格定价方式
    getTableData('SYS_FLAG_DATA', 'YK000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YK000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_RETAILPRICE_DICT', data)
      // console.log('零售价格定价方式:', store.state.webSqlDict.DRUG_RETAILPRICE_DICT)
    })
    // 药库-GMP标志
    getTableData('SYS_FLAG_DATA', 'FD000039', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000039'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_GMPSIGN_DICT', data)
      // console.log('GMP标志:', store.state.webSqlDict.DRUG_GMPSIGN_DICT)
    })
    // 药库-药品类型
    getTableData('SYS_DICT_CONFIG', '33', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='33'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_DRUGCLASS_DICT', data)
      // console.log('药品类型字典:', store.state.webSqlDict.DRUG_DRUGCLASS_DICT)
    })
    // 药库-医保信息启用标志
    getTableData('SYS_FLAG_DATA', 'FD000038', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000038'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_ENABLEFLAG_DICT', data)
      // console.log('药库-医保信息启用标志:', store.state.webSqlDict.DRUG_ENABLEFLAG_DICT)
    })

    // 药库-基药类型
    getTableData('SYS_FLAG_DATA', 'FD000027', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000027'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_BASICTYPE_DICT', data)
      // console.log(' 药库-基药类型:', store.state.webSqlDict.DRUG_BASICTYPE_DICT)
    })
    // 药库-抗生素标志
    getTableData('SYS_FLAG_DATA', 'FD000033', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000033'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_ANTIBIOTC_DICT', data)
      // console.log('药库-抗生素标志:', store.state.webSqlDict.DRUG_ANTIBIOTC_DICT)
    })

    // 药库-皮试判别
    getTableData('SYS_FLAG_DATA', 'FD000026', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000026'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_SKINTEST_DICT', data)
      // console.log('药库-皮试判别:', store.state.webSqlDict.DRUG_SKINTEST_DICT)
    })
    // 药库-取整策略
    getTableData('SYS_FLAG_DATA', 'FD000018', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000018'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_ROUNDING_DICT', data)
      // console.log('药库-取整策略:', store.state.webSqlDict.DRUG_ROUNDING_DICT)
    })
    // 药库-账簿类别
    getTableData('SYS_FLAG_DATA', 'FD000025', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000025'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_BOOK_DICT', data)
      // console.log('药库-账簿类别:', store.state.webSqlDict.DRUG_BOOK_DICT)
    })
    // 药库-自备药标识-转方药品/抗菌药物管理分级 | 实现限制类抗菌药物以非限制类管理/注射药品
    getTableData('SYS_FLAG_DATA', 'FD000005', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000005'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_BOOLEAN_DICT', data)
      // console.log('药库-自备药标识-转方药品/抗菌药物管理分级 | 实现限制类抗菌药物以非限制类管理/注射药品:', store.state.webSqlDict.DRUG_BOOLEAN_DICT)
    })
    // 药库-支付
    getTableData('SYS_FLAG_DATA', 'FD000031', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000031'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_PAY_DICT', data)
      // console.log(' 药库-支付:', store.state.webSqlDict.DRUG_PAY_DICT)
    })
    // 药库-过敏药类别
    getTableData('SYS_FLAG_DATA', 'FD000030', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000030'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_ALLERGY_DICT', data)
      // console.log('药库-过敏药类别:', store.state.webSqlDict.DRUG_ALLERGY_DICT)
    })
    // 药库-抗生药物分级
    getTableData('SYS_FLAG_DATA', 'FD000034', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000034'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_CLASSIFICATION_DICT', data)
      // console.log('药库-抗生药物分级:', store.state.webSqlDict.DRUG_CLASSIFICATION_DICT)
    })
    // 药库-抗菌药物是否需要审批
    getTableData('SYS_FLAG_DATA', 'FD000036', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000036'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_APPROVAL_DICT', data)
      // console.log('药库-抗菌药物是否需要审批:', store.state.webSqlDict.DRUG_APPROVAL_DICT)
    })
    // 药库-抗菌药物越权使用方式
    getTableData('SYS_FLAG_DATA', 'FD000035', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000035'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_UITRAVIRES_DICT', data)
      // console.log('药库-抗菌药物越权使用方式:', store.state.webSqlDict.DRUG_UITRAVIRES_DICT)
    })
    // 药库-用药标识
    getTableData('SYS_FLAG_DATA', 'FD000029', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000029'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_PHARMACY_DICT', data)
      // console.log('药库-用药标识:', store.state.webSqlDict.DRUG_PHARMACY_DICT)
    })
    // 药库-中标类型
    getTableData('SYS_FLAG_DATA', 'FD000028', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000028'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_BIDTYPE_DICT', data)
      // console.log('药库-中标类型:', store.state.webSqlDict.DRUG_BIDTYPE_DICT)
    })

    // 药库-用药限制
    getTableData('SYS_FLAG_DATA', 'FD000040', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000040'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_LIMIT_DICT', data)
      // console.log('药库-中标类型:', store.state.webSqlDict.DRUG_LIMIT_DICT)
    })

    // 药库-库存性质
    getTableData('SYS_FLAG_DATA', 'FD000037', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000037'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_INVNATURE_DICT', data)
      // console.log('药库-库存性质:', store.state.webSqlDict.DRUG_INVNATURE_DICT)
    })

    // 药库-购入方式
    getTableData('SYS_FLAG_DATA', 'FD000042', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000042'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_BUYTYPE_DICT', data)
      // console.log('药库-购入方式:', store.state.webSqlDict.DRUG_BUYTYPE_DICT)
    })

    // 药库-次品类型
    getTableData('SYS_FLAG_DATA', 'FD000043', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000043'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_SECONDS_DICT', data)
      // console.log('药库-次品类型:', store.state.webSqlDict.DRUG_SECONDS_DICT)
    })
    // 药库-调价方式
    getTableData('SYS_FLAG_DATA', 'FD000044', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000044'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_MODIFYPRICE_DICT', data)
      // console.log('药库-调价方式:', store.state.webSqlDict.DRUG_MODIFYPRICE_DICT)
    })

    // 药库-损坏原因
    getTableData('SYS_FLAG_DATA', 'FD000046', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000046'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_DAMAGE_DICT', data)
      // console.log('药库-损坏原因:', store.state.webSqlDict.DRUG_DAMAGE_DICT)
    })

    // 药库-审核状态
    getTableData('SYS_PRIMARY_DATA', 'YP0000000001', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='YP0000000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_AUDITSTATUS_DICT', data)
      // console.log('药库-审核状态:', store.state.webSqlDict.DRUG_AUDITSTATUS_DICT)
    })

    // 药库-处理状态
    getTableData('SYS_PRIMARY_DATA', 'YP0000000002', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='YP0000000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_PROCESSSTATUS_DICT', data)
      // console.log('药库-处理状态:', store.state.webSqlDict.DRUG_PROCESSSTATUS_DICT)
    })

    // 药库-库存性质
    getTableData('SYS_FLAG_DATA', 'FD000014', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000014'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_INVENATURE_DICT', data)
      // console.log('药库-库存性质:', store.state.webSqlDict.DRUG_INVENATURE_DICT)
    })

    // 药库-处方权限
    getTableData('SYS_FLAG_DATA', 'FD000005', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000005'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_PRESCRPTION_DICT', data)
      // console.log('药库-库存性质:', store.state.webSqlDict.DRUG_PRESCRPTION_DICT)
    })

    // 药库-进货单位
    getTableData('SYS_DICT_CONFIG', '49', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='49'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_PURCHASEUNIT_DICT', data)
      // console.log('执行标志:', store.state.webSqlDict.DRUG_PURCHASEUNIT_DICT)
    })

    // 频次-每日次数字典取最新
    getTableData('SYS_DICT_CONFIG', '29', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='29'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_FREQUENCY_DAY_DICT', data)
      // console.log('执行标志:', store.state.webSqlDict.JZ_DICT)
    })
    // 药库类别
    getTableData('SYS_FLAG_DATA', 'FD000007', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000007'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PHA_SORT_DICT', data)
      // console.log('药品类别:', store.state.webSqlDict.PHA_SORT_DICT)
    })
    // 使用标志
    getTableData('SYS_FLAG_DATA', 'FD000006', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000006'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_USE_SIGN_DICT', data)
      // console.log('使用标志:', store.state.webSqlDict.USE_SIGN_DICT)
    })
    // 领用方式（出库方式）
    getTableData('SYS_DICT_CONFIG', '9', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='9'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_OUTBOUND_STYLE_DICT', data)
    })
    // 皮试结果
    getTableData('SYS_PRIMARY_DATA', 'PD0000000735', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000735'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PS_RESULT_DICT', data)
    })
    //  中西类别
    getTableData('SYS_FLAG_DATA', 'ZX000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='ZX000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ZX_TYPE_DICT', data)
    })
    //   门诊 执行科室/转诊科室字典
    getTableData('SYS_DICT_CONFIG', '32', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='32'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_MZ_ZXKS_DICT', data)
    })
    //  提交病区
    getTableData('SYS_DICT_CONFIG', '15', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='15'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TJ_INPATIENT_DICT', data)
    })

    //  发药方式
    getTableData('SYS_DICT_CONFIG', '31', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='31'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_FY_STYLE_DICT', data)
    })
    //  不带全部的发药方式
    getTableData('SYS_DICT_CONFIG', '2', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='2'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SYS_FYFS_DATA', data)
    })
    //  发药方式
    getTableData('SYS_FLAG_DATA', 'FD000015', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000015'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SYS_FLAG_DATA', data)
    })

    //  中医证候字典
    getTableData('SYS_DICT_CONFIG', '34', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='34'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ZY_ZH_DICT', data)
    })
    //   中医诊断字典
    getTableData('SYS_DICT_CONFIG', '35', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='35'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ZY_ZD_DICT', data)
    })

    // 是/否
    getTableData('SYS_FLAG_DATA', 'FD000005', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000005'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_Y_OR_N_DICT', data)
    })

    //   挂号科室列表字典
    getTableData('SYS_DICT_CONFIG', '13', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='13'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REGISTERATION_DEPARTMENT_DICT', data)
    })

    //  退药原因
    getTableData('SYS_PRIMARY_DATA', 'PD0000000736', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000736'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SYS_PRIMARY_DATA', data)
    })

    //  药品出库方式
    getTableData('SYS_DICT_CONFIG', '9', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='9'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CHECKOUT_STYLE_DATA', data)
    })

    //  挂号预约类型
    getTableData('SYS_FLAG_DATA', 'YY000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YY000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_APPOINTMENT_TYPE_DICT', data)
    })

    //  挂号预约状态
    getTableData('SYS_FLAG_DATA', 'YY000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YY000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_APPOINTMENT_STATUS_DICT', data)
    })

    //  检查设备
    getTableData('SYS_FLAG_DATA', 'JCSB0001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JCSB0001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_JCSB_DICT', data)
    })
    // 护理等级
    getTableData('SYS_FLAG_DATA', 'HL000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='HL000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_HL_LEVEL_DICT', data)
    })
    // 出院判别
    getTableData('SYS_FLAG_DATA', 'CY000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='CY000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_OUTP_TYPE_DICT', data)
    })
    // 所属类别
    getTableData('SYS_FLAG_DATA', 'CS000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='CS000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CATEGORY_DICT', data)
    })

    // 药品费别
    getTableData('SYS_FLAG_DATA', 'FD000017', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000017'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_COSTTYPE_DICT', data)
    })

    // 接口类型
    getTableData('SYS_FLAG_DATA', 'JK000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JK000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_INTERFACE_TYPE_DICT', data)
    })

    // 领药库房
    getTableData('SYS_DICT_CONFIG', '7', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='7'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CORRES_PHA_DICTCORRES_PHA_DICT', data)
    })

    // 退药方式
    getTableData('SYS_DICT_CONFIG', '9', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='9'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_BACK_MEDICINE_STYLE', data)
    })

    // 养护-损坏原因
    getTableData('SYS_FLAG_DATA', 'FD000045', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000045' ORDER BY dv`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CURING_INJURE_REASON', data)
    })

    // 麻醉方法
    getTableData('SYS_PRIMARY_DATA', 'PD0000000193', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000193'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_MZFF_DICT', data)
    })

    // 费用归并
    getTableData('SYS_DICT_CONFIG', '40', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='40'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_COST_CONSOLIDATION', data)
    })

    // 手术科室
    getTableData('SYS_DICT_CONFIG', '37', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='37'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_OPERATION_KSDICT', data)
    })

    // 费用科室
    getTableData('SYS_DICT_CONFIG', '41', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='41'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_COST_DEPARTMENT', data)
    })

    // 项目类型
    getTableData('SYS_FLAG_DATA', 'XM000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='XM000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PROJECT_TYPE', data)
    })

    // 报表归并
    getTableData('SYS_DICT_CONFIG', '42', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='42'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REPORT_TOTAL', data)
    })

    // 操作人员（用户）
    getTableData('SYS_DICT_CONFIG', '12', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='12'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_USERS_DICT', data)
    })

    // 建档卡类别代码
    getTableData('SYS_PRIMARY_DATA', 'PD0000000726', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000726'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CARDTYPE_DICT', data)
    })

    // 病人性质
    getTableData('SYS_DICT_CONFIG', '22', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='22'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PATIENT_NATURE_DICT', data)
    })

    // 西药权限、中药权限、草药权限
    getTableData('SYS_FLAG_DATA', 'FD000012', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000012'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SYS_YPQX', data)
    })

    // 启用判别
    getTableData('SYS_FLAG_DATA', 'FD000005', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000005'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SYS_USING', data)
    })

    // 费用分类
    getTableData('SYS_FLAG_DATA', 'XM000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='XM000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_COST_TYPE_DICT', data)
    })
    // 煎法分类
    getTableData('SYS_DICT_CONFIG', '45', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='45'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CY_JF_DICT', data)
    })
    // 对应药库类型
    getTableData('SYS_FLAG_DATA', 'FD000007', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000007'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_MEDICINE_ROOM_TYPE', data)
    })
    // ABO血型
    getTableData('SYS_PRIMARY_DATA', 'PD0000000008', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000008'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ABO_XXDMX_DICT', data)
    })
    // Rh（D）血型代码表
    getTableData('SYS_PRIMARY_DATA', 'PD0000000019', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000019'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_RH_XXDMX_DICT', data)
    })
    // 输血史标识代码表
    getTableData('SYS_PRIMARY_DATA', 'PD0000000287', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000287'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SSS_FLAG_DICT', data)
    })
    // 梅毒血清学试验结果代码表
    getTableData('SYS_PRIMARY_DATA', 'PD0000000203', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000203'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_MDXQSY_DICT', data)
    })
    // 输血原因
    getTableData('SYS_DICT_CONFIG', '48', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='48'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SXYY_DICT', data)
    })
    // 归并类别
    getTableData('SYS_FLAG_DATA', 'GY000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='GY000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_MERGE_CATEGORY_DICT', data)
    })
    // 疾病判别
    getTableData('SYS_FLAG_DATA', 'JB000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JB000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DISEASE_DISCRIMIN_DICT', data)
    })
    //执行时间
    getTableData('SYS_FLAG_DATA', 'GY000003', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='GY000003'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_EXECUTION_TIME_DICT', data)
    })
    // 给药频次
    getTableData('SYS_FLAG_DATA', 'GY000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='GY000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DOSE_FREQUENCY_DICT', data)
    })
    // 给药周期
    getTableData('SYS_FLAG_DATA', 'GY000004', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='GY000004'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DOSE_CYCLE_DICT', data)
    })

    // 减免政策
    getTableData('SYS_DICT_CONFIG', '46', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='46'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REDUCTION_POLICY', data)
    })

    // 收费项目类别
    getTableData('SYS_DICT_CONFIG', '50', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='50'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CHARGE_TYPE', data)
    })

    // 付款精度
    getTableData('SYS_FLAG_DATA', 'FK000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FK000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PAY_ACCURACY_DICT', data)
    })

    // 舍入方式
    getTableData('SYS_FALG_DATA', 'FK000003', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FK000003'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ROUNDING_METHOD_DICT', data)
    })

    // 费用类别
    getTableData('SYS_FLAG_DATA', 'FY000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FY000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_COST_CATEGORY_DICT', data)
    })
    // 事件分类
    getTableData('SYS_FALG_DATA', 'SJ000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='SJ000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_EVENT_CLASS_DICT', data)
    })

    // 证侯分类
    getTableData('SYS_DICT_CONFIG', '52', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='52'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SYNDROME_TYPE_DICT', data)
    })

    // 疾病报告卡
    getTableData('SYS_FLAG_DATA', 'JB000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JB000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DISEASE_CARD_DICT', data)
    })
    // 脚注
    getTableData('SYS_FALG_DATA', 'JZ000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JZ000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_FOOT_NOTE_DICT', data)
    })

    // 门诊类别
    getTableData('SYS_DICT_CONFIG', '11', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='11'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_OUTPATIENT_TYPE', data)
    })

    // 医保线路
    getTableData('SYS_DICT_CONFIG', '53', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='11'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_MED_INS_ROUTE', data)
    })
    // 就诊状态
    getTableData('SYS_FLAG_DATA', 'FD000185', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000185'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_JZZT_DICT', data)
    })

    // 输液科室
    getTableData('SYS_DICT_CONFIG', '39', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='39'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_INFUSION_DEPT', data)
    })
    // 注射科室
    getTableData('SYS_DICT_CONFIG', '61', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='61'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_INJECTION_DEPT', data)
      // console.log('注射科室:', store.state.webSqlDict.INJECTION_DEPT)
    })

    // 治疗科室
    getTableData('SYS_DICT_CONFIG', '51', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='51'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CRUE_DICT', data)
    })
    // 护理记录类型
    getTableData('SYS_DICT_CONFIG', '56', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='56'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_NURSE_RECORD_DICT', data)
      // console.log('护理记录类型:', store.state.webSqlDict.DEP_CODE_DICT)
    })
    // 身份证件代码类别字典
    getTableData('SYS_PRIMARY_DATA', 'PD0000000260', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000260'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_IDCARD_DICT', data)
    })
    // 户籍标志字典
    getTableData('SYS_PRIMARY_DATA', 'PD0000000125', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000125'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_HJTYPE_DICT', data)
    })
    // 核算分类
    getTableData('SYS_FLAG_DATA', 'KS000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='KS000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ACCOUNT_TYPE_DICT', data)
    })
    // 科室分类
    getTableData('SYS_FLAG_DATA', 'KS000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='KS000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DEPARTMENT_TYPE_DICT', data)
    })
    // 静脉配置医嘱类别
    getTableData('SYS_PRIMARY_DATA', 'PD0000000739', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000739'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DOCTOR_ADVICE_DICT', data)
    })
    // 体温单过敏药物分类
    getTableData('SYS_FLAG_DATA', 'TW000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='TW000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ALLERGY_TW_DICT', data)
    })
    getTableData('SYS_PRIMARY_DATA', 'PD0000000740', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000740'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TO_HOS_TYPE_DICT', data)
    })
    getTableData('SYS_PRIMARY_DATA', 'PD0000000741', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000741'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REALIZE_TYPE_DICT', data)
    })
    getTableData('SYS_PRIMARY_DATA', 'PD0000000742', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000742'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PATIENT_TYPE_DICT', data)
    })
    getTableData('SYS_PRIMARY_DATA', 'PD0000000743', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000743'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TOWHERE_TYPE_DICT', data)
    })

    // 皮试结果
    getTableData('SYS_FLAG_DATA', 'FD000003', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='FD000003'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SKINTEST_RESULT', data)
    })
    // 静配方式
    getTableData('SYS_PRIMARY_DATA', 'PD0000000744', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000744'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_STATIC_STYLE_DICT', data)
    })
    // 医疗角色
    getTableData('SYS_DICT_CONFIG', '8', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='8'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DOC_TITLE_DICT', data)
    })
    // 医保门诊使用
    getTableData('SYS_DICT_CONFIG', '65', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='65'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_YBMZ_USING_DICT', data)
    })
    // 医保住院使用
    getTableData('SYS_DICT_CONFIG', '66', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='66'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_YBZY_USING_DICT', data)
    })

    //医保数据-医保规则适用人群
    getTableData('SYS_DICT_CONFIG', '54', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='54'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REGULAR_CROWD_DICT', data)
    })

    //医保数据-医保支付条件
    getTableData('SYS_DICT_CONFIG', '55', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='55'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PAY_TERMS_DICT', data)
    })

    //医保数据-医保采购方式
    getTableData('SYS_DICT_CONFIG', '57', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='57'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PURCHASE_METHOD_DICT', data)
    })

    //医保数据-医保价格规则代码
    getTableData('SYS_DICT_CONFIG', '58', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='58'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PRICE_CROWD_DICT', data)
    })

    //医保数据-医保药品属性
    getTableData('SYS_DICT_CONFIG', '59', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='59'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_DRUG_ATTRIBUTE_DICT', data)
    })

    //医保数据-医保发布类型
    getTableData('SYS_DICT_CONFIG', '60', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='60'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_RELEASE_TYPE_DICT', data)
    })

    // 在退标识
    getTableData('SYS_FLAG_DATA', 'YB000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_RETURN_SIGN_DICT', data)
    })

    // 保健情况
    getTableData('SYS_FLAG_DATA', 'YB000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_HEALTH_CARE_DICT', data)
    })

    // 住院项目
    getTableData('SYS_FLAG_DATA', 'YB000003', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000003'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_HOSPITAL_PROJECT_DICT', data)
    })

    // 医保账户类别
    getTableData('SYS_FLAG_DATA', 'YB000004', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000004'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ACCOUNT_CATEGORY_DICT', data)
    })

    // 可报标识
    getTableData('SYS_FLAG_DATA', 'YB000005', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000005'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REPORTABLE_IDENTIF_DICT', data)
    })

    // 人员类型
    getTableData('SYS_FLAG_DATA', 'YB000006', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000006'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_PERSON_TYPE_DICT', data)
    })

    // 退费标识
    getTableData('SYS_FLAG_DATA', 'YB000007', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000007'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REFUND_IDENTIF_DICT', data)
    })

    // 急观住院标志
    getTableData('SYS_FLAG_DATA', 'YB000008', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000008'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_JGZY_IDENTIF_DICT', data)
    })

    // 出院标志
    getTableData('SYS_FLAG_DATA', 'YB000009', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000009'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CY_IDENTIF_DICT', data)
    })

    // 治疗结果
    getTableData('SYS_FLAG_DATA', 'YB000010', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='YB000010'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TREATMENT_RESULT_DICT', data)
    })

    // 门诊费用类别
    getTableData('SYS_DICT_CONFIG', '65', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='65'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TREATMENT_RESULT_DICT', data)
    })

    // 住院费用类别
    getTableData('SYS_DICT_CONFIG', '66', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='66'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TREATMENT_RESULT_DICT', data)
    })

    //门诊建档病人性质
    getTableData('SYS_DICT_CONFIG', '68', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='68'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_BRXZ_DICT', data)
      console.log('app病人性质---:', store.state.webSqlDict.BRXZ_DICT)
    })

    // 医保大病项目
    getTableData('SYS_DICT_CONFIG', '69', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='69'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SERIOUSILLNESS_ZLXM', data)
    })

    // 医保大病登记疾病诊断分类
    getTableData('SYS_DICT_CONFIG', '70', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='70'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SERIOUSILLNESS_JBZD', data)
    })

    // 大病子类
    getTableData('SYS_FLAG_DATA', '70', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='DB000001'`, function (data: any) {
      store.commit('SET_SERIOUSILLNESS_DBZL', data)
    })

    // 医保登记类别
    getTableData('SYS_PRIMARY_DATA', 'YB0000000001', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='YB0000000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_YB_DJLB', data)
      // console.log('医保登记类别:', store.state.webSqlDict.YB_DJLB)
    })

    // 班次
    getTableData('SYS_DICT_CONFIG', '73', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='73'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SCHEDULE_TIME', data)
      // console.log('医保登记类别:', store.state.webSqlDict.SCHEDULE_TIME)
    })

    // 挂号预约班次（不包括“全天”）
    getTableData('SYS_DICT_CONFIG', '77', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='77'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_REG_YYZBLB', data)
    })

    // 家庭关系代码表
    getTableData('SYS_PRIMARY_DATA', 'PD0000000143', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000143'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_JTGXDMB_DICT', data)
    })

    // 病人情况
    getTableData('SYS_FLAG_DATA', 'RY000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='RY000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_BRQK_DICT', data)
    })

    //特殊手术
    getTableData('SYS_FLAG_DATA', 'SS000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='SS000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_TSSS_TYPE_DICT', data)
    })

    //隔离标志
    getTableData('SYS_FLAG_DATA', 'SS000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='SS000002'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_GLBZ_TYPE_DICT', data)
    })

    //手术类型
    getTableData('SYS_FLAG_DATA', 'SS000003', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='SS000003'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SSLX_TYPE_DICT', data)
    })

    //手术级别
    getTableData('SYS_PRIMARY_DATA', 'PD0000000273', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000273'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SSJB_DICT', data)
    })
    //治疗执行状态字典
    getTableData('SYS_PRIMARY_DATA', 'KF0000000001', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='KF0000000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ZXZT_DICT', data)
    })
    //受血者属地
    getTableData('SYS_FLAG_DATA', 'SD000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='SD000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_SSLX_TYPE_DICT', data)
    })
    //备血审批状态
    getTableData('SYS_FLAG_DATA', 'BX000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='BX000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_IM_BXSP_DICT', data)
    })
    //  诊室字典
    getTableData('SYS_DICT_CONFIG', '80', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='80'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_CONSULT_ROOM_DICT', data)
    })
    // 不良事件类别
    getTableData('SYS_PRIMARY_DATA', 'SJ0000000001', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='SJ0000000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_EVENT_CATE_DICT', data)
    })
    // 不良事件性质
    getTableData('SYS_PRIMARY_DATA', 'SJ0000000008', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='SJ0000000008'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_EVENT_NATURE_DICT', data)
    }) // 不良事件上报标志
    getTableData('SYS_PRIMARY_DATA', 'SJ0000000004', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='SJ0000000004'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_EVENT_REPORT_DICT', data)
    }) // 不良事件审核标志
    getTableData('SYS_PRIMARY_DATA', 'SJ0000000006', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='SJ0000000006'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_EVENT_EXAMINE_DICT', data)
    }) // 不良事件审核结果
    getTableData('SYS_PRIMARY_DATA', 'SJ0000000007', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='SJ0000000007'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_EVENT_RESULT_DICT', data)
    })
    // 不良事件分析标志
    getTableData('SYS_PRIMARY_DATA', 'SJ0000000005', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='SJ0000000005'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_EVENT_ANALYSIS_DICT', data)
    })
    // 门诊留观科室字典
    getTableData('SYS_DICT_CONFIG', '79', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='79'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_OBSERVE_DEPARTMENT_DICT', data)
    })
    //留观结算类型
    getTableData('SYS_PRIMARY_DATA', 'LG0000000001', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='LG0000000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_IM_LGLX_DICT', data)
    })
    //留观病区
    getTableData('SYS_DICT_CONFIG', '78', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='78'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_LGBQ_DICT', data)
    })
    // 自定义体温单参数
    getTableData('SYS_DICT_CONFIG', '75', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='75'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_ZDY_SIGNDATA_DICT', data)
    })
    // 高危药品等级
    getTableData('SYS_FLAG_DATA', 'GW000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='GW000001'`, function (data: any) {
      _this.stateArr.push(1)
      store.commit('SET_HIGH_RISK_GRADE_DICT', data)
      // console.log('高危药品等级:', store.state.webSqlDict.HIGH_RISK_GRADE_DICT)
    })
    //交班单患者类型
    getTableData('SYS_FLAG_DATA', 'JBD000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JBD000001'`, function (data: any) {
      store.commit('SET_JBD_HZLX_DICT', data)
    })
    //交班单班次类型
    getTableData('SYS_FLAG_DATA', 'JBD000003', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JBD000003'`, function (data: any) {
      store.commit('SET_JBD_BCLX_DICT', data)
    })
    //交班单SBAR类型
    getTableData('SYS_FLAG_DATA', 'JBD000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JBD000002'`, function (data: any) {
      store.commit('SET_JBD_SBAR_DICT', data)
    })
    // 检查科室
    getTableData('SYS_FLAG_DATA', 'JCKS0001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JCKS0001'`, function (data: any) {
      store.commit('SET_JCKS_DICT', data)
    })
    // 医保转诊
    getTableData('SYS_DICT_CONFIG', '83', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='83'`, function (data: any) {
      store.commit('SET_REFERRAL_DICT', data)
    })
        //皮试项目
    getTableData('SYS_DICT_CONFIG', '67', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='67'`, function (data: any) {
      store.commit('SET_SKINTESTPROJECT__DICT', data)
    })
     //实施临床路径
    getTableData('SYS_PRIMARY_DATA', 'PD0000000270', `SELECT * FROM SYS_PRIMARY_DATA_VALUE WHERE dk='PD0000000270'`, function (data: any) {
      store.commit('SET_BAXY_SSLCLJ_DICT', data)
    })
    // 病案首页归并
    getTableData('SYS_FLAG_DATA', 'BA000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='BA000001'`, function (data: any) {
      store.commit('SET_MEDICAL_RECORD_DICT', data)
    })
    // 入院目的
    getTableData('SYS_FLAG_DATA', 'RY000003', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='RY000003'`, function (data: any) {
      store.commit('SET_PURPOSE_ADMISSION_DICT', data)
    })
    //病案首页(出院情况)
    getTableData('SYS_FLAG_DATA', 'CY000002', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='CY000002'`, function (data: any) {
      store.commit('SET_BASY_CYQK_DICT', data)
    })
    //护士字典
    getTableData('SYS_DICT_CONFIG', '82', `SELECT * FROM SYS_DICT_CONFIG_VALUE WHERE dk='82'`, function (data: any) {
      store.commit('SET_NURSE_DICT', data)
    })
     //滴速
    getTableData('SYS_FLAG_DATA', 'DS000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='DS000001'`, function (data: any) {
      store.commit('SET_IM_DS_DICT', data)
    })

    // 附加计费方式
    getTableData('SYS_FLAG_DATA', 'JF000001', `SELECT * FROM SYS_FLAG_DATA_VALUE WHERE dk='JF000001'`, function (data: any) {
      store.commit('SET_FJJFFS_DICT', data)
    })
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
