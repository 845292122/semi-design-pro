import { Layout, Nav } from '@douyinfe/semi-ui'
import { IconSemiLogo } from '@douyinfe/semi-icons'
import { bizRoutes, RouteType } from '~/router'
import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { permissionsAtom } from '~/store'
import { useLocation, useNavigate } from 'react-router-dom'

type NavItem = {
  itemKey: string | undefined
  text: string
  icon?: React.ReactNode
  items?: NavItem[]
}

export default function AppSider() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const permissions = useAtomValue(permissionsAtom)
  const [defautlKeys, setDefaultKeys] = useState<string[]>([pathname])
  const [menuItems, setMenuItems] = useState<NavItem[]>([])
  const [openKeys, setOpenKeys] = useState<(string | number)[]>([])

  const clickMenu = ({ itemKey }: { itemKey?: string | number; domEvent?: MouseEvent; isOpen?: boolean }) => {
    if (itemKey) {
      navigate(itemKey.toString())
    }
  }

  const menuChange = (data: {
    itemKey?: string | number
    openKeys?: (string | number)[]
    domEvent?: MouseEvent
    isOpen?: boolean
  }): void | undefined => {
    const { itemKey, isOpen } = data
    if (isOpen) {
      setOpenKeys([itemKey!])
    } else {
      setOpenKeys([])
    }
  }

  useEffect(() => {
    setDefaultKeys([pathname])
  }, [pathname])

  useEffect(() => {
    const filterAndConvertRoutesByPermissions = (routes: RouteType[], permissions: string[]): NavItem[] => {
      return routes.flatMap(route => {
        if (route.children) {
          const filteredChildren = filterAndConvertRoutesByPermissions(route.children, permissions)
          if (filteredChildren.length > 0 && route.meta?.key) {
            return [
              {
                itemKey: route.path,
                text: route.meta.title,
                icon: route.meta.icon,
                items: filteredChildren
              }
            ]
          }
          return filteredChildren
        }
        if (
          (!route.meta?.permission || (route.meta.permission && permissions.includes(route.meta.permission))) &&
          !route.meta?.hidden
        ) {
          return [
            {
              itemKey: route.path,
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
        openKeys={openKeys}
        onOpenChange={menuChange}
        onClick={clickMenu}
        items={menuItems}
        header={{
          logo: <IconSemiLogo style={{ fontSize: 36 }} />,
          text: 'Semi Design'
        }}
        footer={{
          collapseButton: true
        }}
      />
    </Layout.Sider>
  )
}
