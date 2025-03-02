import Home from '~/pages/home'
import { IconBanner, IconTreeSelect } from '@douyinfe/semi-icons-lab'
import AppLayout from '~/layout'
import React from 'react'
import lazyLoad from './helper/lazyLoad'
import { IconRadio } from '@douyinfe/semi-icons'

const bizRoutes: RouteType.RouteInfo[] = [
  // * 基础路由
  {
    element: <AppLayout />,
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
    element: <AppLayout />,
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
  },

  // * 系统管理
  {
    element: <AppLayout />,
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
          icon: <IconRadio />,
          requireAuth: true,
          permission: 'system:user'
        }
      },
      {
        path: '/system/tenant',
        element: lazyLoad(React.lazy(() => import('~/pages/system/tenant'))),
        meta: {
          key: 'system:tenant',
          title: '租户管理',
          icon: <IconRadio />,
          requireAuth: true,
          permission: 'system:tenant'
        }
      }
    ]
  },

  // * 测试路由
  {
    element: <AppLayout />,
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
  },

  // * 异常路由
  {
    element: <AppLayout />,
    children: [
      {
        path: '/403',
        element: lazyLoad(React.lazy(() => import('~/pages/error/403'))),
        meta: {
          title: '未授权',
          key: '403',
          hidden: true,
          requireAuth: true
        }
      },
      {
        path: '/404',
        element: lazyLoad(React.lazy(() => import('~/pages/error/404'))),
        meta: {
          title: '页面飞走了~',
          hidden: true,
          key: '404'
        }
      }
    ]
  }
]

export default bizRoutes
