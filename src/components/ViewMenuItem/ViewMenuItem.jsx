import styles from './ViewMenuItem.module.css'

export default function ViewMenuItem({ children, isSelected, ...props }) {
  return (
    <button {...props} className={`${styles.container} ${isSelected ? styles.selected : styles.notSelected}`}>
      {children}
    </button>
  )
}