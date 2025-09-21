import styles from './Icon.module.css'

export default function Icon({ Content, isClickable }) {
  return (
    <span className={`${styles.container} ${isClickable ? styles.clickable : ''}`}><Content className={styles.icon} /></span>
  )
}