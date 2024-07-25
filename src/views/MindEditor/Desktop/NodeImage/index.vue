<template>
  <el-dialog
    :modelValue="modelValue"
    @update:modelValue="(val) => emits('update:modelValue', val)"
    title="Tips"
    width="500"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emits('update:modelValue', false)">取消</el-button>
        <el-button type="primary" @click="emits('update:modelValue', false)">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'NodeImage'
}
</script>
<script setup lang="ts">
import { ElDialog, ElButton } from 'element-plus'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/button/style/css'
import type { INodeImageProps, INodeImageEmits } from './interface'

defineProps<INodeImageProps>()

const emits = defineEmits<INodeImageEmits>()
</script>

<style scoped lang="scss"></style>
