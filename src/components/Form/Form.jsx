import styles from './Form.module.css'
import Card from '../Card/Card'

export default function Form({ children, title, subtitle, onSubmit }) {
  return (
    <Card>
      {title && <h3 className={styles.title}>{title}</h3>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <form className={styles.form} onSubmit={onSubmit}>
        {children}
      </form>
    </Card>
  )
}