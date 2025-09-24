import styles from './Button.module.css'

export default function Button({ children, isFilled, onClick }) {
  return (
    <button 
      className={`${styles.button} ${isFilled ? styles.filled : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}