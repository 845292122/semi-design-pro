import Login from '~/pages/login'
import { Navigate, useRoutes } from 'react-router-dom'
import React from 'react'
import bizRoutes from './routes'

export type RouteMetaType = {
  title: string
  key: string
  icon?: React.ReactNode
  hidden?: boolean
  requireAuth?: boolean
  permission?: string
}

export type RouteType = {
  path?: string
  element?: React.ReactNode
  meta?: RouteMetaType
  children?: RouteType[]
}

export const routes: RouteType[] = [
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
