import Layout from '~/layout'
import Home from '~/pages/home'
import { RouteType } from '..'
import lazyLoad from '../helper/lazyLoad'
import React from 'react'
import { IconBanner } from '@douyinfe/semi-icons-lab'

const BaseRoutes: Array<RouteType> = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        meta: {
          title: '首页',
          key: 'home',
          icon: <IconBanner />,
          requireAuth: true,
          permission: 'admin'
        }
      }
    ]
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/profile',
        element: lazyLoad(React.lazy(() => import('~/pages/profile'))),
        meta: {
          title: '个人信息',
          key: 'profile',
          hidden: true,
          requireAuth: true
        }
      }
    ]
  }
]

export default BaseRoutes
