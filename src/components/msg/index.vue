
// 消息推送
<template>
<!-- src/components/msg/index.vue -->
  <!-- <div class="icons-wrap" @click="handleShow">
    <el-tooltip :content="'消息'" placement="bottom" effect="light" popper-class="msg-tooltip">
      <el-popover
        v-model="msgVisible"
        placement="bottom-start"
        width="420"
        :visible-arrow="false"
        popper-class="msg-wrapper"
      >
        <div class="msg-head">
          <div>消息<span>{{msgListinfo.length}} 条</span></div>
          <i class="icon his-close" @click="msgVisible=false"></i>
        </div>
        <ul class="scroll-bar">
          <li v-for="item in msgListinfo" :key="item.id">
            <div class="msg-upper">
              <span class="module-title">【{{item.payload.title}}】</span>

              <span class="time"><i v-if="item.sendTime" class="icon his-naozhong"></i>{{item.sendTime}}</span>
            </div>
            <div class="msg-middle">
              <span v-for="(itm,i) in item.payload.contents" :key='i'>
                <span>{{itm.label}}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{itm.content}}</span>
              </span>
            </div>
            <div class="operation">
              <el-button v-if="item.target.system !='zyysz'" @click="handleDisposal(item)">处置</el-button>

              <el-button v-if="item.target.system =='zyysz'" @click="handleAccept_(item)">接收</el-button>
              <el-button v-if="item.target.system =='zyysz'" @click="handleDisposal_(item)">处置</el-button>

            </div>
          </li>
        </ul>
        <i slot="reference" class="icon his-btn-news"></i>
        <i slot="reference" class="dot"></i>
      </el-popover>
    </el-tooltip>
  </div> -->
  <div>
    <div 
      class="divMsg" 
      :class="{'his-msg1': !isDrag,'his-msg2': isDrag}" 
      @click="msgShow" 
      id="icons-wrap" 
      v-drag 
      @mousedown="handleDown"
      @mouseup="handleUp"
    >
      <img :draggable="false" class="img" :src="msgImg" alt />
      <!-- <img :draggable="false" v-show="msgListinfo.length>99" class="img_" :src="msgImg_" alt /> -->
      <div class="imgNum">{{msgListinfo.length}}</div>
    </div>
    <div v-show="msgListinfo.length" class="div" id="icons-wrap_show">
        <div class="msg-head">
          <div v-show="msgListinfo.length <= 99" class="msgNum">{{msgListinfo.length}}</div>
          <img v-show="msgListinfo.length > 99" class="img" :src="msgNum_" alt />
          <div >消息</div>
          <div class="closeI">
            <img class="img" @click="hiddenMsg" :src="closeImg" alt />
          </div>
        </div>
        <ul class="scroll-bar">
          <li v-for="item in msgListinfo" :key="item.id">
            <div class="msg-upper">
              <img class="img" :src="currentConsultation" alt />
              <span class="module-title">{{item.payload.title}}</span>
              <span class="time"><i v-if="item.sendTime" class="icon his-naozhong"></i>{{item.sendTime}}</span>
            </div>
            <div class="msg-middle">
              <span class="msg-middle_" v-for="(itm,i) in item.payload.contents" :key='i'>
                <span>{{itm.label}}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{itm.content}}</span>
              </span>
              <div class="float_R">
                <!-- <div class="operation"> -->
                <!-- <el-button size="mini" v-if="!item.payload.data.isCritical && item.target.system !='zyysz'" @click="handleDisposal(item)">处置</el-button> -->
                <div class="btn" v-if="!item.payload.data.isCritical && item.target.system !='zyysz'" @click="handleDisposal(item)"><img class="img" :src="edit" alt />处置</div>
                <!-- <el-button size="mini" v-if="!item.payload.data.isCritical && item.target.system =='zyysz'" @click="handleDisposal(item)">处置</el-button> -->
                <div class="btn" v-if="!item.payload.data.isCritical && item.target.system =='zyysz'" @click="handleDisposal(item)"><img class="img" :src="edit" alt /><span>处置</span></div>

                <!-- 危机值 -->
                <!-- 护士站 -->
                <!-- <el-button size="mini" v-if="item.target.system !='zyysz' && item.payload.data.isCritical" @click="handleDisposal(item)">接收</el-button> -->
                <div class="btn" v-if="item.target.system !='zyysz' && item.payload.data.isCritical" @click="handleDisposal(item)"><img class="img" :src="edit" alt />接收</div>

                <!-- 医生站 -->
                <!-- <el-button size="mini" v-if="item.target.system =='zyysz' && item.payload.data.isCritical" @click="handleAccept_(item)">接收</el-button> -->
                <div class="btn" v-if="item.target.system =='zyysz' && item.payload.data.isCritical" @click="handleAccept_(item)"><img class="img" :src="edit" alt />接收</div>
                <!-- <el-button size="mini" v-if="item.target.system =='zyysz' && item.payload.data.isCritical" @click="handleDisposal_(item)">处置</el-button> -->
                <div class="btn" v-if="item.target.system =='zyysz' && item.payload.data.isCritical" @click="handleDisposal_(item)"><img class="img" :src="edit" alt />处置</div>
                <!-- </div> -->
              </div>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop ,Watch} from 'vue-property-decorator'
