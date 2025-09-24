import styles from './Input.module.css'
import { MdError } from "react-icons/md"

export default function Input({ label, id, error, ...props }) {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <input className={styles.input} id={id} {...props}/>
      </div>
      <p className={styles.error}>
        {error && (
          <>
            <MdError/>{' ' + error}
          </>
        )}
      </p>
    </div>
  )
}