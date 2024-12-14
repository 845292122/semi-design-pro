import Layout from '~/layout'
import { RouteType } from '..'
import lazyLoad from '../helper/lazyLoad'
import React from 'react'
import { IconTreeSelect } from '@douyinfe/semi-icons-lab'

const SystemRoutes: Array<RouteType> = [
  {
    element: <Layout />,
    meta: {
      key: 'system',
      title: '系统管理',
      icon: <IconTreeSelect />,
      requireAuth: true,
      permission: 'system'
    },
    children: [
      {
        path: '/system/user',
        element: lazyLoad(React.lazy(() => import('~/pages/system/user'))),
        meta: {
          key: 'system:user',
          title: '用户管理',
          requireAuth: true,
          permission: 'system:user'
        }
      },
      {
        path: '/system/role',
        element: lazyLoad(React.lazy(() => import('~/pages/system/role'))),
        meta: {
          key: 'system:role',
          title: '角色管理',
          requireAuth: true,
          permission: 'system:role'
        }
      },
      {
        path: '/system/tenant',
        element: lazyLoad(React.lazy(() => import('~/pages/system/tenant'))),
        meta: {
          key: 'system:tenant',
          title: '租户管理',
          requireAuth: true,
          permission: 'system:tenant'
        }
      }
    ]
  }
]

export default SystemRoutes
