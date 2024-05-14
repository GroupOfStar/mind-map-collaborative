type IServiceLayout = 'logicalStructure'

interface IServiceConfig {
  id: string
  config?: any
  info?: any
  layout?: IServiceLayout
  theme: {
    config: string
    template: IThemeType
  }
  children: string[]
}

interface IServiceNode {
  id: string
  pid: string
  isActive: boolean
  expand: boolean
  text: string
  children: string[]

  borderColor?: string
  borderWidth?: number
}

type IUpdateListener = (nodes: IServiceNode[], config: IServiceConfig) => void
