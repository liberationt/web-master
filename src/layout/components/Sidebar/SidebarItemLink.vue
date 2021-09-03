<template>
  <a
    v-if="isExternal(to)"
    :href="to"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <div v-else>
    <slot />
  </div>
  <!-- <router-link
    v-else
    :to="toUrl"
  >
    <slot />
  </router-link> -->
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { isExternal } from '@/utils/validate'
import { routerGo } from '@/utils/utils' // 引入跨应用路由跳转

@Component({
  name: 'SidebarItemLink'
})
export default class extends Vue {
  @Prop({ required: true }) private to!: string

  @Prop({ required: true }) private name!: string

  private isExternal = isExternal
  private toUrl = {}

  @Watch('name', { immediate: true })
  private onNameChange(name: string) {
    //  console.log("--------++++++:",name)
    //  console.log("--------******:",this.to)
     if(isExternal(name)){
       this.toUrl={ path:this.to, query:{
        hospitalId:2,
        deptId1:'',
        deptId2:'',
        bq:'',
        doctorNo:'',
        pharmacyId:''
        } }
     }else{
       this.toUrl= this.to
     }
     
  }
  private goto(item: any){
    // debugger 
    routerGo('/op/registerManage1','')
  }

}
</script>
