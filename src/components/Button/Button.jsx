import styles from './Button.module.css'

export default function Button({ children, isFilled }) {
  return (
    <button className={`${styles.button} ${isFilled ? styles.filled : ''}`}>{children}</button>
  )
}