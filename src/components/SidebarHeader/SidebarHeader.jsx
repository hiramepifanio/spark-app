import styles from './SidebarHeader.module.css'

export default function SidebarHeader({ children }) {
  return (
    <div className={styles.container}>
      <span className={styles.content}>{children}</span>
    </div>
  )
}