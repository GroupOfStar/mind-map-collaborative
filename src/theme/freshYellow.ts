import { Theme } from './Theme'

// 复古
export const freshYellow: ITheme = Theme.mergeTheme({
  // 连线的颜色
  lineColor: '#FFBC9E',
  // 连线风格
  lineStyle: 'curve',
  // 概要连线的颜色
  generalizationLineColor: '#026D77',
  // 背景颜色
  backgroundColor: '#F9F8ED',
  // 根节点样式
  root: {
    fillColor: '#026D77',
    // 连线的颜色
    lineColor: '#FFBC9E',
    // 连线的粗细
    lineWidth: 2,
    // 连线样式
    lineDasharray: 'none'
  },
  // 二级节点样式
  second: {
    // 连线的颜色
    lineColor: '#FFBC9E',
    fillColor: '#FFBC9E',
    marginY: 77,
    borderColor: '',
    borderWidth: 0
  },
  // 三级及以下节点样式
  node: {
    // 连线的颜色
    lineColor: '#FFBC9E',
    fillColor: '#FAECDD',
    color: '#661E01',
    borderColor: '',
    borderWidth: 0
  },
  // 概要节点样式
  generalization: {
    fillColor: '#026D77',
    borderColor: 'rgb(56, 123, 233)',
    color: '#fff',
    borderWidth: 0
  }
})
