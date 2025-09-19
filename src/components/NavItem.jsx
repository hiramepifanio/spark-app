import { Link } from "react-router-dom"

export default function NavItem({ children, Icon, active, to }) {
  return (
    <li className="nav-item">
      <Link to={to} className={active ? 'active' : ''}>
        <span className="nav-icon-container"><Icon className="nav-icon" /></span>
        <span>{children}</span>
      </Link>
    </li>
  )
}