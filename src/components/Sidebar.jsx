import { MdDashboard } from "react-icons/md"
import { MdViewKanban } from "react-icons/md"
import { IoIosPeople } from "react-icons/io"
import { FaGear } from "react-icons/fa6"
import NavItem from "./NavItem"
import Nav from "./Nav"

export default function Sidebar() {
  return (
    <aside id="sidebar">
      <div className="sidebar-header">
        <h1>SPARK</h1>
      </div>
      <Nav>
        <NavItem to='/' active Icon={MdDashboard}>Dashboard</NavItem>
        <NavItem to='/projects' Icon={MdViewKanban}>Projects</NavItem>
        <NavItem to='/meetings' Icon={IoIosPeople}>Meetings</NavItem>
        <NavItem to='/settings' Icon={FaGear}>Settings</NavItem>
      </Nav>
    </aside>
  )
}