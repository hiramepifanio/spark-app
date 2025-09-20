import styles from './NavSubmenu.module.css'

export default function NavSubmenu({ children, isOpen }) {
  return (
    <ul className={`${styles.submenu} ${isOpen ? styles.open : ''}`}>
      {children}
    </ul>
  )
}