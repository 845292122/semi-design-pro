import { RouteInfo } from '~/router'

type ExtractedRoute = {
  title?: string
  permission?: string
  children?: ExtractedRoute[]
}

export function extractTitlesAndPermissions(routes: RouteInfo[]): ExtractedRoute[] {
  return routes.flatMap(route => {
    const children = route.children ? extractTitlesAndPermissions(route.children) : []

    const title = route.meta?.title
    const permission = route.meta?.permission

    // 核心修改：仅当 permission 存在时才保留当前层级
    if (!permission) {
      return children // 穿透子路由
    }

    const extracted: ExtractedRoute = {
      ...(title && { title }), // 可选保留 title
      permission // 强制保留 permission
    }

    if (children.length > 0) {
      extracted.children = children
    }

    return [extracted]
  })
}

export function convertToTreeData(routes: ExtractedRoute[]) {
  return routes.map(route => {
    const node: any = {
      label: route.title || route.permission!, // 使用 title 作为 label，如果 title 不存在则回退到 permission
      value: route.permission!,
      key: route.permission!
    }

    if (route.children?.length) {
      node.children = convertToTreeData(route.children)
    }

    return node
  })
}
