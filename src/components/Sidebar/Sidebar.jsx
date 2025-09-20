import styles from './Sidebar.module.css'
import { MdDashboard } from "react-icons/md"
import { MdViewKanban } from "react-icons/md"
import { IoIosPeople } from "react-icons/io"
import { FaGear } from "react-icons/fa6"
import NavItem from "../NavItem/NavItem"
import Nav from "../Nav/Nav"
import SidebarHeader from "../SidebarHeader/SidebarHeader"

export default function Sidebar() {

  return (
    <aside className={styles.sidebar}>
      <SidebarHeader>Spark</SidebarHeader>
      <Nav>
        <NavItem to='/' Icon={MdDashboard}>Dashboard</NavItem>
        <NavItem to='/projects' Icon={MdViewKanban}>Projects</NavItem>
        <NavItem to='/meetings' Icon={IoIosPeople}>Meetings</NavItem>
        <NavItem to='/settings' Icon={FaGear}>Settings</NavItem>
      </Nav>
    </aside>
  )
}