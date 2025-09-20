import { Link, useLocation } from "react-router-dom"

export default function NavItem({ children, Icon, active, to }) {
  const location = useLocation();

  return (
    <li className="nav-item">
      <Link to={to} className={location.pathname === to ? 'active' : ''}>
        <span className="nav-icon-container"><Icon className="nav-icon" /></span>
        <span>{children}</span>
      </Link>
    </li>
  )
}