import styles from './TextInput.module.css'
import { MdError } from "react-icons/md"

export default function TextInput({ label, placeholder, id, type='text', error, minLength=3, maxLength=50, required=true }) {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <input 
          className={styles.input} 
          id={id} 
          type={type} 
          placeholder={placeholder} 
          name={id} 
          minLength={minLength}
          maxLength={maxLength}
          required={required}
        />
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