import Login from '~/pages/login'
import { Navigate, useRoutes } from 'react-router-dom'
import bizRoutes from './routes'

export type RouteMeta = {
  title: string
  key: string
  icon?: React.ReactNode
  hidden?: boolean
  requireAuth?: boolean
  permission?: string
}

export type RouteInfo = {
  path?: string
  element?: React.ReactNode
  meta?: RouteMeta
  children?: RouteInfo[]
}

export const routes: RouteInfo[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      key: 'login'
    }
  },
  ...bizRoutes,
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]

const Router = () => useRoutes(routes)

export default Router
