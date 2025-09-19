export default function NavItem({ children, Icon, active }) {
  return (
    <li className="nav-item">
      <a className={active ? 'active' : ''}>
        <span className="nav-icon-container"><Icon className="nav-icon" /></span>
        <span>{children}</span>
      </a>
    </li>
  )
}