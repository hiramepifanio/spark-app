import { Link, useLocation } from "react-router-dom"
import styles from './NavItem.module.css'

export default function NavItem({ children, Icon, to, isSubitem, onClick, submenu }) {
  const location = useLocation();

  return (
    <li className="nav-item">
      <Link onClick={onClick} to={submenu ? undefined : to} className={`${styles.link} ${location.pathname.startsWith(to) ? styles.active : ''} ${isSubitem ? styles.subitem : ''}`}>
        {Icon && <span className={styles.iconContainer}><Icon className={styles.icon} /></span>}
        <span>{children}</span>
      </Link>
      {submenu && submenu}
    </li>
  )
}