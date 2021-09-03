<template>
  <!-- <div id="screenfull">
    <i class="icon" :class="screenState == 0? 'his-out': 'his-full-screen'" @click="click"></i>
  </div> -->
  <el-tooltip :content="$t(isFullsc)" placement="bottom" effect="light">
    <div class="screen-full-wrap">
      <!-- <screenfull class="screen-full"></screenfull> -->
      <i class="icon" :class="screenState == 0? 'his-out': 'his-full-screen'" @click="click"></i>
    </div>
  </el-tooltip>
</template>

<script lang="ts">
import screenfull from 'screenfull'
import { Component, Vue, Inject } from 'vue-property-decorator'

const sf = screenfull

@Component({
  name: 'Screenfull'
})
export default class extends Vue {
  private isFullscreen = false
  private screenState = localStorage.getItem('state') // 0全屏状态
  private isFullsc:string = localStorage.getItem('state')=='0'?'common.cancelFullScreen' : 'common.fullScreen'
  @Inject('reload')
  reload!: any
  mounted() {
    if (sf.isEnabled) {
      sf.on('change', this.change)
      // debugger
      if (localStorage.getItem('state') == '0') {
        // sf.request() // 进入全屏
      } else if (localStorage.getItem('state') == '2') {
        localStorage.setItem('state', '0')
        sf.request() // 进入全屏
        setTimeout(() => {
          this.reload()
        }, 500)
      }
    }
    
    let that = this;
    document.addEventListener("fullscreenchange", () => {
      if(localStorage.getItem('state')=='0'){
        that.screenState = '1'
        that.isFullsc = 'common.fullScreen'
      }
    });
  }

  beforeDestory() {
    if (sf.isEnabled) {
      sf.off('change', this.change)
    }
  }
  // 全屏状态切换时触发
  private change() {
    if (sf.isEnabled) {
      this.isFullscreen = sf.isFullscreen
    }
  }

  private click() {
    if (!sf.isEnabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning'
      })
      return false
    }
    sf.toggle() // 可能异步
    console.log(sf.isFullscreen)
    setTimeout(() => {
      console.log(sf.isFullscreen)
      this.reload()
    }, 100)
    localStorage.setItem('state', sf.isFullscreen ? '1' : '0')
  }
}
</script>
