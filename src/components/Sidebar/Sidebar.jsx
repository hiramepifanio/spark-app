import styles from './Sidebar.module.css'
import { MdDashboard } from "react-icons/md"
import { MdViewKanban } from "react-icons/md"
import { IoIosPeople } from "react-icons/io"
import { FaGear } from "react-icons/fa6"
import NavItem from "../NavItem/NavItem"
import Nav from "../Nav/Nav"
import SidebarHeader from "../SidebarHeader/SidebarHeader"
import NavSubmenu from '../NavSubmenu/NavSubmenu'
import { useContext, useState } from 'react'
import { RiLogoutBoxFill } from "react-icons/ri"
import { AuthContext } from '../../contexts/AuthContext'

export default function Sidebar() {
  const { authDispatch } = useContext(AuthContext)
  const [ isSubmenuOpen, setIsSubmenuOpen ] = useState(false)

  function handleProjectsNavItemClick() {
    setIsSubmenuOpen(currIsSubmenuOpen => !currIsSubmenuOpen)
  }

  function handleLogoutNavItemClick() {
    authDispatch({ type: 'LOGOUT' })
  }

  return (
    <aside className={styles.sidebar}>
      <SidebarHeader>Spark</SidebarHeader>
      <Nav>
        <NavItem to='/dashboard' Icon={MdDashboard}>Dashboard</NavItem>
        <NavItem onClick={handleProjectsNavItemClick} to='/projects' Icon={MdViewKanban} submenu={
          <NavSubmenu isOpen={isSubmenuOpen}>
            <NavItem to='/projects/general' isSubitem>Projetos Gerais</NavItem>
            <NavItem to='/projects/internal' isSubitem>Projetos Internos</NavItem>
            <NavItem to='/projects/external' isSubitem>Projetos Externos</NavItem>
            <NavItem to='/projects/startups' isSubitem>Startups</NavItem>
          </NavSubmenu>
        }>
          Projetos
        </NavItem>
        <NavItem to='/meetings' Icon={IoIosPeople}>Reuniões</NavItem>
        <NavItem to='/settings' Icon={FaGear}>Configurações</NavItem>
        <NavItem to='/login' onClick={handleLogoutNavItemClick} Icon={RiLogoutBoxFill}>Sair</NavItem>
      </Nav>
    </aside>
  )
}