import { aMsgProcess, updateReceiveInfo, messcljlAdd, updateZtByJlxh } from '@/api/users'
import { routerGo } from '@/utils/utils'
import { watch } from 'fs'
// import { Notification } from 'element-ui';
import { forEach } from 'node_modules/jszip'
@Component({
  name: 'msg',
  components: {
  },
})
export default class extends Vue {
  @Prop({ required: true, default: () => ({}) }) private msgList: any // 消息信息
  // @Prop({ required: true, default: () => ({}) }) private msgListinfo: any // 消息信息
  @Prop({ required: true, default: () => ({}) }) private identity: any // 角色名称
  private msgImg:any =require('@/assets/msg/msg.png')
  private msgImg_:any =require('@/assets/msg/msgT.png')
  private msgNum:any =require('@/assets/msg/msgNum.png')
  private msgNum_:any =require('@/assets/msg/msgNum_.png')
  private closeImg:any =require('@/assets/msg/close.png')
  private currentConsultation:any =require('@/assets/msg/currentConsultation.png')
  private edit:any =require('@/assets/msg/edit.png')
  private msgVisible: boolean = false // 消息框显示隐藏
  private count_: string = '0' // 消息框显示隐藏
  private newsId: string = '' // 消息id
  private countNumber: any = 1 // 消息id
  private msgListinfo: any[] = [] // 消息列表
  private index: number | null = null
  private isDrag: boolean = false
  private msgModuleType: any = [ // 消息模块
    {type: 1, name: '危机值', title: '危机值内容：', contKey: 'WJZXMMC', color: 'red'},
    {type: 2, name: '会诊申请', title: '', contKey: 'sqys', color: 'blue'},
    {type: 3, name: '变动医嘱', title: '医嘱内容：', contKey: 'WJZXMMC', color: 'blue'},
    {type: 4, name: '发药配置', title: '发药配置：', contKey: '', color: 'blue'},
    {type: 5, name: '特殊级抗菌药物会诊申请', title: '', contKey: '', color: 'blue'},
  ]
  private ws: any = null
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
    { code: 'HIS04', dn: '接口服务平台', dv: 'jkfwpt' },
    { code: 'ECIS02', dn: '草药库管理', dv: 'cykgl' },
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
    { code: 'admin', dn: '超级管理员', dv: 'cjgly' },
  ]
  created() {
    this.index = this.identity.indexOf('医生') > 0 ? 2 : 1
  }
  mounted() {
    setInterval(() => {
      if (localStorage.msgListinfo) {
        this.msgListinfo = JSON.parse(localStorage.msgListinfo)
      } else {
        this.msgListinfo = []
      }
      // this.msgListinfo = localStorage.msgListinfo?JSON.parse(localStorage.msgListinfo):[]
      var box:any = document.getElementById("icons-wrap")
      if (this.msgListinfo.length) {
        box.style.display = "block"
      } else {
        box.style.display = "none"
      }
    },2000)
  }
  // 获取用户信息
  get userInfo() {
    return JSON.parse(localStorage.userInfo)
  }

  // 按下
  private handleDown() {
    this.isDrag = true
  }

  // 抬起
  private handleUp() {
    this.isDrag = false
  }

  private drag() {
    console.log('123131313')
    this.isDrag = true
  }
  //  点击消息图案,显示消息列表
  private msgShow() {
    let isClick = document.getElementById('icons-wrap')?.getAttribute('data-flag');
    if(isClick != 'true') {
      return false
    }
    let msgShow:any = document.getElementById("icons-wrap_show")
    if (this.msgListinfo.length) {
        msgShow.style.display = "block"
    } else {
      msgShow.style.display = "none"
    }
  }

  // 关闭消息
  private closeMsg(){
    this.msgVisible = false
  }
  // 获取用户信息
  get userInfos() {
    return JSON.parse(localStorage.userInfo)
  }
  //初始化weosocket
  private initWebsocket() {
    let that = this;
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
      let wsUrl: any = `ws://`+ window.location.host+`/message-service/message/alert/${name}/${userId}`
      //console.log()
      var ws = new WebSocket(wsUrl);
      that.ws = ws;
      //console.log(that.msgListinfo,"that.msgListinfo")
      // 连接服务器成功
      ws.onopen = function(e) {
        // //console.log("连接服务器成功");
        // let msg = {
        //   type: 1,
        //   uid: that.uid
        // };
        // ws.send(JSON.stringify(msg));
        //console.log(that.msgListinfo,"that.msgListinfo")
        let idList: any= []
        // for (let i = 0 ; i < that.msgListinfo.length; i++) {
        //   // debugger
        //   // if (idList.includes(that.msgListinfo[i].id)) break
        //   let obj: any = {}
        //   obj.id = that.msgListinfo[i].id
        //   obj.type = 'statusChange'
        //   obj.payload = {
        //     status: 'read'
        //   }
        //   idList.push(that.msgListinfo[i].id)
        //   that.ws.send(JSON.stringify(obj))
        // }

        that.msgListinfo.forEach((itm:any) => {
            if (idList.includes(itm.id)) return
            let obj: any = {}
            obj.id = itm.id
            obj.type = 'statusChange'
            obj.payload = {
              status: 'read'
            }
            idList.push(itm.id)
            idList = [...new Set(idList)]  // 去重
            that.ws.send(JSON.stringify(obj))
          })
      }

      // 服务器关闭
      ws.onclose = function(e) {
        //console.log("服务器关闭");
        // localStorage.setItem('msgListinfo', JSON.stringify([]))
        // that.initWebsocket()
      }

      // 连接出错
      ws.onerror = function(e) {
        // that.$message({
        //   message: '连接出错',
        //   type: 'error'
        // })
        //console.log("连接出错");
      }
      // 接收服务器的消息
      ws.onmessage = function (e: any) {
        // //console.log("Received Message: ", e.data)
        // //console.log(e);
          // that.msgListinfo.forEach((itm:any) => {
          //   let obj: any = {}
          //   obj.id = itm.id
          //   obj.type = 'statusChange'
          //   obj.time = new Date()
          //   obj.payload = {
          //     status: 'read'
          //   }
          //   //console.log(new Date(),"new Date()")
          //   that.ws.send(JSON.stringify(obj))
          //   return
          // })
        // if(e.data == 'mes.getAllMess'){
        //   that.msgVisible = true
        //   that.$emit('getMessageList')
        // }
      }
    }
  }
  // 发送关闭消息  //初始化weosocket
  private initWebsocketclose() {
    let that = this;
    if (window.WebSocket) {
      let identityCode: any = this.userInfos.identityCode // 机构代码
      let userId: any = this.userInfos.userId // 用户id
      let name: string = ''
      this.roleList.map((el: any) => {
        if (el.code == identityCode) {
          name = el.dv
        }
      })
      let wsUrl: any = `ws://` + window.location.host + `/message-service/message/alert/${name}/${userId}`
      // let wsUrl: any = `ws://` + '220.196.249.90:86' + `/message-service/message/alert/${name}/${userId}`  //  本地调试

      //console.log(wsUrl)
      var ws = new WebSocket(wsUrl);
      that.ws = ws;
      //console.log(that.msgListinfo,"that.msgListinfo")
      // 连接服务器成功
      ws.onopen = function(e) {
        // //console.log("连接服务器成功");
            if (that.newsId) {
              //console.log("305==============305")
              let obj: any = {}
                obj.id = that.newsId
                obj.type = 'statusChange'
                obj.payload = {
                  status: 'close'
                }
                that.ws.send(JSON.stringify(obj))
                that.newsId = ''
            }
         }

      // 服务器关闭
      ws.onclose = function(e) {
        //console.log("服务器关闭");
        let array = []
        // localStorage.setItem('msgListinfo', JSON.stringify([]))

        // that.initWebsocket()
      }

      // 连接出错
      ws.onerror = function(e) {
        // that.$message({
        //   message: '连接出错',
        //   type: 'error'
        // })
        //console.log("连接出错");
      }
      // 接收服务器的消息
      ws.onmessage = function (e: any) {
      }
    }
  }
  private hiddenMsg() {
    let box:any = document.getElementById("icons-wrap_show")
    box.style.display = "none"
  }
  private handleShow(){
    this.msgVisible = true
    this.initWebsocket()
  }
  // 危急值消息 接受
  private handleAccept_ (item: any) {
    this.count_ = '1'    //  危机值点击接受
    this.handleAccept(item)
  }
  // 危急值消息 处置
  private handleDisposal_ (item: any) {
    this.count_ = '2'    //  危机值点击处置
    this.handleAccept(item)
  }
  // 危急值接口
  private handleAccept(item: any){
    let list = this.msgListinfo.filter((ele) => {
      return JSON.stringify(ele) != JSON.stringify(item)
    })
    localStorage.setItem('msgListinfo', JSON.stringify(list))
    //console.log(list,"list")
    let wjzdh: number = item.payload.data.wjzdh // 危急值单号
    updateReceiveInfo({wjzdh: wjzdh}).then((res: any) => {
      if(res.errorCode=="SUCCESS"){
        let param: any = res.data
        param.count_ = this.count_   //  危机值点击接受
        // param.type = item.serType
        param.wjzdh = wjzdh
        param.newsId = item.id  // 消息的id
        param.visible = true
        // param.index = 1
        this.$emit('handleOpen',param)
      }
    })
  }

  // 消息接受
  private handleDisposal(item: any){
    let list = this.msgListinfo.filter((ele) => {
      return JSON.stringify(ele) != JSON.stringify(item)
    })
    localStorage.setItem('msgListinfo', JSON.stringify(list))

    //console.log("跳出护士站危机值")
    this.newsId = item.id
    let item_ = item.payload
    if (item.payload.data.isCritical) {  //  危机值
      this.handleAccept_(item)
    } else {
      // 会诊
      if (item_.relativePath && item_.relativePath == '1') {
        this.msgVisible = false
        this.$emit('handleApplyOpen',item_.data)
      }
      //  变动医嘱消息处置
      if (item_.relativePath == 'im/nursePatientHomePage') {
        this.msgVisible = false
        item_.data.tabsName =  "orderEntry"
        item_.data.isFixed =  true
        item_.data.tabsLabel =  ""
        item_.data.hww =  "hww"
        let patient:object = Object.assign({},item_.data)

        updateZtByJlxh({jlxh:item.payload.data.jlxh}).then((res: any) => {
          if (res.errorCode=="SUCCESS") {
            sessionStorage.setItem('zydh', item.payload.data.zyhm)
            this.countNumber = sessionStorage.getItem('countNumber')
            if (this.countNumber) {
              this.countNumber = Number(this.countNumber) + 1
            } else {
              this.countNumber = 1
            }

            sessionStorage.setItem('countNumber', this.countNumber)
            // routerGo('nursePatientHomePage', '')
            // this.$router.push({name: "nursePatientHomePage",})
            //console.log("===================")
            if (this.$route.path !== '/im/nursePatientHomePage') {

              this.$router.push({ path: '/im/nursePatientHomePage' })
              // this.initWebsocketclose()  // 发送关闭消息

            } else { }
          }
        })
      }
      //  特殊级抗菌药物使用会诊处置
      if (item_.relativePath == 'im/useApprovalDoctTS') {
        localStorage.setItem('sqdh_', item_.data.sqdh)
        this.msgVisible = false
        routerGo('useApprovalDoctTS', '')
      }
      setTimeout(() => {
       this.initWebsocketclose()  // 发送关闭消息
      },2000)
    }
    //console.log(list,"list")
  //   if(item.serType == 1){
  //     // 危急值消息处置
  //     let wjzdh: number = JSON.parse(item.messContent).WJZDH // 危急值单号
  //     updateReceiveInfo({wjzdh: wjzdh}).then((res: any) => {
  //       if(res.errorCode=="SUCCESS"){
  //         let param: any = res.data
  //         param.type = item.serType
  //         param.messId = item.messId
  //         param.visible = true
  //         param.index = 2
  //         this.$emit('handleOpen',param)
  //       }
  //     })
  //   }else if(item.serType == 2){
  //     // 会诊申请处置
  //     this.$emit('handleApplyOpen',item)
  //   }else if(item.serType == 3){
  //     // 变动医嘱消息处置
  //     // routerGo('/drug/directPills', '')
  //     messcljlAdd({ksId: '', messId: item.messId, ywtype: this.index}).then((rr: any) => {
  //       if (rr.errorCode == 'SUCCESS') {
  //         this.$emit('getMessageList')
  //       }
  //     })
  //   }else if(item.serType == 4){
  //     // 药房发药消息
  //   }else if(item.serType == 5){
  //     // 特殊级抗菌药物使用会诊处置
  //     routerGo('/im/useApprovalDoctTS/', '')
  //     messcljlAdd({ksId: '', messId: item.messId, ywtype: this.index}).then((rr: any) => {
  //       if (rr.errorCode == 'SUCCESS') {
  //         this.$emit('getMessageList')
  //       }
  //     })
  //   }
  }
}
</script>

