<template>
  <!-- src/layout/components/Navbar/index.vue -->
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <!-- <el-button @click="open">anniu</el-button> -->
      <!-- 消息 -->
      <msg ref="msgListinfo" :msgListinfo="msgListinfo" :msgList="msgList" :identity="userInfos.identityName" @handleOpen="handleOpen" @handleApplyOpen="handleApplyOpen" @getMessageList="getMessageList"></msg>

      <template v-if="device !== 'mobile'">
        <div class="icons-wrap">
          <!-- 全屏 -->
          <!-- <i class="icon his-full-screen"></i> -->
          <!-- <el-tooltip :content="$t(screenfullContent)" placement="bottom" effect="light">
            <div class="screen-full-wrap">
              <screenfull class="screen-full"></screenfull>
            </div>
          </el-tooltip> -->
          <screenfull class="screen-full"></screenfull>
          <!-- 字典初始化 -->
          <el-tooltip :content="$t('common.resetDict')" placement="bottom" effect="light">
            <i class="icon his-init" @click="webSqlReset"></i>
          </el-tooltip>

          <!-- 切换语言 -->
          <el-tooltip :content="$t('common.language')" placement="bottom" effect="light">
            <el-dropdown trigger="click" hide-on-click placement="bottom" @command="handleSetLanguage">
              <div>
                <i class="icon" :class="'his-' + language"></i>
                <!-- <span>{{ language }}</span> -->
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in langList" :key="item.value" :disabled="language === item.value" :command="item">{{ item.language }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-tooltip>
        </div>
      </template>
      <!-- 业务切换 -->

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" hide-on-click ref="bussinessDropDown" v-if="!isEmptyAuthList">
        <div class="avatar-wrapper">
          <img src="@/assets/main-img/keshiqiehuan@2x.png" class="user-avatar" />
          <span>{{ userAuthority.showname }}</span>
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown" class="api layout-navbar-dropdown scroll-bar hischangerole">
          <!-- 循环读取 -->
          <div class="item-main">
            <template v-for="item in businessList">
              <div :class="item.queryid == userAuthority.queryid ? 'item-block-select' : 'item-block'" :key="item.showname" @click="handleSelectBusiness(item)">
                <div class="item-img">
                  <!-- <i class="icon his-qutpatient-infusion"></i> -->
                  <i class="icon his-menu_guahao" style="font-size: 26px"></i>
                </div>
                <div class="item-text">
                  <span>{{ item.showname }}</span>
                </div>
              </div>
            </template>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 角色切换 -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" hide-on-click>
        <div class="avatar-wrapper">
          <img src="@/assets/main-img/jueseqiehuan@2x.png" class="user-avatar" />
          <span>{{ userInfo && userInfo.identityName }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="api layout-navbar-dropdown scroll-bar">
          <!-- 循环读取 -->
          <div class="item-main">
            <template v-for="item in stationList">
              <div :class="item.groupId == selectUserData.groupId ? 'item-block-select' : 'item-block'" :key="item.groupName" @click="handleChange(item)">
                <div class="item-img">
                  <!-- <i class="icon his-qutpatient-infusion"></i> -->
                  <i :class="'icon' + ' ' + `${item.icon}`" style="font-size: 26px"></i>
                </div>
                <div class="item-text">
                  <span>{{ item.groupName }}</span>
                </div>
              </div>
            </template>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/main-img/morentouxiang.png" class="user-avatar" />
          <span>{{ userInfo.name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="changePassword">
            <span style="display: block">{{ $t('navbar.changePassword') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 消息接受、处置弹框 -->
    <el-dialog :title="title" :visible.sync="visible" width="60%" :before-close="handleClose">
      <!-- 危急值接收 -->
      <div class="dialog-box" v-show="msgData.count_ == '1'">
        <el-form ref="acceptForm" :rules="acceptRule" :model="acceptForm" label-width="104px">
          <el-form-item label="接收时间">
            <el-input v-model="acceptForm.jssj" disabled></el-input>
          </el-form-item>
          <el-form-item label="接收人">
            <el-input v-model="acceptForm.jsr" disabled></el-input>
          </el-form-item>
          <el-form-item label="通知医生时间">
            <el-input v-model="acceptForm.tzyssj" disabled></el-input>
          </el-form-item>
          <el-form-item label="通知医生">
            <el-select v-model="acceptForm.tzysdm" placeholder="请选择需通知的医生">
              <el-option v-for="item in doctorList" :key="item.dv" :label="item.dn" :value="item.dv"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible_">取 消</el-button>
          <el-button type="primary" @click="handleAcceptConfirm">确 定</el-button>
        </div>
      </div>
      <!-- 危急值处置 -->
      <div class="dialog-box" v-show="msgData.count_ == '2'">
        <el-form ref="disposalForm" :model="disposalForm" :rules="disposalRule" label-width="80px">
          <el-form-item label="接收时间">
            <el-input v-model="disposalForm.jssj" disabled></el-input>
          </el-form-item>
          <el-form-item label="接收医生">
            <el-select v-model="disposalForm.tzys" disabled>
              <el-option v-for="item in doctorList" :key="item.dv" :label="item.dn" :value="item.dv"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通知时间">
            <el-input v-model="disposalForm.tzsj" disabled></el-input>
          </el-form-item>
          <el-form-item label="通知医生">
            <el-select v-model="disposalForm.tzys" disabled>
              <el-option v-for="item in doctorList" :key="item.dv" :label="item.dn" :value="item.dv"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处置时间">
            <el-input v-model="disposalForm.czsj" disabled></el-input>
          </el-form-item>
          <el-form-item label="处置医生">
            <el-select v-model="disposalForm.czys" disabled>
              <el-option v-for="item in doctorList" :key="item.dv" :label="item.dn" :value="item.dv"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="czcs" label="处置措施" label-width="80px">
            <el-input type="textarea" v-model="disposalForm.czcs"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible_">取 消</el-button>
          <el-button type="primary" @click="handleDisposalConfirm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 会诊意见 弹框 -->
    <el-dialog title="会诊申请 - 会诊意见" :visible.sync="applyVisiable" width="90%" :before-close="handleClose">
      <div class="dialog-box dialog-apply">
        <el-form ref="patientInfo" :model="patientInfo" :rules="patientRule" label-width="84px">
          <el-form-item label>
            <div class="btn">
              <el-button size="mini" type="text" @click="handleConfirm">
                <i class="icon blue his-btn-confirm"></i>
                {{ $t('确认') }}
              </el-button>
              <el-button size="mini" type="text" @click="handleClose">
                <i class="icon red his-btn-close"></i>
                {{ $t('关闭') }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="申请时间">
            <el-input v-model="patientInfo.sqsj" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请单号">
            <el-input v-model="patientInfo.sqxh" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="病人姓名">
            <el-input v-model="patientInfo.brxm" disabled></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="性别">
            <search-select table-name="SYS_PRIMARY_DATA" kid="PD0000000269" v-model="patientInfo.brxb" placeholder=" " :backfillValue="patientInfo.brxb" disabled />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="patientInfo.rynl" disabled></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="入院时间">
            <el-input v-model="patientInfo.ryrq" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="申请科室">
            <search-select table-name="SYS_DICT_CONFIG" kid="15" v-model="patientInfo.sqks" placeholder=" " :backfillValue="patientInfo.sqks" disabled />
          </el-form-item>
          <!-- <el-form-item label="病区">
            <search-select table-name="SYS_DICT_CONFIG" kid="18" v-model="patientInfo.brbq" placeholder=" " :backfillValue="patientInfo.brbq" disabled />
          </el-form-item>
          <el-form-item label="床号">
            <el-input v-model="patientInfo.brch" disabled></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="住院号码">
            <el-input v-model="patientInfo.zyhm" disabled></el-input>
          </el-form-item>
          <el-form-item label="当前诊断">
            <el-input v-model="patientInfo.mqzd" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="会诊时间">
            <el-input v-model="patientInfo.hzsj" disabled></el-input>
          </el-form-item>
          <el-form-item label="紧急">
            <search-select table-name="SYS_FLAG_DATA" kid="JJ000001" v-model="patientInfo.jjbz" :clearable="false" placeholder=" " disabled :backfillValue="patientInfo.jjbz" />
          </el-form-item>
          <!-- <el-form-item label="会诊类型">
            <el-select v-model="patientInfo.nhzyy" disabled>
              <el-option label="本院" value="1"></el-option>
              <el-option label="外院" value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="会诊医院">
            <el-input v-if="patientInfo.nhzyy == '1'" v-model="patientInfo.nyqhzyyName" disabled></el-input>
            <el-input v-else v-model="patientInfo.nyqhzyy"></el-input>
          </el-form-item>
          <el-form-item class="" v-if="patientInfo.nhzyy != '1'" label="拟邀会诊科室" label-width="120px">
            <el-input v-model="patientInfo.nyqhzks"></el-input>
          </el-form-item>
          <el-form-item class="" v-else label="拟邀会诊科室" label-width="120px">
            <el-select v-model="patientInfo.nyqhzks" placeholder multiple disabled>
              <el-option v-for="item in departmentList" :key="item.dv + ''" :label="item.dn" :value="item.dv + ''"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="" v-if="patientInfo.nhzyy != '1'" label="拟邀会诊医生" label-width="120px">
            <el-input v-model="patientInfo.nyqhzys2"></el-input>
          </el-form-item>
          <el-form-item class="" v-else label="拟邀会诊医生" label-width="120px">
            <el-select v-model="patientInfo.nyqhzys" placeholder=" " multiple disabled>
              <el-option v-for="item in doctorList" :key="item.dv" :label="item.dn" :value="item.dv"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="" label="主管医师签字" label-width="120px">
            <search-select table-name="SYS_DICT_CONFIG" kid="17" v-model="patientInfo.sqys" placeholder=" " :backfillValue="patientInfo.sqys" disabled />
          </el-form-item>
          <el-form-item class="" label="主治以上医生/科主任签字" label-width="120px">
            <search-select table-name="SYS_DICT_CONFIG" kid="17" v-model="patientInfo.kzrys" placeholder=" " :backfillValue="patientInfo.kzrys" disabled />
          </el-form-item>
          <el-form-item class="wd100" label="病情简介" label-width="120px">
            <el-input type="textarea" v-model="patientInfo.bqzl" disabled></el-input>
          </el-form-item>
          <el-form-item class="wd100" label="会诊目的" label-width="120px">
            <el-input type="textarea" v-model="patientInfo.hzmd" disabled></el-input>
          </el-form-item>
          <el-form-item class="wd100" label="会诊意见" prop="hzyj" label-width="108px">
            <el-input type="textarea" v-model="patientInfo.hzyj"></el-input>
          </el-form-item>
          <el-form-item label="所属医生" prop="ssys">
            <search-select table-name="SYS_DICT_CONFIG" kid="17" v-model="patientInfo.ssys" placeholder="请选择所属医生" :backfillValue="patientInfo.ssys" />
          </el-form-item>
          <el-form-item label="代表科室" prop="dbks">
            <search-select table-name="SYS_DICT_CONFIG" kid="15" v-model="patientInfo.dbks" placeholder="请选择代表科室" :backfillValue="patientInfo.dbks" />
          </el-form-item>
          <el-form-item visiable="hidden"></el-form-item>
          <el-form-item visiable="hidden"></el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <div class="outDoor" v-if="certificateVisible" :height="listSlotHeight">
      <div class="certificateClass">
        <div class="textCode"><span style="display: block" class="outdoorText">二维码展示</span> <span class="refreshText" @click="refreshBtn">刷新</span></div>
        <img :src="imgURL" width="280px" height="280px" alt="" />
        <span style="text-align: center; display: block" class="outdoorTextTwo">{{ bizsntext == '' ? '请扫码' : bizsntext }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
import { getMsgList, aMsgProcess, updateDealInfo, updateNoticeInfo, queryLoadInfo, commitCisZyHzyj, messcljlAdd, messjsjlAdd } from '@/api/users'
import { clearDBtable } from '@/websql/functions'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
// import ErrorLog from '@/components/ErrorLog/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
// import HeaderSearch from '@/components/HeaderSearch/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import msg from '@/components/msg/index.vue'
// import SizeSelect from '@/components/SizeSelect/index.vue'
import { TagsViewModule } from '@/store/modules/tags-view'
import './index.scss'
import { langList } from '@/utils/dic'
import { user, group } from '../../../api/users'
import { log } from 'util'
import global from '../../../global'
import { formatDate, isEmpty } from '@/utils'
import { getParams } from '@/api/his/basic/index'
import { format } from 'url'
import { routerGo } from '@/utils/utils'
import { getEasemobUser, getTwoCode, watchCode } from '@/api/users'

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    // ErrorLog,
    Hamburger,
    // HeaderSearch,
    LangSelect,
    Screenfull,
    msg,
    // SizeSelect
  },
})
export default class extends Vue {
  private userInfo = {
    name: '',
    hospitalId: 0,
    identityName: '',
    groupId: 0,
  }

  //业务权限
  private userAuthority = {
    queryid: 0,
    showname: '',
    groupId: 0,
  }
  //选中的角色数据
  private selectUserData = {
    groupId: 0,
    groupName: '',
    icon: '',
  }

  private language: string = AppModule.language
  private language_name: string = ''
  private msgListinfo: any = []
  private stationList = []
  private businessList = [] //业务列表
  private isEmptyAuthList: boolean = true //true隐藏/false显示业务权限
  private langList: any[] = langList // 语言列表
  private msgList: any[] = [] // 消息列表
  private doctorList: any[] = [] // 医生列表
  private departmentList: any[] = [] // 住院科室列表
  private wardList: any[] = [] // 病区列表
  private sexList: any[] = [] // 性别列表
  private visible: boolean = false
  private aount: number = 1
  private applyVisiable: boolean = false
  private title: string = '' // 弹框标题
  private newsId: string = '' // 消息的id
  private msgData: any = {} //消息子组件传递的数据
  private acceptForm: any = {}
  private acceptRule: any = {
    tzysdm: [{ required: true, message: '请选择通知医生', trigger: 'change' }],
  }
  private disposalForm: any = {}
  private disposalRule: any = {
    czcs: [{ required: true, message: '请输入处置措施', trigger: 'blur' }],
  }
  private ksId: number | null = null // 科室Id
  private patientInfo: any = {} // 患者信息
  private patientRule: any = {
    nyqhzks: [{ required: true, message: '请选择拟邀会诊科室', trigger: 'change' }],
    // nyqhzys: [{ required: true, message: '请选择拟邀会诊医生', trigger: 'change' }],
    bqzl: [{ required: true, message: '请输入患者治疗情况', trigger: 'blur' }],
    hzmd: [{ required: true, message: '请输入会诊目的', trigger: 'blur' }],
    kzrys: [{ required: true, message: '请选择科主任签字', trigger: 'change' }],
    hzyj: [{ required: true, message: '请输入会诊意见', trigger: 'change' }],
    ssys: [{ required: true, message: '请选择所属医生', trigger: 'change' }],
    dbks: [{ required: true, message: '请选择代表科室', trigger: 'change' }],
  }
  private idx: number | null = null // 判断是否为医
  private roleList: Array<any> = [
    { code: 'CIS01', dn: '门诊医生站', dv: 'mzysz' },
    { code: 'HIS03', dn: '西药库管理', dv: 'xykgl' },
    { code: 'CIS02', dn: '住院医生站', dv: 'zyysz' },
    { code: 'CIS03', dn: '住院护士站', dv: 'zyhsz' },
    { code: 'HIS05', dn: '门诊西药房', dv: 'mzxyf' },
    { code: 'HIS07', dn: '住院西药房', dv: 'zyxyf' },
    { code: 'HRP01', dn: '物资管理', dv: 'wzgl' },
    { code: 'HIS10', dn: '医技预约', dv: 'yjyy' },
    { code: 'HRP004', dn: '高值耗材', dv: 'gzhc' },
    { code: 'HIS13', dn: '门诊输液', dv: 'mzsy' },
    { code: 'HIS16', dn: '病案管理', dv: 'bagl' },
    { code: 'HIS18', dn: '院长查询', dv: 'yzcx' },
    { code: 'HIS19', dn: '多媒体导诊', dv: 'dmtdz' },
    { code: 'HIS20', dn: '中心维护管理', dv: 'zxwhgl' },
    { code: 'HIS12', dn: '床位预约管理', dv: 'cwyygl' },
    { code: 'HIS11', dn: '门诊护士站', dv: 'mzhsz' },
    { code: 'HIS14', dn: '静配中心', dv: 'jpzx' },
    { code: 'HIS17', dn: '随访管理', dv: 'sfgl' },
    { code: 'HIS01', dn: '一卡通管理', dv: 'yktgl' },
    { code: 'HIS15', dn: '手麻计费', dv: 'smjf' },
    { code: 'HRP02', dn: '资产管理', dv: 'zcgl' },
    { code: 'EMR01', dn: '病历编辑管理', dv: 'blbjgl' },
    { code: 'MQMS06', dn: '不良事件上报', dv: 'blsjsb' },
    { code: 'MQMS05', dn: '院感管理', dv: 'yggl' },
    { code: 'CMM02', dn: '抗菌药物管理', dv: 'kjywgl' },
    { code: 'MQMS07', dn: '康复管理', dv: 'kfgl' },
    { code: 'ECIS02', dn: '急诊护理', dv: 'jzhl' },
    { code: 'HAI01', dn: '接口服务平台', dv: 'jkfwpt' },
    { code: 'HIS04', dn: '草药库管理', dv: 'cykgl' },
    { code: 'HIS06', dn: '门诊草药房', dv: 'mzcyf' },
    { code: 'HIS08', dn: '住院草药房', dv: 'zycyf' },
    { code: 'HIS09', dn: '挂号预约', dv: 'ghyy' },
    { code: 'CMM05', dn: '危急值管理', dv: 'wjzgl' },
    { code: 'MQMS01', dn: '手术分级管理', dv: 'ssfjgl' },
    { code: 'HIS21', dn: '医保数据管理', dv: 'ybsjgl' },
    { code: 'DIY01', dn: '自助服务', dv: 'zzfw' },
    { code: 'SY001', dn: '皮试管理', dv: 'psgl' },
    { code: 'HIS32', dn: '分诊管理', dv: 'fzgl' },
    { code: 'HIS33', dn: '处方点评', dv: 'cfdp' },
    { code: 'HIS34', dn: '单病种管理', dv: 'dbzgl' },
    { code: 'MQMS08', dn: '传染病上报', dv: 'crbsb' },
    { code: 'HIS35', dn: '系统管理', dv: 'xtgl' },
    { code: 'HIS23', dn: '医技管理', dv: 'yjgl' },
    { code: 'admin', dn: '超级管理员', dv: 'cjgly' },
    { code: 'HIS22', dn: '住院管理', dv: 'zygl' },
    { code: 'HIS02', dn: '挂号收费', dv: 'ghsf' },
    { code: 'EMR02', dn: '病历质控', dv: 'blzk' },
  ]
  private notify_:any = {
    notify:"",
    result:"",
    resultList:[]
  }
  private wst: any = null
  private interval:any = ""
  private resendTime:any = ""
  //新加2021-02-28
  private certificateVisible: boolean = false
  private bizsn: any = ''
  private timeout: any = 540000
  private timeoutObj: any = null
  private serverTimeoutObj: any = null
  private imgURL: any = ''
  private bizsnList: any = []
  private sysParams: any = {} // 系统参数
  private bizsntext: any = ''
  private listSlotHeight: number = 0
  private yeCode: any = '' //业务标识区分
  @Inject('reload')
  reload!: any

  get sidebar() {
    return AppModule.sidebar
  }

  get device() {
    return AppModule.device.toString()
  }

  get avatar() {
    return UserModule.avatar
  }
  get loginId() {
    // return localStorage.getItem('userId',)
    return JSON.parse(localStorage.userInfo)
  }
  get screenfullContent() {
    return localStorage.getItem('state') == '0' ? 'common.cancelFullScreen' : 'common.fullScreen'
  }

  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
    this.idx = this.userInfos.identityName.indexOf('医生') > 0 ? 2 : 1
    //
    // this.initWebsocket()
    // this.open()
    // location.reload();
    // sessionStorage.setItem("isweb",'1')
  //   private getSysPrama () {
      getParams({privates: ['SFQYXXTS','XXJGSC','XXTLSC']}).then((res: any) => {
        this.sysParams = res.data
        //console.log(this.sysParams,"系统参数")
        if (sessionStorage.getItem("isweb") == 'true') {
          if (this.sysParams.SFQYXXTS == "1") {
            this.initWebsocket()
          }
        }
      })
  //   }
    sessionStorage.setItem("isweb",'true')
  }

  mounted() {
    this.$nextTick(() => {
      // 获取医生列表
      this.doctorList = Vue.prototype.$qiankun ? Vue.prototype.$store.webSqlDict.TABLE_DOCTOR_DICT : this.$store.state.webSqlDict.TABLE_DOCTOR_DICT
      // 获取科室列表
      this.departmentList = Vue.prototype.$qiankun ? Vue.prototype.$store.webSqlDict.DEP_CODE_DICT : this.$store.state.webSqlDict.DEP_CODE_DICT
      // 获取病区列表
      this.wardList = Vue.prototype.$qiankun ? Vue.prototype.$store.webSqlDict.WARD_DICT : this.$store.state.webSqlDict.WARD_DICT
      // 获取性别列表
      this.sexList = Vue.prototype.$qiankun ? Vue.prototype.$store.webSqlDict.SEX_DICT : this.$store.state.webSqlDict.SEX_DICT
      this.handleSelectOrg()
      this.initLanguage()
      this.initBusinessData()
    })
  }
  @Watch('timeNumber')
  private onTimeNumber(val: any) {
    if (val > 120) {
      clearInterval(this.timeId)
      this.timeNumber = 0
      //console.log('this.timeNumber: ', this.timeNumber)
      this.bizsntext = '扫码已超时，请刷新二维码'
    }
  }
  private timeId: any = ''
  private timeNumber: number = 0
  //组件销毁阶段-清楚isWeb
  beforeDestory() {
    sessionStorage.setItem("isweb",'')
  }
  // 获取用户信息
  get userInfos() {
    return JSON.parse(localStorage.userInfo)
  }
  //  住院护士站 - 处置
  private handleDisposal (notify_:any,result:any) {
    // const msgListinfo: any = this.$refs.msgListinfo
    // msgListinfo.handleDisposal(result)
    (this.$refs.msgListinfo as any).handleDisposal(result)
    notify_.resultList.forEach((item:any) => {
      if (JSON.stringify(item.result) == JSON.stringify(result)) {
        return item.notify.close()
      }
    })
  }
  // 住院医生站 -接收
  private handleAccept_ (notify_:any,result:any) {
    // const msgListinfo: any = this.$refs.msgListinfo
    // msgListinfo.handleAccept_(result)
    // //console.log(result,"result")
    (this.$refs.msgListinfo as any).handleAccept_(result)
    notify_.resultList.forEach((item:any) => {
      if (JSON.stringify(item.result) == JSON.stringify(result)) {
        return item.notify.close()
      }
    })

  }
  // 住院医生站 -处置
  private handleDisposal_ (notify_:any,result:any) {
    // //console.log(notify_.resultList,"notify_.resultList")
    (this.$refs.msgListinfo as any).handleDisposal_(result)
    notify_.resultList.forEach((item:any) => {
      if (JSON.stringify(item.result) == JSON.stringify(result)) {
        return item.notify.close()
      }
    })
    // const msgListinfo: any = this.$refs.msgListinfo
    // msgListinfo.handleDisposal_(result)
    // notify_.notify.close()
  }
  //初始化weosocket
  private initWebsocket() {
    let that = this
    if (window.WebSocket) {
      // ws://192.168.55.211:8441/message-service/message/alert/mzysz/123 mzysz: 机构id 123: 用户id
      let identityCode: any = this.userInfos.identityCode // 机构代码
      let userId: any = this.userInfos.userId // 用户id
      //console.log(this.userInfos.userId, 'this.userInfos.userId')
      let name: string = ''
      this.roleList.map((el: any) => {
        if (el.code == identityCode) {
          name = el.dv
        }
      })
      // let wsUrl: any = `ws://192.168.55.211:8642/message/alert/mzysz/123`
      // let wsUrl: any = `ws://192.168.55.211:8642/message/alert/mzxyf/59`
      // let wsUrl: any = `ws://192.168.55.211:8642/message/alert/${name}/${userId}`
      // let wsUrl: any = `ws://blueuninfo.message.com:8000/message/alert/${name}/${userId}`
      let wsUrl: any = `ws://` + window.location.host + `/message-service/message/alert/${name}/${userId}`
      // let wsUrl: any = `ws://` + '220.196.249.90:86' + `/message-service/message/alert/${name}/${userId}` //  本地调试
      //console.log(wsUrl, 'wsUrl')
      var ws = new WebSocket(wsUrl)
      that.wst = ws
      // let heart = {
      //       timeOut:3000,
      //       timeObj : null,
      //       serverTimeObj : null,
      //       start:function(){
      //           //console.log('start');
      //           let self = this;
      //           //清除延时器
      //           this.timeObj && clearTimeout(this.timeObj);
      //           this.serverTimeObj && clearTimeout(this.serverTimeObj);
      //           this.timeObj = setTimeout(function(){
      //               socket.send('兄弟，你还好吗?');//发送消息，服务端返回信息，即表示连接良好，可以在socket的onmessage事件重置心跳机制函数
      //               //定义一个延时器等待服务器响应，若超时，则关闭连接，重新请求server建立socket连接
      //               self.serverTimeObj=setTimeout(function(){
      //                   socket.close();
      //                   reConnect(socketUrl);
      //               },self.timeOut)
      //           },this.timeOut)
      //       }
      //   }
      // 连接服务器成功
      ws.onopen = function (e) {
        // heartCheck.reset().start();      //心跳检测重置
        //console.log('连接服务器成功')
      }
      ws.onclose = function (e) {
        //console.log('服务器关闭')
        // localStorage.setItem('msgListinfo', JSON.stringify([]))
        that.initWebsocket()
      }
//       //心跳检测
// var heartCheck = {
//     timeout: 540000,        //9分钟发一次心跳
//     timeoutObj: null,
//     serverTimeoutObj: null,
//     reset: function(){
//         clearTimeout(that.timeoutObj);
//         clearTimeout(that.serverTimeoutObj);
//         return that;
//     },
//     start: function(){
//         var self = that;
//         that.timeoutObj = setTimeout(function(){
//             //这里发送一个心跳，后端收到后，返回一个心跳消息，
//             //onmessage拿到返回的心跳就说明连接正常
//             ws.send("ping");
//             //console.log("ping!")
//             that.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
//                 ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
//             }, self.timeout)
//         }, that.timeout)
//     }
// }
      // 服务器关闭
      ws.onclose = function (e) {
        //console.log('服务器关闭')
        // localStorage.setItem('msgListinfo', JSON.stringify([]))
        that.initWebsocket()
      }

      // 连接出错
      ws.onerror = function () {
        // that.$message({
        //   message: '连接出错',
        //   type: 'error'
        // })
        //console.log('连接出错')
      }
      // 接收服务器的消息
      ws.onmessage = function (e: any) {
        // //console.log("Received Message: ", e.data)
        let result: any = JSON.parse(e.data)

        let dispensingList: any[] = []
        let level: any = result.level
        //console.log(result, 'result -------------------')
        let highList: any = []
        let middleList: any = []
        let lowList: any = []
        // //console.log(level == 'high');
        // if (result.payload) {

        //   that.msgListinfo.push(result)
        // }
        if (level == 'high') {

          // if (result.payload.data.isCritical) {    //  危机值
          // // highList.push(result)
          // // that.notify_.resultList.unshift(that.notify_.notify)
          //   //   住院护士站
          //   if (result.target.system =='zyhsz') {
          //     const h = that.$createElement;
          //     let data  = result.payload.data
          //     that.notify_.notify = that.$notify({
          //       title: '',
          //       duration: 0,
          //       position: 'bottom-right',
          //       type: 'warning',
          //       onClose: () => {
          //         //console.log(`Notify已关闭，说明异常或已查看`)
          //       },
          //       message: h('div', { class: 'message' },
          //               [
          //                       h('div', { class: 'btnList' }, [
          //                         h(
          //                           'div',
          //                           {
          //                             class: 'module-title',
          //                             on: {
          //                             }
          //                           },
          //                           result.payload.title   // title
          //                         ),
          //                         h(
          //                           'span',
          //                           {
          //                             class: 'huanz',
          //                             on: {
          //                             }
          //                           },
          //                           "病人姓名"
          //                         ),
          //                         h(
          //                           'span',
          //                           {
          //                             class: 'huanz',
          //                             on: {
          //                             }
          //                           },
          //                           data.brxm
          //                         ),
          //                         h(
          //                           'span',
          //                           {
          //                             class: 'huanz',
          //                             on: {
          //                             }
          //                           },
          //                           "性别"
          //                         ),
          //                         h(
          //                           'span',
          //                           {
          //                             class: 'huanz',
          //                             on: {
          //                             }
          //                           },
          //                           data.xb
          //                         ),
          //                         h(
          //                           'span',
          //                           {
          //                             class: 'huanz',
          //                             on: {
          //                             }
          //                           },
          //                           "病人床号"
          //                         ),
          //                         h(
          //                           'span',
          //                           {
          //                             class: 'huanz',
          //                             on: {
          //                             }
          //                           },
          //                           data.brch
          //                         ),
          //                         h(
          //                           'span',
          //                           {
          //                             class: 'huanz',
          //                             on: {
          //                             }
          //                           },
          //                           "科室"
          //                         ),
          //                         h(
          //                           'span',
          //                           {
          //                             class: 'huanz',
          //                             on: {
          //                             }
          //                           },
          //                           data.officename
          //                         ),
          //                         h(
          //                           'div',
          //                           {
          //                             class: 'later',
          //                             on: {
          //                             }
          //                           },
          //                           [
          //                         h(
          //                           'el-button',
          //                           {
          //                             class: 'button',
          //                             on: {
          //                               click: that.handleDisposal.bind(that,that.notify_,result)
          //                             },
          //                           },
          //                           '接受'
          //                         )
          //                       ]
          //                         ),
          //                       ]),
          //                     ])
          //     })
          //   } else {
          //     //  医生站
          //   // //console.log(result,"result")
          //   // highList.push(result)
          //   const h = that.$createElement;
          //   let data  = result.payload.data
          //   that.notify_.notify = that.$notify({
          //     title: '',
          //     duration: 0,
          //     position: 'bottom-right',
          //     type: 'warning',
          //     onClose: () => {
          //       //console.log(`Notify已关闭，说明异常或已查看`)
          //     },
          //     message: h('div', { class: 'message' },
          //             [
          //                     h('div', { class: 'btnList' }, [
          //                       h(
          //                         'div',
          //                         {
          //                           class: 'module-title',
          //                           on: {
          //                           }
          //                         },
          //                         result.payload.title   // title
          //                       ),
          //                       h(
          //                         'span',
          //                         {
          //                           class: 'huanz',
          //                           on: {
          //                           }
          //                         },
          //                         "病人姓名"
          //                       ),
          //                       h(
          //                         'span',
          //                         {
          //                           class: 'huanz',
          //                           on: {
          //                           }
          //                         },
          //                         data.brxm
          //                       ),
          //                       h(
          //                         'span',
          //                         {
          //                           class: 'huanz',
          //                           on: {
          //                           }
          //                         },
          //                         "性别"
          //                       ),
          //                       h(
          //                         'span',
          //                         {
          //                           class: 'huanz',
          //                           on: {
          //                           }
          //                         },
          //                         data.xb
          //                       ),
          //                       h(
          //                         'span',
          //                         {
          //                           class: 'huanz',
          //                           on: {
          //                           }
          //                         },
          //                         "病人床号"
          //                       ),
          //                       h(
          //                         'span',
          //                         {
          //                           class: 'huanz',
          //                           on: {
          //                           }
          //                         },
          //                         data.brch
          //                       ),
          //                       h(
          //                         'span',
          //                         {
          //                           class: 'huanz',
          //                           on: {
          //                           }
          //                         },
          //                         "科室"
          //                       ),
          //                       h(
          //                         'span',
          //                         {
          //                           class: 'huanz',
          //                           on: {
          //                           }
          //                         },
          //                         data.officename
          //                       ),
          //                       h(
          //                         'div',
          //                         {
          //                           class: 'later',
          //                           on: {
          //                           }
          //                         },
          //                         [
          //                       h(
          //                         'el-button',
          //                         {
          //                           class: 'button',
          //                           on: {
          //                             click: that.handleAccept_.bind(that,that.notify_,result)
          //                           },
          //                         },
          //                         '接收'
          //                       ),
          //                       h(
          //                         'el-button',
          //                         {
          //                           class: 'button',
          //                           on: {
          //                             click: that.handleDisposal_.bind(that,that.notify_,result)
          //                           },
          //                         },
          //                         '处置'
          //                       )
          //                     ]
          //                       ),
          //                     ]),
          //                   ])
          //   })
          //   }
          //   let obj:any = {}
          //   obj.notify = that.notify_.notify
          //   obj.result = result
          //   that.notify_.resultList.unshift(obj)
          //   //  消息只读状态
          //   let obj_: any = {}
          //   obj.id = result.id
          //   obj.type = 'statusChange'
          //   obj.payload = {
          //     status: 'read',
          //   }
          //   that.wst.send(JSON.stringify(obj_))
          // } else {
            let flag = false
            // that.msgListinfo = localStorage.msgListinfo?JSON.parse(localStorage.msgListinfo):[]
            if (localStorage.msgListinfo) {
              that.msgListinfo = JSON.parse(localStorage.msgListinfo)
            } else {
              that.msgListinfo = []
            }
            that.msgListinfo.forEach((element:any) => {
              if (JSON.stringify(element) == JSON.stringify(result)){
                flag = true
              }
            });
            if (!flag && result.processType != "cancel") {
              highList.push(result)
            }
            if (result.processType == "cancel") {
            //  取消消息
            that.msgListinfo = that.msgListinfo.filter((ele:any) => {
              return ele.msgId != result.payload.msgId
            })
            // //console.log(that.msgListinfo,"==========")
          }
            // 待处理消息
            let processType: any = result.processType
            if (processType == 'forward') {
              if (result.payload) {
                let payload: any = result.payload
                if (payload.relativePath && payload.data) {
                  let obj: any = {}
                  obj.id = result.id
                  obj.type = 'statusChange'
                  obj.payload = {
                    status: 'read',
                  }
                  that.wst.send(JSON.stringify(obj))
                  // //console.log(payload.relativePath, 'payload.relativePath')
                  if (payload.data.cfsb && payload.data.fphm && payload.data.brxm) {
                    routerGo(payload.relativePath, '', { cfsb: payload.data.cfsb, fphm: payload.data.fphm, brxm: payload.data.brxm })
                    routerGo('', '', { cfsb: payload.data.cfsb, fphm: payload.data.fphm, brxm: payload.data.brxm })
                  }
                }
              }
            } else if (level == 'middle' || level == 'low') {
              if (processType == 'readOnly' || processType == 'cancel') {
                let obj: any = {}
                obj.id = result.id
                obj.type = 'statusChange'
                obj.payload = {}
                that.wst.send(JSON.stringify(obj))
              }
            // }
          }

        }
        if (level == 'middle') {
          let flag = false
          // that.msgListinfo = localStorage.msgListinfo?JSON.parse(localStorage.msgListinfo):[]
          if (localStorage.msgListinfo) {
            that.msgListinfo = JSON.parse(localStorage.msgListinfo)
          } else {
            that.msgListinfo = []
          }
          that.msgListinfo.forEach((element:any) => {
            if (JSON.stringify(element) == JSON.stringify(result)){
              flag = true
            }
          });
          if (!flag && result.processType != "cancel") {
            middleList.push(result)
          }
          if (result.processType == "cancel") {
            //  取消消息
            that.msgListinfo = that.msgListinfo.filter((ele:any) => {
              return ele.msgId != result.payload.msgId
            })
            // //console.log(that.msgListinfo,"==========")
          }
        }
        if (level == 'low') {
          let flag = false
          // that.msgListinfo = localStorage.msgListinfo?JSON.parse(localStorage.msgListinfo):[]
          if (localStorage.msgListinfo) {
            that.msgListinfo = JSON.parse(localStorage.msgListinfo)
          } else {
            that.msgListinfo = []
          }
          that.msgListinfo.forEach((element:any) => {
            if (JSON.stringify(element) == JSON.stringify(result)){
              flag = true
            }
          });
          if (!flag && result.processType != "cancel") {
            lowList.push(result)
          }
          if (result.processType == "cancel") {
            //  取消消息
            that.msgListinfo = that.msgListinfo.filter((ele:any) => {
              return ele.msgId != result.payload.msgId
            })
            // //console.log(that.msgListinfo,"==========")
          }
        }
        that.msgListinfo = that.msgListinfo.concat(highList).concat(middleList).concat(lowList)
        localStorage.setItem('msgListinfo', JSON.stringify(that.msgListinfo))
        if (result.processType == 'heartbeat') {
          let obj: any = {}
          obj.id = result.id
          obj.type = 'heartbeatAck'
          obj.payload = {}
          that.wst.send(JSON.stringify(obj))
        }
      }
    }
  }
  // 发送关闭消息  //初始化weosocket
  private initWebsocketclose() {
    let that = this
    if (window.WebSocket) {
      let identityCode: any = this.userInfos.identityCode // 机构代码
      let userId: any = this.userInfos.userId // 用户id
      let name: string = ''
      this.roleList.map((el: any) => {
        if (el.code == identityCode) {
          name = el.dv
        }
      })
      // let wsUrl =  `ws://192.168.55.211:9527/loginws?userId=${this.userInfo.userId}`
      // let wsUrl: any = `ws://blueuninfo.message.com:8000/message/alert/${name}/${userId}`
      // let wsUrl: any = `ws://` + '220.196.249.90:86' + `/message-service/message/alert/${name}/${userId}`  //  本地调试
      let wsUrl: any = `ws://` + window.location.host + `/message-service/message/alert/${name}/${userId}`

      var ws = new WebSocket(wsUrl)
      that.wst = ws
      //console.log(that.msgListinfo, 'that.msgListinfo')
      ws.onopen = function (e) {
      //console.log("连接服务器成功");
       // 连接服务器成功
        if (that.newsId) {
          let obj: any = {}
          obj.id = that.newsId
          obj.type = 'statusChange'
          obj.payload = {
            status: 'close',
          }
          that.wst.send(JSON.stringify(obj))
          that.newsId = ''
        }
      }

      // 服务器关闭
      ws.onclose = function (e) {
        //console.log('服务器关闭')
        // localStorage.setItem('msgListinfo', JSON.stringify([]))
        // that.initWebsocket()
      }

      // 连接出错
      ws.onerror = function (e) {
        // that.$message({
        //   message: '连接出错',
        //   type: 'error'
        // })
        //console.log('连接出错')
      }
      // 接收服务器的消息
      ws.onmessage = function (e: any) {}
    }
  }
  private webSqlReset() {
    const TableArr = ['TB_REGION', 'SYS_PRIMARY_DATA', 'SYS_FLAG_DATA', 'SYS_DICT_CONFIG', 'SYS_PRIMARY_DATA_VALUE', 'SYS_FLAG_DATA_VALUE', 'SYS_DICT_CONFIG_VALUE', 'GY_JBBM_VERSION', 'GY_JBBM']
    if (TableArr.length > 0) {
      TableArr.forEach((element: any) => {
        clearDBtable(element)
      })
      this.$router.push({ path: '/LoadingData' }).catch((err) => {})
    }
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }

private async logout() {
    await UserModule.LogOut()
    localStorage.removeItem('loginBizsn')
    localStorage.clear() //清除缓存
    // 三级等保，退出登录清表
    const TableArr = ['TB_REGION','TB_REGION_ALL', 'SYS_PRIMARY_DATA', 'SYS_FLAG_DATA', 'SYS_DICT_CONFIG', 'SYS_PRIMARY_DATA_VALUE', 'SYS_FLAG_DATA_VALUE', 'SYS_DICT_CONFIG_VALUE', 'GY_JBBM_VERSION', 'GY_JBBM']
    TableArr.forEach((element: any, index: number) => {
      clearDBtable(element)
      if (index == TableArr.length - 1) {
        window?.location?.reload?.()
      }
    })
}


  private changePassword() {
    // this.$router.push('/changePassword').catch(err => {
    //   //console.log('输出报错',err)
    // })
    routerGo('/system/changePassword', '')
  }

  /**
   * @LastEditors: zhml
   * @Description: 国际化切换语言
   * @param {type} params
   * @return:
   */

  private handleSetLanguage(command: any) {
    this.language = command.value
    this.language_name = command.language
    this.$i18n.locale = command.value
    const { fullPath } = this.$route
    this.reload()
    AppModule.SetLanguage(command.value)
    this.$store.dispatch('GenerateRoutes')
    this.$notify({
      title: this.$t('common.changeLanage').toString(),
      message: '',
      type: 'success',
    })
  }
  /**
   * @LastEditors: zhml
   * @Description: 通过 hospitalId 获取身份列表
   * @param {type} params
   * @return: stationList
   */
  private handleSelectOrg() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
    if (this.userInfo) {
      UserModule.Group({ hospitalId: this.userInfo.hospitalId }).then((res: any) => {
        this.stationList = res
        this.stationList.forEach((item: any) => {
          if ((item as any).groupId == this.userInfo.groupId) {
            this.selectUserData.groupId = (item as any).groupId
            this.selectUserData.groupName = (item as any).groupName
            this.selectUserData.icon = (item as any).icon
            this.yeCode = (item as any).groupCode
            Vue.prototype.AUTHORITY.xtlx = (item as any).systemType
            ;(global as any).headdata.xtlx = (item as any).systemType
            if (isEmpty(item.homepageUrl)) {
              this.$router.push({
                name: 'Dashboard',
              })
            } else {
              routerGo(item.homepageUrl, '')
            }
          }
        })
      })
    }
  }
  /**
   * @LastEditors: zhml
   * @Description: 点击机构，切换机构并刷新页面
   * @param {type} params
   * @return:
   */
  private async handleChange(item: any) {
    // this.initWebsocket()
    sessionStorage.setItem("isweb",'')
    let userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
    let org = userInfo.hospitalId
    let identity = item.groupId
    Vue.prototype.AUTHORITY.xtlx = (item as any).systemType
    ;(global as any).headdata.xtlx = (item as any).systemType
    const res = await UserModule.Submit({ hospitalId: org, groupId: identity })
    if (res) {
      let user = res
      ;(userInfo.groupId = res.groupId), (userInfo.identityName = item.groupName), (userInfo.identityCode = item.groupCode), localStorage.setItem('userInfo', JSON.stringify(userInfo))
      PermissionModule.GetRoutesName(res.groupId)
      if (isEmpty(item.homepageUrl)) {
        this.$router.push({
          name: 'Dashboard',
        })
      } else {
        routerGo(item.homepageUrl, '')
      }
      TagsViewModule.delAllViews()
    }
    setTimeout(() => {
      location.reload()
      localStorage.setItem('msgListinfo', JSON.stringify([]))
    }, 300)
  }

  /**
   * @description:获取业务列表
   * @param {type}
   * @return:
   */
  private async initBusinessData() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
    if (this.userInfo) {
      try {
        //获取业务权限列表
        const res = await UserModule.getAuthority({ groupId: this.userInfo.groupId })
        if (!isEmpty(res)) {
          this.businessList = res
          this.isEmptyAuthList = false //显示
          //获取选中的业务
          const res1 = await UserModule.getSelectJobRole({ groupId: this.userInfo.groupId })
          this.ksId = null
          if (res1) {
            this.businessList.forEach(async (item) => {
              if ((item as any).queryid == res1) {
                this.ksId = (item as any).queryid
                this.userAuthority.queryid = (item as any).queryid
                this.userAuthority.showname = (item as any).showname
                Vue.prototype.AUTHORITY.jobRole = this.userInfo.groupId
                ;(global as any).headdata.jobRole = this.userInfo.groupId
                Vue.prototype.AUTHORITY.bussinessRole = (item as any).queryid
                ;(global as any).headdata.bussinessRole = (item as any).queryid
                Vue.prototype.AUTHORITY.qxmc = (item as any).showname
                ;(global as any).headdata.qxmc = (item as any).showname
                Vue.prototype.AUTHORITY.lgbq = (item as any).lgbq
                ;(global as any).headdata.lgbq = (item as any).lgbq
                Vue.prototype.AUTHORITY.lgks = (item as any).lgks
                ;(global as any).headdata.lgks = (item as any).lgks
                // //console.log("通知父组件去渲染下一个子组件")
                this.$emit('changeAuth')
                const res2 = await UserModule.getOneByEntity({ queryid: this.userAuthority.queryid })
                if (res2) {
                  Vue.prototype.AUTHORITY.outpatientCode = res2.mzks
                  ;(global as any).headdata.outpatientCode = res2.mzks
                  Vue.prototype.AUTHORITY.kslb = res2.kslb
                  ;(global as any).headdata.kslb = res2.kslb
                  Vue.prototype.AUTHORITY.hlwks = res2.internet
                  ;(global as any).headdata.hlwks = res2.internet
                  if (localStorage.getItem('loginBizsn') == '') {
                    if (res2.internet == '1' && this.yeCode == 'CIS01') {
                      getEasemobUser({}).then((res: any) => {})
                      //获取互联网时CA码请求
                      this.certificateVisible = true
                      getTwoCode({ dataId: this.loginId.userId, type: 1 }).then((res: any) => {
                        this.imgURL = 'data:image/png;base64,' + res.data.qrcode
                        this.bizsn = res.data.bizSn
                        this.bizsnList = []
                        this.bizsntext = '请扫码'
                        Vue.prototype.AUTHORITY.loginBizsn = this.bizsn
                        ;(global as any).headdata.loginBizsn = this.bizsn
                      })
                      if (this.certificateVisible) {
                        clearInterval(this.timeId)
                        this.timeId = window.setInterval(() => {
                          this.timeNumber++
                          this.bizsnCallBack()
                        }, 1000)
                      } else {
                        //console.log('打印其他')
                        this.certificateVisible = false
                        clearInterval(this.timeId)
                        this.timeId = null
                        this.timeNumber = 0
                      }
                    }
                  } else {
                    this.bizsn = localStorage.getItem('loginBizsn')
                    Vue.prototype.AUTHORITY.loginBizsn = this.bizsn
                    ;(global as any).headdata.loginBizsn = this.bizsn
                  }
                }
              }
            })
            // 获取消息列表
            this.getMsgList(this.ksId)
          } else {
            // //console.log("通知父组件去渲染下一个子组件")
            this.$emit('changeAuth')
          }
        } else {
          // //console.log("通知父组件去渲染下一个子组件")
          this.$emit('changeAuth')
          this.isEmptyAuthList = true //隐藏
        }
      } catch (error) {
        // //console.log("通知父组件去渲染下一个子组件")
        this.$emit('changeAuth')
      }
    }
    // 获取全局路径
    if (window.location.href) {
      ;(global as any).headdata.webUrl = window.location.protocol + '//' + window.location.host
      //console.log('(global as any).headdata.webUrl: ', (global as any).headdata.webUrl)
    }
  }

  /**
   * @description: 获取消息列表
   * @param {ksId}
   * @return:
   */
  private getMsgList(ksId: any) {
    getMsgList({ ksId: ksId }).then((res: any) => {
      if (res.errorCode == 'SUCCESS') {
        this.msgList = res.data
        // //console.log(this.msgList, 'this.msgList====')
      }
    })
  }

  /**
   * @description: 再次获取消息列表
   * @param {ksId}
   * @return:  res.data
   */
  private getMessageList() {
    this.getMsgList(this.ksId)
  }

  /**
   * @description: 切换业务
   * @param {type}
   * @return:
   */
  private async handleSelectBusiness(item: any) {
    let that = this
    let groupId = this.userInfo.groupId
    let queryid = item.queryid
    let showname = item.showname
    const res = await UserModule.changeBid({
      queryid: queryid,
      showname: showname,
      groupId: groupId,
    })
    getMsgList({ ksId: queryid }).then((res: any) => {
      if (res.errorCode == 'SUCCESS') {
        this.msgList = res.data
      }
    })
    if (res) {
      if (that.businessList.length > 0) {
        if (JSON.stringify(that.businessList).indexOf(JSON.stringify(that.userInfo.groupId))) {
          that.userAuthority.groupId = that.userInfo.groupId
          that.userAuthority.queryid = item.queryid
          that.userAuthority.showname = item.showname
          Vue.prototype.AUTHORITY.jobRole = that.userInfo.groupId
          ;(global as any).headdata.jobRole = that.userInfo.groupId
          Vue.prototype.AUTHORITY.bussinessRole = item.queryid
          ;(global as any).headdata.bussinessRole = item.queryid
          Vue.prototype.AUTHORITY.qxmc = item.showname
          ;(global as any).headdata.qxmc = item.showname
          Vue.prototype.AUTHORITY.lgbq = (item as any).lgbq
          ;(global as any).headdata.lgbq = (item as any).lgbq
          Vue.prototype.AUTHORITY.lgks = (item as any).lgks
          ;(global as any).headdata.lgks = (item as any).lgks
          UserModule.getOneByEntity({ queryid: that.userAuthority.queryid }).then((res: any) => {
            if (res) {
              Vue.prototype.AUTHORITY.outpatientCode = res.mzks
              Vue.prototype.AUTHORITY.kslb = res.kslb
              ;(global as any).headdata.outpatientCode = res.mzks
              ;(global as any).headdata.kslb = res.kslb
              Vue.prototype.AUTHORITY.hlwks = res.internet
              ;(global as any).headdata.hlwks = res.internet
              //console.log('res.internet: ', res.internet, '133456789')
              //console.log('this.yeCode: ', this.yeCode)
              if (localStorage.getItem('loginBizsn') == '') {
                if (res.internet == '1' && this.yeCode == 'CIS01') {
                  //console.log('this.yeCode: ', this.yeCode, 1234566)
                  getEasemobUser({}).then((res: any) => {})
                  //console.log('res.internet: ', res.internet)
                  that.certificateVisible = true
                  that.bizsn = ''
                  that.imgURL = ''
                  clearInterval(that.timeId)
                  that.timeId = null
                  this.timeNumber = 0
                  // getEasemobUser({}).then((res: any) => {})
                  //console.log('发送请求前')

                  getTwoCode({ dataId: this.loginId.userId, type: 1 }).then((res: any) => {
                    //console.log('发送请求后')
                    that.imgURL = 'data:image/png;base64,' + res.data.qrcode
                    that.bizsn = res.data.bizSn
                    that.bizsnList = []
                    that.bizsntext = '请扫码'
                    Vue.prototype.AUTHORITY.loginBizsn = this.bizsn
                    ;(global as any).headdata.loginBizsn = this.bizsn
                  })
                  if (that.certificateVisible) {
                    that.timeId = window.setInterval(() => {
                      that.timeNumber++
                      //console.log('this.timeNumber: ', this.timeNumber)
                      that.bizsnCallBack()
                    }, 1000)
                  } else {
                    //console.log('打印其他')
                  }
                } else {
                  that.certificateVisible = false
                  clearInterval(that.timeId)
                  that.timeId = null
                  that.timeNumber = 0
                }
              } else {
                this.bizsn = localStorage.getItem('loginBizsn')
                Vue.prototype.AUTHORITY.loginBizsn = this.bizsn
                ;(global as any).headdata.loginBizsn = this.bizsn
              }

              // //console.log('切换科室的outpatientCode', Vue.prototype.AUTHORITY.outpatientCode)
            } else {
              Vue.prototype.AUTHORITY.outpatientCode = null
              Vue.prototype.AUTHORITY.kslb = null
              ;(global as any).headdata.outpatientCode = null
              ;(global as any).headdata.kslb = null
              // //console.log('未切换科室的outpatientCode', Vue.prototype.AUTHORITY.outpatientCode)
            }
            //隐藏药库权限弹窗
            AppModule.SetDialogInfo({ isShow: false, title: '', message: '' })
            that.$router.push({ name: 'Dashboard' }).catch((err) => {
              //console.log(err)
            })
            //隐藏弹窗
            ;(that.$refs.bussinessDropDown as any).hide()
            TagsViewModule.delAllViews()
          })
        }
      }
    }
  }

  // 初始获取当前语言
  private initLanguage() {
    for (let i of this.langList) {
      if (this.language == i.value) {
        this.language_name = i.language
      }
    }
  }

  // 关闭消息弹框
  private handleClose() {
    this.visible = false
    this.applyVisiable = false
  }

  // 打开消息弹框
  private handleOpen(data: any) {
    this.msgData = data
    if (data.count_ == '1') {
      this.title = '危急值接收'
      this.acceptForm.jssj = formatDate(2)
      this.acceptForm.tzyssj = formatDate(2)
      if (this.doctorList.length > 0) {
        this.doctorList.map((v: any) => {
          // this.acceptForm.tzysdm = this.userInfos.userId.toString()
          this.$set(this.acceptForm, 'tzysdm', this.userInfos.userId.toString())
          if (v.dv == this.userInfos.userId) {
            this.acceptForm.jsr = v.dn
          }
        })
      }
    } else {
      this.title = '危急值处置'
      this.disposalForm.jssj = formatDate(2)
      this.disposalForm.tzsj = formatDate(2)
      this.disposalForm.czsj = formatDate(2)
      this.disposalForm.jsys = this.userInfos.userId.toString()
      this.disposalForm.tzys = this.userInfos.userId.toString()
      this.disposalForm.czys = this.userInfos.userId.toString()
    }
    this.visible = data.visible
  }
  //  危机值取消
  private visible_() {
    this.visible = false
    this.newsId = this.msgData.newsId
    this.initWebsocketclose() // 发送关闭消息
  }
  // 危机值接收确定
  private handleAcceptConfirm() {
    const acceptForm: any = this.$refs.acceptForm
    acceptForm.validate((valid: boolean) => {
      // //console.log(this.acceptForm.tzysdm)
      if (valid) {
        updateNoticeInfo({ wjzdh: this.msgData.wjzdh, tzysdm: this.acceptForm.tzysdm }).then((res: any) => {
          if (res.errorCode == 'SUCCESS') {
            this.$notify({
              title: '接受成功！',
              message: '',
              type: 'success',
            })
            this.visible = false
            this.newsId = this.msgData.newsId
            this.initWebsocketclose() // 发送关闭消息
            // messcljlAdd({ ksId: '', messId: this.msgData.messId, ywtype: this.idx }).then((rr: any) => {
            //   if (rr.errorCode == 'SUCCESS') {
            //     messjsjlAdd({ ksId: this.ksId, messId: this.msgData.messId, ywtype: this.idx }).then((rr: any) => {
            //       if (rr.errorCode == 'SUCCESS') {
            //         this.getMessageList()
            //       }
            //     })
            //   }
            // })
          }
        })
      }
    })
  }

  // 危机值处置确定
  private handleDisposalConfirm() {
    const disposalForm: any = this.$refs.disposalForm
    disposalForm.validate((valid: boolean) => {
      if (valid) {
        updateDealInfo({ wjzdh: this.msgData.wjzdh, czcs: this.disposalForm.czcs }).then((res: any) => {
          if (res.errorCode == 'SUCCESS') {
            this.$notify({
              title: '处置成功！',
              message: '',
              type: 'success',
            })
            this.visible = false
            this.newsId = this.msgData.newsId
            this.initWebsocketclose() // 发送关闭消息
            // messcljlAdd({ ksId: '', messId: this.msgData.messId, ywtype: this.idx }).then((rr: any) => {
            //   if (rr.errorCode == 'SUCCESS') {
            //     messjsjlAdd({ ksId: this.ksId, messId: this.msgData.messId, ywtype: this.idx }).then((rr: any) => {
            //       if (rr.errorCode == 'SUCCESS') {
            //         this.getMessageList()
            //       }
            //     })
            //   }
            // })
          }
        })
      }
    })
  }

  // 打开会诊弹框
  private handleApplyOpen(data: any) {
    this.applyVisiable = true
    queryLoadInfo({ sqxh: data.sqxh }).then((res: any) => {
      if (res.errorCode == 'SUCCESS') {
        let result: any = res.data
        //console.log(result,"result =====>1567")
        this.$set(this.patientInfo, 'sqsj', result.sqsj) // 申请时间
        this.$set(this.patientInfo, 'sqxh', result.sqxh) // 申请单号
        this.$set(this.patientInfo, 'dbks', result.dbks) // 代表科室
        this.$set(this.patientInfo, 'ssys', result.ssys) //  所属医生
        this.$set(this.patientInfo, 'hzyj', result.hzyj) //  所属医生
        this.$set(this.patientInfo, 'jjbz', result.jjbz) // 紧急
        this.$set(this.patientInfo, 'hzsj', result.hzsj) // 会诊时间
        this.$set(this.patientInfo, 'nhzyy', result.nhzyy) // 会诊类型
        this.$set(this.patientInfo, 'nyqhzyyName', result.jgName) // 会诊医院
        this.$set(this.patientInfo, 'bqzl', result.bqzl) // 患者治疗情况
        this.$set(this.patientInfo, 'sqks', result.sqks) // 申请科室
        this.$set(this.patientInfo, 'sqys', result.sqys) // 主管医师签字

        this.$set(this.patientInfo, 'hzmd', result.hzmd) // 会诊目的
        this.$set(this.patientInfo, 'kzrys', result.kzrys) // 主治以上医生/科主任签字
        if (result.nyqhzks) {
          this.$set(this.patientInfo, 'nyqhzks', Array.isArray(result.nyqhzks) ? result.nyqhzks : result.nyqhzks.split(',')) // 拟邀会诊科室
        } else {
          this.$set(this.patientInfo, 'nyqhzks', []) // 拟邀会诊科室
        }
        //console.log(result.nyqhzks.split(','),"result.nyqhzks.split(',')")
        // result.yqdx = ["150","168"]
        if (result.yqdx) {
          this.$set(this.patientInfo, 'nyqhzys', Array.isArray(result.yqdx) ? result.yqdx : result.yqdx.split(',')) // 拟邀会诊医生
        }else {
          this.$set(this.patientInfo, 'nyqhzys', []) // 拟邀会诊医生
        }
        if (result.nhzyy != 1) {
          this.$set(this.patientInfo, 'nyqhzks', result.nyqhzks) // 拟邀会诊科室
          this.$set(this.patientInfo, 'nyqhzys2', result.nyqhzys2) // 拟邀会诊医生
        }
        this.$set(this.patientInfo, 'brxm', JSON.parse(data.messContent).BRXM) // 病人姓名
        this.$set(this.patientInfo, 'brxb', JSON.parse(data.messContent).BRXB) // 病人性别
        this.$set(this.patientInfo, 'rynl', JSON.parse(data.messContent).RYNL) // 入院年龄
        this.$set(this.patientInfo, 'ryrq', JSON.parse(data.messContent).RYRQ) // 入院日期
        this.$set(this.patientInfo, 'brbq', JSON.parse(data.messContent).BRBQ) // 病人病区
        this.$set(this.patientInfo, 'brch', JSON.parse(data.messContent).ZYHM) // 病人床号
        this.$set(this.patientInfo, 'zyhm', JSON.parse(data.messContent).MQZD) // 住院号码
        this.$set(this.patientInfo, 'mqzd', JSON.parse(data.messContent).MQZD) // 当前诊断
      }
    })
  }

  // 会诊申请确认
  private handleConfirm() {
    const patientInfo: any = this.$refs.patientInfo
    patientInfo.validate((valid: boolean) => {
      if (valid) {
        commitCisZyHzyj(this.patientInfo).then((res: any) => {
          if (res.errorCode == 'SUCCESS') {
            this.$notify({
              title: '提交成功！',
              message: '',
              type: 'success',
            })
            this.applyVisiable = false
            // messcljlAdd({ ksId: '', messId: this.msgData.messId, ywtype: this.idx }).then((rr: any) => {
            //   if (rr.errorCode == 'SUCCESS') {
            //     this.getMessageList()
            //   }
            // })
          }
        })
      }
    })
  }
  // 监听CA扫码确认
  private bizsnCallBack() {
    if (!this.bizsn) {
      return
    }
    watchCode({ bizSn: this.bizsn }).then((res: any) => {
      if (res.data.mkeyCode == 200) {
        setTimeout(() => {
          this.certificateVisible = false
          this.bizsnList = []
          this.bizsntext = '请扫码'
        }, 1000)
        clearInterval(this.timeId)
        this.timeNumber = 0
        // Vue.prototype.AUTHORITY.loginBizsn = this.bizsn
        // ;(global as any).headdata.loginBizsn = this.bizsn
        localStorage.setItem('loginBizsn', this.bizsn) // 缓存CA扫码信息
      } else if (res.data == null) {
      }
      if (this.bizsnList.indexOf(res.data.mkeyMsg) == -1) {
        this.bizsntext = res.data.mkeyMsg
      }
      //console.log('this.timeNumber: ', this.timeNumber)
      this.bizsnList.push(res.data.mkeyMsg)
    })
  }
  // 刷新二维码
  private refreshBtn() {
    this.bizsn = ''
    this.imgURL = ''
    clearInterval(this.timeId)
    this.timeId = null
    this.timeNumber = 0
    getTwoCode({ dataId: this.loginId.userId, type: 1 }).then((res: any) => {
      //console.log('发送请求后')
      this.imgURL = 'data:image/png;base64,' + res.data.qrcode
      this.bizsn = res.data.bizSn
      this.bizsnList = []
      this.bizsntext = '请扫码'
      Vue.prototype.AUTHORITY.loginBizsn = this.bizsn
      ;(global as any).headdata.loginBizsn = this.bizsn
      this.$message({
        message: '刷新成功',
        type: 'success',
      })
      if (this.certificateVisible) {
        this.timeId = window.setInterval(() => {
          this.timeNumber++
          //console.log('this.timeNumber: ', this.timeNumber)
          this.bizsnCallBack()
        }, 1000)
      } else {
        //console.log('打印其他')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
  padding: 0 !important;
}
.navbar {
  height: 34px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 34px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .pic-guojihua {
    widows: 30px;
    height: 30px;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    margin-right: 16px;
    float: right;
    height: 100%;
    line-height: 34px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-left: 16px;

      .avatar-wrapper {
        height: 34px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        span {
          padding: 0 4px 0 6px;
        }

        .user-avatar {
          cursor: pointer;
          width: 24px;
          height: 24px;
          border-radius: 4px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
        }
        span {
          padding: 0 6px;
        }
      }
    }
  }
}

.icons-wrap {
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding-right: 4px;
  vertical-align: top;
  border-right: 1px solid $border;
  > * {
    margin: 0 12px 0;
    cursor: pointer;
  }
  ::v-deep .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    color: $blue;
    text-align: center;
    line-height: 24px;
    border-radius: 6px;
    background: rgba($color: $blue, $alpha: 0.1);
  }
  .screen-full-wrap {
    position: relative;
    line-height: 24px;
  }
  .el-dropdown {
    line-height: 24px;
  }
}

.layout-navbar-dropdown {
  margin-top: 0px !important;
  ::v-deep .popper__arrow {
    display: none !important;
  }
}

.navbar-icon-blue {
  color: #1485ff;
}
// 危急值消息
::v-deep .el-dialog {
  .el-dialog__body {
    padding: 16px 24px;
    .dialog-box {
      overflow: hidden;
      .el-form {
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        .el-form-item {
          margin-bottom: 16px;
          width: calc(50% - 8px);
          display: flex;
          align-items: center;
          .el-form-item__label {
            height: 28px !important;
          }
          .el-form-item__content {
            .el-input__inner {
              height: 28px !important;
              line-height: 28px !important;
            }
          }
        }
        .wd50 {
          width: calc(50% - 8px) !important;
        }
        .wd100 {
          width: 100% !important;
        }
        ::v-deep .el-textarea__inner {
          padding: 5px;
        }
      }
    }
    .dialog-apply {
      .el-form {
        .el-form-item {
          width: calc(25% - 8px);
        }
      }
    }
  }
}
::v-deep .el-select {
  width: 100% !important;
}
::v-deep .dialog-footer {
  text-align: right;
  // border-top: 1px solid $lightGray;
}
.certificateClass {
  height: 340px;
}
.outDoor {
  position: fixed;
  margin-top: 34px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #323232;
  opacity: 0.8;
  z-index: 99;
  .certificateClass {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -80%);
    background-color: #fff;
    .textCode {
      position: relative;
      width: 100%;
      height: 30px;
      padding-top: 5px;
      .outdoorText {
        line-height: 25px;
        text-indent: 10px;
        color: #000;
      }
      .refreshText {
        margin: 5px 10px 0 0;
        padding: 0 20px;
        position: absolute;
        top: 0;
        right: 0;
        line-height: 25px;
        color: #23a5ff;
        font-weight: 500;
        background-color: #e7f3ff;
        border-radius: 2px;
        cursor: pointer;
      }
    }
    .outdoorTextTwo {
      line-height: 30px;
      height: 30px;
      font-weight: 550;
    }
  }
}
::v-deep .el-notification {
  // position:static !important
  top: auto !important;
}
.module-title{
  font-size: 16px;
  color: red;
  margin-bottom: 6px;
  &.blue{
    color: $blue;
  }
  &.red{
    color: $red;
  }
}
.button {
  margin-top: 6px;
}
.line {
  width: 1px;
  height: 30px;
  display: inline-block;
}
.huanz {
  margin: 5px;
}
.el-notification {
    top: auto !important;
    height: 120px;
}
.el-dialog__wrapper {
    top:-30px !important;
}
</style>

