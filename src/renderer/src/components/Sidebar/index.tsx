import { NavLink, useLocation } from 'react-router-dom'
import cl from 'classnames'
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/rootConfig'
import { sidebarHandler, toggleSidebar } from '../../store/reducers/selects'
import { logoutHandler } from '../../store/reducers/auth'
import { isMobile } from '../../utils/helpers'

const routes = [
  {
    name: 'dishes',
    url: '/dishes',
    icon: '/images/dish.png'
  },
  {
    name: 'products',
    url: '/products',
    icon: '/images/products.png',
    param: ''
  },
  {
    name: 'templates',
    url: '/templates',
    icon: '/images/templates.png',
    hasLine: true
  }
]

const Sidebar = () => {
  const { t } = useTranslation()
  const collapsed = useAppSelector(toggleSidebar)
  const dispatch = useAppDispatch()
  const handleOverlay = () => dispatch(sidebarHandler(!collapsed))
  const { pathname } = useLocation()

  const handleLogout = () => dispatch(logoutHandler())

  const closeSidebar = () => {
    if (isMobile) dispatch(sidebarHandler(false))
  }

  return (
    <>
      {collapsed && <div className={styles.overlay} onClick={handleOverlay} />}
      <div
        className={cl(styles.sidebar, 'sidebar', {
          [styles.collapsed]: collapsed
        })}
      >
        <div className="flex flex-col justify-between relative z-3">
          <div className={`${styles.link} ${styles.logo}`}>
            <img height={20} width={20} src={'/images/qrimage.png'} className={styles.routeIcon} />
            <h3 className={styles.subTitle}>{t('dating')}</h3>
          </div>
          <ul className="nav flex-col flex">
            {/* <li className={styles.navItem}>
              <NavLink
                className={cl(styles.link, {
                  [styles.active]: pathname === "/home",
                })}
                onClick={closeSidebar}
                to={"/home"}
              >
                <img
                  height={20}
                  width={20}
                  src={"/icons/controlPanel.svg"}
                  className={styles.routeIcon}
                />
                <div className={styles.content}>{t("control_panel")}</div>
              </NavLink>
            </li> */}
            {routes?.map((route) => (
              <li className={styles.navItem} key={route.url + route.name}>
                {route.hasLine && <div className={`${styles.logo} my-2`} />}
                <NavLink
                  className={cl(styles.link, {
                    [styles.active]: pathname.includes(route.url!)
                  })}
                  onClick={closeSidebar}
                  to={`${route.url}${route?.param ? route?.param : ''}`}
                  state={{ name: route.name }}
                >
                  <img height={20} width={20} src={route.icon || ''} className={styles.routeIcon} />
                  <div className={styles.content}>{t(route.name)}</div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <span onClick={handleLogout} className={styles.logout}>
          {t('leave')} (me?.username)
        </span>
      </div>
    </>
  )
}
export default Sidebar
