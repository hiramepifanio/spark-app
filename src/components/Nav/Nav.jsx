import styles from './Nav.module.css'

export default function Nav({ children }) {
  return (
    <ul className={styles.nav}>
      {children}
    </ul>
  )
}