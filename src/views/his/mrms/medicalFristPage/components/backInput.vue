// 西医病案首页-反面
<template>
  <div>
    <el-form
      :model="patientBackData"
      class="retrieval"
      ref="backDataRef"
      style="margin-bottom: 10px"
    >
      <el-row type="flex" class="his-back-title">
        <el-form-item label="手术及操作编码" style="font-weight: bold;margin-left:5x"></el-form-item>
        <el-form-item label="手术及操作日期" style="font-weight: bold;margin-left:5px"></el-form-item>
        <el-form-item label="手术级别" style="font-weight: bold; margin-left: 5px"></el-form-item>
        <el-form-item label="手术及操作名称" style="font-weight: bold; margin-left: 5px"></el-form-item>
        <el-form-item label="术者" style="font-weight: bold;margin-left:5px"></el-form-item>
        <el-form-item label="I助" style="font-weight: bold;margin-left:5px"></el-form-item>
        <el-form-item label="II助" style="font-weight: bold; margin-left: 5px"></el-form-item>
        <el-form-item label="切口愈合等级" style="font-weight: bold; margin-left: 5px"></el-form-item>
        <el-form-item label="麻醉方式" style="font-weight: bold; margin-left: 5px"></el-form-item>
        <el-form-item label="麻醉医师" style="font-weight: bold; margin-left: 5px"></el-form-item>
        <el-form-item style="width: 60px"></el-form-item>
      </el-row>
      <el-row type="flex" class="his-back-top">
        <el-form-item>
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" v-model="value" placeholder="请输入"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请输入">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请输入">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请输入">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请输入">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请输入">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请输入">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请输入">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请输入">
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 60px;color: #1485ff">
          <i class="icon his-disabled" style="margin-right: 4px;color:red"></i>删除
        </el-form-item>
      </el-row>
      <el-row>
        <div class="row">
          <div class="label" style="font-size: 14px">
            <i class="icon his-btn-add" style="margin-right: 5px;"></i>
            <div style="color:#1485ff">新增手术</div>
          </div>
        </div>
      </el-row>
    </el-form>
    <el-form :model="patientBackData1" class="retrieval" label-width="73px" ref="backData1Ref">
      <el-row type="flex">
        <el-form-item label="离院方式" label-width="60px">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拟接收医疗机构名称" label-width="126px">
          <el-input v-model="value" placeholder="请输入" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
      </el-row>
      <el-row type="flex" class="his-back-item">
        <el-form-item label="是否有出院31天内再住院计划" label-width="180px">
          <el-select v-model="value" style="width: 184px">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目的" style="margin-left: 102px" label-width="34px">
          <el-input v-model="value" placeholder="请输入" style="width: 302px"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
      </el-row>
      <el-row type="flex" class="his-back-time">
        <el-form-item label-width="151px" label="颅脑损伤患者昏迷时间："></el-form-item>
        <el-form-item label="入院前" label-width="47px">
          <el-input placeholder="请输入" v-model="value"></el-input>
        </el-form-item>
        <el-form-item label="天" label-width="20px">
          <el-input placeholder="请输入" v-model="value"></el-input>
        </el-form-item>
        <el-form-item label="小时" label-width="35px">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分钟"></el-form-item>
        <el-form-item label="入院后" label-width="47px">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="天" label-width="20px">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="小时" label-width="35px">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分钟"></el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="住院费用(元)：总费用" label-width="134px">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="（自付金额" style="width: 120px;margin-left:-80px">
          <el-input v-model="value" placeholder="请输入" style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label=")" label-width="10px" style="margin-left: -18px"></el-form-item>
        <el-form-item></el-form-item>
      </el-row>

      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="1.综合医疗服务类：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(1)一般医疗服务费" label-width="115px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(2)一般治疗操作费" label-width="115px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(3)护理费" label-width="63px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(4)其他费用" label-width="76px" class="his-back-last">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="2.诊断类：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(5)病理诊断费" label-width="89px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(6)实验室诊断费" label-width="102px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(7)影像学诊断费" label-width="102px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(8)临床诊断项目费" label-width="115px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="3.治疗类：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(9)非手术治疗项目费" label-width="128px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(临床物理治疗费" label-width="104px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label=")" style="margin-left: -13px"></el-form-item>
          <el-form-item label="占位置，无作用" label-width="88px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="his-back-type" style="margin-left: 149px">
        <el-form-item label="(10)手术治疗费" label-width="97px">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="(麻醉费" label-width="52px">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手术费">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label=")" style="margin-left: -13px"></el-form-item>
      </div>
      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="4.康复类：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(11)康复费" label-width="71px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="63px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="63px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="83px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="5.中医类：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(12)中医治疗费" label-width="97px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="63px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="63px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="63px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="6.西药类：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(13)西药费" label-width="71px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(抗菌药物费用" label-width="91px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label=")" style="margin-left: -13px"></el-form-item>
          <el-form-item label="占位置，无作用" label-width="63px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="63px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="7.中药类：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(14)中成药费" label-width="84px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(15)中草药费" label-width="84px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="63px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="123px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="8.血液和血液类制品费：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(16)血费" label-width="58px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(17)白蛋白类制品费" label-width="123px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(18)球蛋白类制品费" label-width="123px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="占位置，无作用" label-width="63px" style="visibility: hidden">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="his-back-type">
        <el-form-item label="(19)凝血因子类制品费" label-width="137px" style="margin-left: 149px">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="(20)细胞因子类制品费" label-width="137px">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="占位置，无作用" label-width="163px" style="visibility: hidden">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="9.耗材类：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(21)检查用一次性医用材料费" label-width="175px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(22)治疗用一次性医用材料费" label-width="175px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="(23)手术用一次性医用材料费" label-width="175px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="his-back-type">
        <div class="his-back-type0">
          <el-form-item label="10.其他类：" label-width="149px"></el-form-item>
        </div>
        <div class="his-back-type1">
          <el-form-item label="(24)其他费" label-width="71px">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
