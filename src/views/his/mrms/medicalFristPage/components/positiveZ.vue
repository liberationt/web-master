// 中医病案首页填写-正面
<template>
  <div>
    <div class="row">
      <div class="label">
        <div class="title">住院病案首页</div>
        <el-divider direction="vertical"></el-divider>
        <div class="title">上海天佑医院</div>
        <div class="his-mrms-tag">(组织机构代码：8887384992)</div>
        <el-divider direction="vertical"></el-divider>
      </div>
    </div>
    <el-form :model="patientPositiveData" ref="patientDataRef" label-width="73px" class="retrieval">
      <el-row type="flex" style="border-bottom: 1px solid #f0f0f0;margin-bottom: 8px">
        <el-form-item label="医疗付费方式" prop="ylfffs">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="健康卡号" prop="jkkh">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="住院次数" prop="zycs">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="病案号" prop="bah">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="姓名" prop="ylfffs">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="jkkh">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="zycs">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="bah">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="国籍" prop="ylfffs">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄(不足一周岁)" prop="jkkh">
          <el-input v-model="value" placeholder="请输入">
            <template slot="append">月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="新生儿出生体重" prop="zycs">
          <el-input v-model="value" placeholder="请输入">
            <template slot="append">克</template>
          </el-input>
        </el-form-item>
        <el-form-item label="新生儿入院体重" prop="bah">
          <el-input v-model="value" placeholder="请输入">
            <template slot="append">克</template>
          </el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="cascade">
        <el-form-item label="出生地址" prop="ylfffs">
          <cascade-address
            :backfillObj="backfillObj"
            v-model="addressValue"
            :key="cascadeIndex"
            style="width:100%"
          />
        </el-form-item>
        <el-form-item label="籍贯" prop="jkkh">
          <cascade-address
            :backfillObj="backfillObj"
            v-model="addressValue"
            :key="cascadeIndex"
            style="width:100%"
            class="his-cascade"
          />
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="民族" prop="ylfffs">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="jkkh">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="职业" prop="zycs">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="婚姻" prop="bah">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="cascade1">
        <el-form-item label="现住地址" prop="ylfffs">
          <cascade-address
            :backfillObj="backfillObj"
            v-model="addressValue"
            :key="cascadeIndex"
            style="width:478px"
          />
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="电话" prop="jkkh">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="zycs">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="cascade1">
        <el-form-item label="户口地址" prop="ylfffs">
          <cascade-address
            :backfillObj="backfillObj"
            v-model="addressValue"
            :key="cascadeIndex"
            style="width:478px"
          />
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="邮编" prop="jkkh">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="工作单位及地址" prop="chargeName">
          <el-input placeholder="请输入" v-model="value" style="width: 478px"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="单位电话" prop="chargeRecordNumber">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="chargeTelephone">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" class="cascade2">
        <el-form-item label="联系人姓名" prop="ylfffs">
          <el-input placeholder="请输入" v-model="value"></el-input>
        </el-form-item>
        <el-form-item label="关系" prop="jkkh">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="zycs">
          <el-input v-model="value" placeholder="请输入" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="电话" prop="bah">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="入院途径">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="治疗类别">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="入院时间" prop="ylfffs">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入院科别" prop="jkkh">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病房" prop="zycs">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="转科级别" prop="bah">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="出院时间" prop="ylfffs">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出院科别" prop="jkkh">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病房" prop="zycs">
          <el-input v-model="value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="实际住院" prop="bah">
          <el-input v-model="value" placeholder="请输入">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="门(急)诊诊断(中医诊断)">
          <el-input v-model="value" placeholder="请输入" style="width:478px"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="疾病编码">
          <el-input placeholder="请输入" v-model="value"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="门(急)诊诊断(西医诊断)">
          <el-input v-model="value" placeholder="请输入" style="width:478px"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="疾病编码">
          <el-input placeholder="请输入" v-model="value"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="实施临床路径">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用医疗机构中药制剂">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
      </el-row>
      <el-row type="flex" style="border-bottom: 1px solid #f0f0f0;margin-bottom: 10px">
        <el-form-item label="使用中医诊疗设备">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用中医诊疗技术">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="辨证施护">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-row>

      <!-- 诊断 -->
      <div class="diagnose clearfix">
        <div class="diagnose-item">
          <div class="diagnose-head">
            <span class="item1"></span>
            <span class="item2">出院中医诊断</span>
            <span class="item3">疾病编码</span>
            <span class="item4">入院病情</span>
          </div>
          <div class="diagnose-body">
            <span class="item1">主病</span>
            <el-form-item label-width="0" class="item2">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="item3">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="item4">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <span class="item5"></span>
          </div>
          <div class="diagnose-body">
            <span class="item1">主证</span>
            <el-form-item label-width="0" class="item2">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="item3">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="item4">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <span class="item5">
              <i class="icon his-disabled"></i>删除
            </span>
          </div>
          <div class="diagnose-body" style="font-size: 14px; margin: 0 0 10px 78px">
            <i class="icon his-btn-add" style="margin-right: 5px"></i>
            <span style="color:#1485ff">新增诊断</span>
          </div>
        </div>

        <div class="diagnose-item">
          <div class="diagnose-head">
            <span class="item1"></span>
            <span class="item2">出院西医诊断</span>
            <span class="item3">疾病编码</span>
            <span class="item4">入院病情</span>
          </div>
          <div class="diagnose-body">
            <span class="item1">主要诊断</span>
            <el-form-item label-width="0" class="item2">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="item3">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="item4">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <span class="item5"></span>
          </div>
          <div class="diagnose-body">
            <span class="item1">其他诊断</span>
            <el-form-item label-width="0" class="item2">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="item3">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="item4">
              <el-input v-model="value" placeholder="请输入"></el-input>
            </el-form-item>
            <span class="item5">
              <i class="icon his-disabled"></i>删除
            </span>
          </div>
          <div class="diagnose-body" style="font-size: 14px; margin: 0 0 10px 78px">
            <i class="icon his-btn-add" style="margin-right: 5px"></i>
            <span style="color:#1485ff">新增诊断</span>
          </div>
        </div>
      </div>

      <!-- <div class="adDiagnose clearfix">
        <div class="adDiagnose-add" style="font-size: 14px;">
          <i class="icon his-btn-add" style="margin-right: 5px"></i>
          <span style="color:#1485ff">新增诊断</span>
        </div>
      </div> -->
      <el-row type="flex">
        <el-form-item label="损伤、中毒的外部原因">
          <el-select v-model="value" style="width: 758px">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="疾病编码">
          <el-input placeholder="请输入" v-model="value"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="病理诊断">
          <el-select v-model="value" style="width: 478px">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="疾病编码">
          <el-input placeholder="请输入" v-model="value"></el-input>
        </el-form-item>
        <el-form-item label="病理号">
          <el-input placeholder="请输入" v-model="value"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="药物过敏">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过敏药物">
          <el-input placeholder="请输入" v-model="value" style="width: 478px"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="死亡患者尸检">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="血型">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="RH">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="科主任">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主任(副主任)医师">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主治医师">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住院医师">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="责任护士">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进修医师">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实习医师">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码员">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="病案质量">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="质控医师">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="质控护士">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="质控日期">
          <el-select v-model="value">
            <el-option value="1" label="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
