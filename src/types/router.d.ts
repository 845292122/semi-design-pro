declare namespace RouteType {
  type RouteMeta = {
    title: string
    key: string
    icon?: React.ReactNode
    hidden?: boolean
    requireAuth?: boolean
    permission?: string
  }

  type RouteInfo = {
    path?: string
    element?: React.ReactNode
    meta?: RouteMetaType
    children?: RouteType[]
  }
}