@Component({
  name: 'backInput',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private patientBackData: any = {}
  private value: any = ''
  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
.content .his-module .el-form {
  margin: 0 auto;
}

.content .his-small .retrieval .el-row {
  height: 28px;
}

.content .his-small .retrieval .el-row .el-form-item {
  width: calc(25% - 8px);

  //   margin-bottom: 16px;
}
.content .his-small .retrieval .his-back-title.el-row .el-form-item {
  width: calc(9.7% - 8px);
}
.content .his-small .retrieval .his-back-title.el-row {
  margin-bottom: 0;
}

.content .his-small .retrieval .his-back-top.el-row .el-form-item {
  width: calc(9.7% - 8px);
}
// .content .his-small .retrieval .his-back-type.el-row::v-deep {
//   .el-form-item {
//     justify-content: flex-start;
//     margin-right: 16px;
//   }
//   .el-form-item:nth-of-type(2){
//       margin-left: -90px;
//   }
//   .el-form-item.his-back-last{
//       margin-left: -53px;
//   }

// }

.content .his-small .retrieval .his-back-time.el-row .el-form-item {
  margin-right: 4px;
}
.content .his-small .retrieval .el-row {
  margin-bottom: 16px;
}
.content .his-small .el-form .his-back-type::v-deep .el-form-item .el-input--medium .el-input__inner {
  width: 120px;
}
// .content .his-small .retrieval .his-back-type.el-row .el-form-item:nth-of-type(2) {
//   margin-left: -90px;
// }
.content .his-small .el-form .el-form-item::v-deep .el-form-item__label{
    line-height: 14px;
}

.content .his-small .retrieval .his-back-type::v-deep {
  width: 100%;
  display: inline-block;
  .his-back-type0 {
    width: 149px;
    .el-form-item {
      margin-right: 0;
    }
  }
  .his-back-type1 {
    width: calc(100%);
  }
  .el-form-item {
    float: left;
    display: block;
    margin-right: 16px;
  }
}
</style>