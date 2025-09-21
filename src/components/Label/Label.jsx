import styles from './Label.module.css'

export default function Label({ children, Icon }) {
  return (
    <div className={styles.container}>
      {Icon && <span className={styles.iconContainer}><Icon className={styles.icon} /></span>}
      <span className={styles.label}>{children}</span>
    </div>
  )
}