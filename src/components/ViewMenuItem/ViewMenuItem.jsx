import styles from './ViewMenuItem.module.css'

export default function ViewMenuItem({ children, isSelected }) {
  return (
    <div className={`${styles.container} ${isSelected ? styles.selected : ''}`}>
      {children}
    </div>
  )
}