@Component({
  name: 'positiveZ',
  filters: {},
  components: {}
})
export default class extends Vue {
  private listSlotHeight: number = 0
  private addressValue: string = '' // 省市区id，字符串
  private cascadeIndex: number = 1
  private value: any = ''
  private patientPositiveData: any = {}
  private backfillObj: any = {
    // 初始化省市区
    provinceId: 310000,
    cityId: 310100,
    areaId: 0
  }

  created() {
    this.listSlotHeight = Vue.prototype.PageHeight
  }
  mounted() {}
}
</script>
<style scoped lang="scss">
.his-mrms-tag {
  font-size: 14px;
  color: #6a6d78;
  margin-left: 10px;
}

.content .his-small .retrieval .el-row .el-form-item ::v-deep .el-form-item__label {
  line-height: 14px;
}

::v-deep .el-input-group__append,
.el-input-group__prepend {
  border-left: 1px solid #d3d5e2 !important;
  border: none;
  padding: 0 10px;
}

.content .his-small .retrieval .el-row .el-form-item {
  width: calc(25% - 8px);
  margin-bottom: 16px;
}

.content .his-small .retrieval .cascade.el-row .el-form-item {
  width: calc(50% - 8px) !important;
}

.content .his-small .retrieval .cascade1.el-row .el-form-item {
  width: calc(25% - 8px) !important;
}

.content .his-small .retrieval .cascade2.el-row .el-form-item {
  width: calc(20% - 8px) !important;
}

.his-cascade::v-deep .el-select.el-select--medium:nth-of-type(3) {
  display: none;
}

// .content .his-small .retrieval .his-mrms-title.el-row div {
//   width: calc(20% - 8px) !important;
//   height: 37px;
// }
.content .his-small .retrieval .his-mrms-type.el-row .el-form-item {
  width: calc(10%-8px);
}

.diagnose {
  margin-bottom: 10px;
  .diagnose-item {
    width: 49.2%;
    border: 1px solid #f0f0f0;
    // height: 100px;
    float: left;
    margin-left: 10px;
    .diagnose-head {
      margin-bottom: 5px;
      span {
        display: inline-block;
        font-family: 'siyuanMedium';
        margin-right: 8px;
      }
      span:nth-of-type(1) {
        margin-right: 0;
      }
    }

    .diagnose-body {
      .el-form-item {
        display: inline-block;
        margin-right: 8px;
      }
    }

    .item1 {
      display: inline-block;
      width: 80px;
      padding-left: 8px;
    }
    .item2 {
      width: calc((100% - 160px) * 0.4);
    }
    .item3 {
      width: calc((100% - 160px) * 0.3);
    }
    .item4 {
      width: calc((100% - 160px) * 0.3);
    }
    .item5 {
      width: 60px;
    }
    // [class*='item'] {
    //   border: 1px solid #00f;
    // }
  }
  .diagnose-item:nth-child(1) {
    margin-left: 6px;
  }
}

.adDiagnose {
  margin: 10px 0;
  .adDiagnose-add {
    width: 50%;
    float: left;
    padding-left: 75px;
  }
}
</style>