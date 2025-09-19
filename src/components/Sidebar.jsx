import { MdDashboard } from "react-icons/md"
import { MdViewKanban } from "react-icons/md"
import { IoIosPeople } from "react-icons/io"
import { FaGear } from "react-icons/fa6"
import NavItem from "./NavItem"
import Nav from "./Nav"
import SidebarHeader from "./SidebarHeader"

export default function Sidebar() {
  return (
    <aside id="sidebar">
      <SidebarHeader>Spark</SidebarHeader>
      <Nav>
        <NavItem to='/' active Icon={MdDashboard}>Dashboard</NavItem>
        <NavItem to='/projects' Icon={MdViewKanban}>Projects</NavItem>
        <NavItem to='/meetings' Icon={IoIosPeople}>Meetings</NavItem>
        <NavItem to='/settings' Icon={FaGear}>Settings</NavItem>
      </Nav>
    </aside>
  )
}