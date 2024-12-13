import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <h1>header</h1>
      <Outlet />
    </div>
  )
}

export default Layout
