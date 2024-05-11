interface NodeTag {
  color: string
  text: string
}
// type ILayoutType = 'logicalStructure'

// interface IMindConfig {
//   id: string
//   config?: any
//   info?: any
//   layout?: ILayoutType
//   theme?: any
//   children: INodeData[]
// }

interface INodeData {
  id: string
  pid: string
  isActive?: boolean
  inserting?: boolean
  data: CoreData
  children: INodeData[]
}

interface CoreData {
  richText?: any
  note?: any
  expand?: boolean
  isActive?: boolean
  text?: string
  generalization?: CoreData
  icon?: string[]
  image?: string
  imageTitle?: string
  imageDirection?: string
  imageSize?: {
    width: number
    height: number
    custom: boolean
  }
  tag?: NodeTag[]
  fontFamily?: string
  fontSize?: number
  lineHeight?: number
  color?: string
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
  lineColor?: string
  lineDasharray?: string
  lineWidth?: number
  paddingX?: number
  paddingY?: number
  fillColor?: string
  shape?: string
  borderColor?: string
  borderWidth?: number
  hyperlink?: string
  commentInfo?: {
    num?: number
    active?: boolean
  }
  customTextWidth?: number
}

/** 矩形、菱形、平行四边形、圆角矩形、八角矩形、外三角矩形、内三角矩形、椭圆、圆 */
type IShapeType =
  | 'rectangle'
  | 'diamond'
  | 'parallelogram'
  | 'roundedRectangle'
  | 'octagonalRectangle'
  | 'outerTriangularRectangle'
  | 'innerTriangularRectangle'
  | 'ellipse'
  | 'circle'
