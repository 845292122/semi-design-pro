import { Layout, Nav } from '@douyinfe/semi-ui'
import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { authJotai } from '~/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconToken } from '@douyinfe/semi-icons-lab'
import bizRoutes from '~/router/routes'
import { RouteInfo } from '~/router'

type NavItem = {
  itemKey: string
  text: string
  icon?: React.ReactNode
  items?: NavItem[]
}

export default function AppSider() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const permissions = useAtomValue(authJotai.permissionsAtom)
  const [defautlKeys, setDefaultKeys] = useState<string[]>([pathname])
  const [menuItems, setMenuItems] = useState<NavItem[]>([])

  const clickMenu = (data: {
    itemKey?: string | number
    domEvent?: MouseEvent
    isOpen?: boolean
    openKeys?: (string | number)[]
  }) => {
    const { itemKey = '/', openKeys } = data
    if (openKeys) {
      return
    } else {
      navigate(itemKey.toString())
    }
  }

  useEffect(() => {
    setDefaultKeys([pathname])
  }, [pathname])

  useEffect(() => {
    const filterAndConvertRoutesByPermissions = (
      routes: RouteInfo[],
      permissions: string[]
    ): NavItem[] => {
      return routes.flatMap(route => {
        if (route.children) {
          const filteredChildren = filterAndConvertRoutesByPermissions(route.children, permissions)
          if (filteredChildren.length > 0 && route.meta?.key) {
            return [
              {
                itemKey: route.path ?? route.meta?.key ?? '/',
                text: route.meta.title,
                icon: route.meta.icon,
                items: filteredChildren
              }
            ]
          }
          return filteredChildren
        }
        if (
          (!route.meta?.permission ||
            (route.meta.permission && permissions.includes(route.meta.permission))) &&
          !route.meta?.hidden
        ) {
          return [
            {
              itemKey: route.path ?? route.meta?.key ?? '/',
              text: route.meta!.title,
              icon: route.meta?.icon
            }
          ]
        }
        return []
      })
    }

    const menus = filterAndConvertRoutesByPermissions(bizRoutes, permissions)
    setMenuItems(menus)
  }, [permissions])

  return (
    <Layout.Sider>
      <Nav
        defaultSelectedKeys={defautlKeys}
        style={{ maxWidth: 220, height: '100%' }}
        onClick={clickMenu}
        items={menuItems}
        header={{
          logo: <IconToken style={{ fontSize: 26, marginTop: '12px' }} />,
          text: '后台管理系统',
          style: {
            height: '60px'
          }
        }}
        footer={{
          collapseButton: true
        }}
      />
    </Layout.Sider>
  )
}
