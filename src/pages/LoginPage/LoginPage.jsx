import LoginForm from '../../components/LoginForm/LoginForm'
import LoginAndSignupPageLayout from '../../components/LoginAndSignupPageLayout/LoginAndSignupPageLayout'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  return (
    <LoginAndSignupPageLayout>
      <LoginForm />
    </LoginAndSignupPageLayout>
  )
}