import styles from './LoginAndSignupFormFooter.module.css'
import { Link } from 'react-router-dom'

export default function LoginAndSignupFormFooter({ text, callToAction, redirectPath }) {
  return (
    <p className={styles.footer}>{text} <Link to={redirectPath} className={styles.link}>{callToAction}</Link></p>
  )
}