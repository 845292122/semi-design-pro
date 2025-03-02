import Login from '~/pages/login'
import { Navigate, useRoutes } from 'react-router-dom'
import bizRoutes from './routes'

export const routes: RouteType.RouteInfo[] = [
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
