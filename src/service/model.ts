import {
  AggregationModel,
  MArray,
  MBoolean,
  MMap,
  MNumber,
  MString
} from '@cloud/collaborative-client'
import type { MObject } from '@cloud/collaborative-client'
export const nodeDataObject = {
  text: MString,
  expand: MBoolean,
  _start: MBoolean,
  isActive: MBoolean,
  icon: MArray,
  image: MString,
  imageTitle: MString,
  imageDirection: MString,
  imageSize: MMap({
    width: MNumber,
    height: MNumber,
    custom: MBoolean
  }),
  tag: MArray,
  fontFamily: MString,
  fontSize: MNumber,
  lineHeight: MNumber,
  color: MString,
  id: MString,
  fontWeight: MString,
  fontStyle: MString,
  textDecoration: MString,
  lineColor: MString,
  lineDasharray: MString,
  lineWidth: MNumber,
  paddingX: MNumber,
  paddingY: MNumber,
  fillColor: MString,
  shape: MString,
  borderColor: MString,
  borderWidth: MNumber,
  customTextWidth: MNumber
}

export const defaultNodeModel: MObject = MMap({
  pid: MString,
  children: MArray,
  commentInfo: MMap({
    num: MNumber,
    active: MBoolean
  }),
  hyperlink: MString,
  hyperlinkTitle: MString,
  note: MString,
  ...nodeDataObject,
  generalization: MString,
  updateNow: MBoolean
})

export const defaultConfModel: MObject = MMap({
  config: MMap({}),
  _start: MBoolean,
  id: MString,
  info: MMap({
    isZenMode: MBoolean,
    time: MNumber
  }),
  layout: MString,
  theme: MMap({
    template: MString,
    config: MString
  }),
  children: MArray,
  fileTitle: MString,
  photo: MString,
  version: MNumber
})

export const MindAggregationModel: MObject = AggregationModel(
  MMap({
    config: MMap({}),
    info: MMap({
      isZenMode: MBoolean,
      time: MNumber
    }),
    layout: MString,
    theme: MMap({
      template: MString,
      config: MString
    }),
    children: MArray,
    fileTitle: MString,
    photo: MString,
    version: MNumber,

    pid: MString,
    commentInfo: MMap({
      num: MNumber,
      active: MBoolean
    }),
    hyperlink: MString,
    hyperlinkTitle: MString,
    note: MString,
    ...nodeDataObject,
    generalization: MString,
    updateNow: MBoolean,
    associativeLines: MMap({
      '*': MMap({
        id: MString,
        from: MString,
        to: MString,
        startAngle: MNumber,
        endAngle: MNumber,
        startControlOffset: MString,
        endControlOffset: MString,
        text: MString,
        style: MString
      })
    }),
    '*': MString
  })
)
