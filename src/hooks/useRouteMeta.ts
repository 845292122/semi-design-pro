import { useLocation } from 'react-router-dom'
import { findRoute } from '~/router/helper/authRouter'
import bizRoutes from '~/router/routes'

export const useRouteMeta = (): RouteType.RouteMeta => {
  const { pathname } = useLocation()
  const route = findRoute(pathname, bizRoutes)
  const defaultMeta: RouteType.RouteMeta = {
    title: '',
    key: ''
  }
  return route?.meta || defaultMeta
}