<style lang="scss" scoped>
.icons-wrap{
  *{
    position: relative;
    margin: 0 12px 0;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
  }
  .dot{
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $light-red;
  }
}
</style>

<style lang="scss" scoped>
.scroll-bar {
  padding-left: 15px;
  height: 350px;
  background-color: #fafdff;
  .msg-upper {
    img {
      margin-right: 5px;
    }
  }
  li {
    border-bottom: 1px solid #EEF0F3;
  }
}
// 消息
.msg-tooltip.el-tooltip__popper{
  margin-top: 7px;
}

.msg-wrapper.el-popover{
  // max-height: 300px;
  margin-top: 6px;
  padding: 0;
}

.msg-head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 0 10px;
  border-bottom: 1px solid $border;
  div{
    font-size: 16px;
    color: $first;
    span{
      margin-left: 6px;
      font-size: 14px;
      color: $second;
    }
  }
  .icon{
    font-size: 20px;
    color: $third;
    cursor: pointer;
  }
}
.msg-wrapper ul{
  max-height: 260px;
  li{
    position: relative;
    padding: 10px 10px 10px 30px;
    border-top: 1px solid $border;
    &:nth-child(1){
      border: none;
    }
  }
  .msg-upper{
    display: inline-block;
    margin-left: -8px;
    padding-left: 10px;
    .module-title{
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #222B31;
      line-height: 21px;
      text-shadow: 0px 16px 40px rgba(0, 0, 0, 0.12);

      &.blue{
        color: $blue;
      }
      &.red{
        color: $red;
      }
    }
    .time{
      margin-left: 10px;
      font-size: 12px;
      color: $second;
      .icon{
        margin-right: 4px;
        font-size: 14px;
      }
    }
  }

  .msg-lower{
    span{
      color: $first;
      &:nth-child(1){
        color: $second;
      }
    }
  }
  .dot{
    position: absolute;
    top: 50%;
    left: 12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #000;
    &.blue{
      background: $blue;
    }
    &.red{
      background: $red;
    }
  }
  .operation{
    position: absolute;
    top: 10px;
    right: 8px;
    font-size: 14px;
    cursor: pointer;
    .el-button{
      padding: 4px 10px;
      color: $blue;
      border-radius: 4px;
      background: rgba($color: $blue, $alpha: .2);
    }
  }

}
::v-deep .el-notification {
  // position:static !important
  top: auto !important;
}
.el-notification .el-notification__group {
    line-height: normal;
    width: 400px;
}
    .module-title{
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #222B31;
      line-height: 21px;
      text-shadow: 0px 16px 40px rgba(0, 0, 0, 0.12);
    }
    .line {
      width: 1px;
      height: 30px;
      display: inline-block;
    }
    .div {
      padding-top: 5px;
      position: fixed;
      bottom: 10px;
      right: 0;
      z-index: 99999;
      background: white;
      width: 374px;
      height: 400px;
      overflow-y: auto;
      display: none;
      border-radius: 10px;
      box-shadow: 0px 16px 40px 0px rgba(0, 0, 0, 0.12);
    }
    .el-button--medium {
      margin: 0 10px;
    }
    .divMsg {
      position: fixed;
      bottom: 30px;
      right: 20px;
      z-index: 9999;
      width: 82px;
      height: 60px;
      display: none;
    }
    
    .his-msg1 {
      // cursor: url('../../assets/msg/mouseHand1.ico'),default;
    }

    .his-msg2 {
      // cursor: url('../../assets/msg/mouseHand2.ico'),default;
    }
   
    .img {
      vertical-align: middle
    }
    .img_ {
      position: absolute;
      bottom: 29px;
      right: 2px;
      z-index: 9999999;
    }
    .imgNum {
      position: absolute;
      bottom: 25px;
      right: 15px;
      font-size: 12px;
      z-index: 999999;
      color: #FFFFFF;
    }
    .msgNum{
      width: 52px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      font-size: 12px;
      background: url(../../assets/msg/msgNum.png) no-repeat;
    }
    .float_R {
      float: right;
    }
    .btn {
      display: inline-block;
      font-size: 14px;
      color: #1485FF;
      margin: 0 6px;
      cursor:pointer;//鼠标变小手
    }
    .closeI {
      display: inline-block;
      width: 50px;
      padding-left: 20px;
    }
    .msg-middle_ span {
      font-size: 13px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #6A6D78;
      line-height: 20px;
      letter-spacing: 1px;
      text-shadow: 0px 16px 40px rgba(0, 0, 0, 0.12);
    }
</style>
