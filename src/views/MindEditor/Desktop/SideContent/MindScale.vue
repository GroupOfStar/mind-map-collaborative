<template>
  <el-select v-model="scaleValue" placeholder="Select" style="width: 80px" @change="onScaleChange">
    <el-option
      v-for="item in ScaleSelectOptions"
      :key="item.title"
      :label="item.title"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script lang="ts">
export default {
  name: 'MindScale'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

/** 缩放比例下拉项枚举 */
const ScaleSelectOptions: Array<IStatusEnum<number>> = [
  { title: '10%', value: 0.1 },
  { title: '25%', value: 0.25 },
  { title: '50%', value: 0.5 },
  { title: '75%', value: 0.75 },
  { title: '100%', value: 1 },
  { title: '125%', value: 1.25 },
  { title: '150%', value: 1.5 },
  { title: '200%', value: 2 },
  { title: '250%', value: 2.5 },
  { title: '300%', value: 3 },
  { title: '400%', value: 4 }
]

/** 画布缩放比例 */
const scaleValue = ref<number>(1)

/** 选择画布比例 */
function onScaleChange(val: number) {
  console.log('onScaleChange , val', val)
}
</script>

<style scoped lang="scss"></style>
