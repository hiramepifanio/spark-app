import { Link, useLocation } from "react-router-dom"
import styles from './NavItem.module.css'

export default function NavItem({ children, Icon, to }) {
  const location = useLocation();

  return (
    <li className="nav-item">
      <Link to={to} className={`${styles.link} ${location.pathname === to ? styles.active : ''}`}>
        <span className={styles.iconContainer}><Icon className={styles.icon} /></span>
        <span>{children}</span>
      </Link>
    </li>
  )
}