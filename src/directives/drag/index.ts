/*
 * @Author: dongliang
 * @LastEditTime: 2021-08-13 10:29:24
 * @LastEditors: dl
 * @Description: 鼠标拖拽移动
 * @FilePath: \web-op\src\directives\drag\index.ts
 */
import { DirectiveOptions } from 'vue'
export const drag: DirectiveOptions = {
    inserted (el) {
        let x = 0
        let y = 0
        let l = 0
        let t = 0
        let startTime = 0
        let endTime = 0
        // 鼠标按下事件
        el.onmousedown = (e: any)=> {
            document.getElementById(el.id)?.setAttribute('data-flag','false')
            startTime = new Date().getTime();
            // 获取x坐标和y坐标
            x = e.clientX
            y = e.clientY

            // 获取左部和顶部的偏移量
            l = el.offsetLeft
            t = el.offsetTop

            // 自定义鼠标移动和鼠标抬起事件
            document.addEventListener('mousemove',mouseMove)
            document.addEventListener('mouseup', mouseUp)
        }
        
        // 鼠标移动事件
        const mouseMove = (e: any) => {
          let nx = e.clientX
          let ny = e.clientY
          // 计算移动后的左偏移量和顶部的偏移量
          let nl = nx - (x-l)
          let nt = ny - (y-t)
          el.style.left = nl + "px"
          el.style.top = nt + "px"
        }
        
        // 鼠标按下抬起事件
        const mouseUp = () => {
          endTime = new Date().getTime();
          if( (endTime - startTime) < 200){
            document.getElementById(el.id)?.setAttribute('data-flag','true')
          }
          // 释放事件，避免占用内存
          document.removeEventListener('mousemove', mouseMove)
          document.removeEventListener('mouseup', mouseUp)
        }
    }
}