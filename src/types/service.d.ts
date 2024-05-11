type IServiceLayout = 'logicalStructure'

interface IServiceConfig {
  id: string
  config?: any
  info?: any
  layout?: IServiceLayout
  theme?: any
  children: string[]
}

interface IServiceNode {
  id: string
  pid: string
  isActive: boolean
  expand: boolean
  text: string
  children: string[]
}

type IUpdateListener = (nodes: IServiceNode[], config: IServiceConfig) => void
