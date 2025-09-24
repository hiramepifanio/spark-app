import styles from './Layout.module.css'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Main from '../Main/Main'
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <Topbar />
      <Main>
        <Outlet />
      </Main>
    </div>
  )
}