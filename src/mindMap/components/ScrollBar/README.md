# 滚动条组件

## API

### ScrollBar

使用`ScrollBar`组件需要...。

| 参数名  | 说明            | 必填 | 类型                | 默认值 |
| ------- | --------------- | ---- | ------------------- | ------ |
| width   | 滚动条轨道宽度  | 是   | number              | -      |
| height  | 滚动条轨道高度  | 是   | number              | -      |
| scrollX | x滚动条图形位置 | 是   | [IScroll](#IScroll) | -      |
| scrollY | y滚动条图形位置 | 是   | [IScroll](#IScroll) | -      |

### IScroll

`IScroll` 滚动条信息接口

| 参数名      | 说明         | 必填 | 类型                     | 默认值 |
| ----------- | ------------ | ---- | ------------------------ | ------ |
| offset      | 偏移量       | 是   | ComputedRef<number>      | -      |
| size        | 滚动条大小   | 是   | ComputedRef<number>      | -      |
| onMousedown | 鼠标按下事件 | 是   | (ev: MouseEvent) => void | -      |
| onMousemove | 鼠标移动事件 | 是   | (ev: MouseEvent) => void | -      |
| onMouseup   | 鼠标松开事件 | 是   | (ev: MouseEvent) => void | -      |