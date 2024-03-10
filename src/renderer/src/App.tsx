import { lazy, useEffect } from 'react'
import i18n from './localization'
import { useAppDispatch, useAppSelector } from './store/rootConfig'
import { Route, Routes, useNavigate } from 'react-router-dom'
// import Suspend from 'components/Suspend'
import { langSelector } from './store/reducers/selects'
import Suspend from './components/Suspend'
import { getPrinters } from './store/reducers/settings'
import { PrinterInfo } from 'electron'

const Login = lazy(() => import('./user-pages/Login'))
const Dishes = lazy(() => import('./admin-pages/Dishes'))
const UserRoutes = lazy(() => import('./components/UserRoutes'))
const AdminRoutes = lazy(() => import('./components/AdminRoutes'))
const Items = lazy(() => import('./user-pages/Items'))
const PrintPreview = lazy(() => import('./user-pages/PrintPreview'))

const App = () => {
  const lang = useAppSelector(langSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   if (!token) navigate("/login");
  //   if (!!error) dispatch(logoutHandler());
  // }, [token, error]);

  useEffect(() => {
    navigate('/users/items')
  }, [])

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  useEffect(() => {
    const listener = window?.contextBridge?.on('get-printers', (printers: PrinterInfo[]) => {
      console.log(printers, 'printers')
      dispatch(getPrinters(printers))
    })

    window.contextBridge?.getPrinters()

    return listener
  }, [])

  return (
    <Routes>
      <Route
        element={
          <Suspend>
            <Login />
          </Suspend>
        }
        path={'/login'}
      />
      <Route
        element={
          <Suspend>
            <UserRoutes />
          </Suspend>
        }
        path={'/users'}
      >
        <Route
          path={'items'}
          element={
            <Suspend>
              <Items />
            </Suspend>
          }
        >
          <Route
            path={':id'}
            element={
              <Suspend>
                <Items />
              </Suspend>
            }
          />
        </Route>
        <Route
          path={'items/:id/:checkid'}
          element={
            <Suspend>
              <PrintPreview />
            </Suspend>
          }
        />
      </Route>

      <Route
        element={
          <Suspend>
            <AdminRoutes />
          </Suspend>
        }
        path={'/admin'}
      >
        <Route
          path={'dishes'}
          element={
            <Suspend>
              <Dishes />
            </Suspend>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
