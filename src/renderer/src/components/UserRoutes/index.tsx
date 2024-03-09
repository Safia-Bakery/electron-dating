import { Outlet } from 'react-router-dom'
import Header from '../AdminHeader'

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default UserRoutes
