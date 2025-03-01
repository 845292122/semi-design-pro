import { RouteType } from '..'
import { IconTreeSelect } from '@douyinfe/semi-icons-lab'
import lazyLoad from '../helper/lazyLoad'
import React from 'react'
import { IconRadio } from '@douyinfe/semi-icons'
import Layout from '~/layout'

const TestRoutes: Array<RouteType> = [
  {
    element: <Layout />,
    meta: {
      key: 'test',
      title: '测试管理',
      icon: <IconTreeSelect />,
      requireAuth: true,
      permission: 'test'
    },
    children: [
      {
        path: '/system/test',
        element: lazyLoad(React.lazy(() => import('~/pages/system/test'))),
        meta: {
          key: 'system:test',
          title: 'test管理',
          icon: <IconRadio />,
          requireAuth: true,
          permission: 'system:test'
        }
      }
    ]
  }
]

export default TestRoutes
