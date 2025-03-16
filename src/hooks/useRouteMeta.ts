import { useLocation } from 'react-router-dom'
import { RouteMeta } from '~/router'
import { findRoute } from '~/router/helper/authRouter'
import bizRoutes from '~/router/routes'

export const useRouteMeta = (): RouteMeta => {
  const { pathname } = useLocation()
  const route = findRoute(pathname, bizRoutes)
  const defaultMeta: RouteMeta = {
    title: '',
    key: ''
  }
  return route?.meta || defaultMeta
}
