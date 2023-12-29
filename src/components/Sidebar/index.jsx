import { Outlet } from 'react-router-dom'
import Logo from '../../components/Logo'
import AppFooter from '../AppFooter'
import AppNav from '../AppNav'
import styles from './Sidebar.module.css'
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <AppFooter />
    </div>
  )
}

export default Sidebar
