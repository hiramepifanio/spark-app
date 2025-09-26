import Card from '../Card/Card'
import Icon from '../Icon/Icon'
import { IoIosClose } from "react-icons/io"
import styles from './Notification.module.css'
import { IoIosCloseCircle } from "react-icons/io"
import { FaCircleCheck } from "react-icons/fa6"

export default function Notification({ type, message }) {
  let notificationTypeClass = type === 'SUCCESS' ? styles.success : styles.error
  let NotificationTypeIcon = type === 'SUCCESS' ? <FaCircleCheck /> : <IoIosCloseCircle />

  return (
    <Card>
      <div className={styles.content}>
        {/* <div className={styles.closeIconContainer}>
          <Icon Content={IoIosClose}/>
        </div> */}
        <div className={`${styles.notificationTypeContainer} ${notificationTypeClass}`}>
          {NotificationTypeIcon}
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </Card>
  )
}