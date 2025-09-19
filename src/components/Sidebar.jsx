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
        <NavItem active Icon={MdDashboard}>Dashboard</NavItem>
        <NavItem Icon={MdViewKanban}>Projects</NavItem>
        <NavItem Icon={IoIosPeople}>Meetings</NavItem>
        <NavItem Icon={FaGear}>Configurations</NavItem>
      </Nav>
    </aside>
  )
}