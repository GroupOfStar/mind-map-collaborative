const nodeStyleKeys = [
  'shape',
  'paddingX',
  'paddingY',
  'color',
  'fontFamily',
  'fontSize',
  'lineHeight',
  'textDecoration',
  'fontWeight',
  'fontStyle',
  'borderWidth',
  'borderColor',
  'fillColor',
  'lineColor',
  'lineDasharray',
  'lineWidth'
]
// 预置的8种协作者底框颜色
const userDivBgc = [
  '#4191FA',
  '#10C7C1',
  '#B878F0',
  '#7DCC29',
  '#58CBF5',
  '#B19CF7',
  '#F56CAC',
  '#F7C845'
]
const nodeDataKey = ['children', 'data', 'pid', 'id']
const dataKey = ['expand', 'isActive', 'text']
// 撤销、重做
const undoScene = ['redo', 'undo']

export const config = {
  confModel: 'conf',
  nodeModel: 'mind',
  nodeStyleKeys,
  userDivBgc,
  nodeDataKey,
  dataKey,
  undoScene
}
