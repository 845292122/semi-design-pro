import Layout from '~/layout'
import Home from '~/pages/home'
import { RouteType } from '..'

const baseRoutes: Array<RouteType> = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        meta: {
          title: '首页',
          key: 'home',
          requireAuth: true,
          permission: 'admin'
        }
      }
    ]
  }
]

export default baseRoutes
