export interface INodeImageProps {
  modelValue: boolean
}

export interface INodeImageEmits {
  (e: 'update:modelValue', val: boolean): void
}
