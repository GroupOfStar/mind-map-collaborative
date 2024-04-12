interface SdkMsgType {
  device?: any
  mode?: string
  appId?: string
  userName?: string
  avatar?: string
  userId?: string
  token?: string
  realName?: null
  docId?: string
  traceId?: string
  docType?: string
  preventPointerUpdate?: boolean
  anchor?: string
  lang?: string
  wikiId?: string
  orgId?: string
  createUserId?: string
  docTitle?: string
  sideBar?: string
  shortShow?: boolean
  maxNodes?: number
  isSupportTemplate?: boolean
  securitySettings?: {
    displayWatermark?: boolean
    watermarkText?: string
    antiCopy?: boolean
    watermarkMode?: number
    watermarkStyle?: {
      maxShowWidth?: number
      radian?: number
      fontSize?: number | string
      color?: string
      alpha?: number
      spaceX?: number
      spaceY?: number
    }
  }
  collaConfig?: {
    scene?: {
      mode?: string
    }
    collabOptions?: {
      server?: string
      disable?: boolean
    }
    authentication?: {
      userId?: string
      appId?: string
      token?: string
      username?: string
      avatar?: string
      docId?: string
      docType?: string
      realName?: string
    }
  }
}
