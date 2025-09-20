import styles from './Sidebar.module.css'
import { MdDashboard } from "react-icons/md"
import { MdViewKanban } from "react-icons/md"
import { IoIosPeople } from "react-icons/io"
import { FaGear } from "react-icons/fa6"
import NavItem from "../NavItem/NavItem"
import Nav from "../Nav/Nav"
import SidebarHeader from "../SidebarHeader/SidebarHeader"
import NavSubmenu from '../NavSubmenu/NavSubmenu'
import { useState } from 'react'

export default function Sidebar() {
  const [ isSubmenuOpen, setIsSubmenuOpen ] = useState(false)

  function handleProjectsNavItemClick() {
    setIsSubmenuOpen(currIsSubmenuOpen => !currIsSubmenuOpen)
  }

  return (
    <aside className={styles.sidebar}>
      <SidebarHeader>Spark</SidebarHeader>
      <Nav>
        <NavItem to='/dashboard' Icon={MdDashboard}>Dashboard</NavItem>
        <NavItem onClick={handleProjectsNavItemClick} to='/projects' Icon={MdViewKanban} submenu={
          <NavSubmenu isOpen={isSubmenuOpen}>
            <NavItem to='/projects/general' isSubitem>General</NavItem>
            <NavItem to='/projects/internal' isSubitem>Internal Projects</NavItem>
            <NavItem to='/projects/external' isSubitem>External Projects</NavItem>
            <NavItem to='/projects/startups' isSubitem>Startups</NavItem>
          </NavSubmenu>
        }>
          Projects
        </NavItem>
        <NavItem to='/meetings' Icon={IoIosPeople}>Meetings</NavItem>
        <NavItem to='/settings' Icon={FaGear}>Settings</NavItem>
      </Nav>
    </aside>
  )
}