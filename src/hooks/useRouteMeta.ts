import { useLocation } from 'react-router-dom'
import { RouteMetaType } from '~/router'
import { findRoute } from '~/router/helper/authRouter'
import bizRoutes from '~/router/routes'

export const useRouteMeta = (): RouteMetaType => {
  const { pathname } = useLocation()
  const route = findRoute(pathname, bizRoutes)
  const defaultMeta: RouteMetaType = {
    title: '',
    key: ''
  }
  return route?.meta || defaultMeta
}
