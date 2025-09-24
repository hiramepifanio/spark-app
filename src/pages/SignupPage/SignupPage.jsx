import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './SignupPage.module.css'

export default function SignupPage() {
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <SignupForm />
      </div>
    </main>
  )
}