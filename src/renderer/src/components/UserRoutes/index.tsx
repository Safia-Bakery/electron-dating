import { Outlet } from 'react-router-dom'
import Header from '../Header'

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default UserRoutes
