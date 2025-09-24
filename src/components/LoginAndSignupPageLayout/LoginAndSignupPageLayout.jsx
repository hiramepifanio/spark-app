import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './LoginAndSignupPageLayout.module.css'

export default function LoginAndSignupPageLayout({ children }) {
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        {children}
      </div>
    </main>
  )
}