import { useContext } from 'react'
import styles from './NotificationQueue.module.css'
import { NotificationContext } from '../../contexts/NotificationContext'
import Notification from '../Notification/Notification'

export default function NotificationQueue() {
  const { notifications } = useContext(NotificationContext)

  return (
    <div className={styles.container}>
      {/* TODO: try to pass props=notification */}
      {notifications.map(notification => <Notification key={notification.id} type={notification.type} message={notification.message} />)}
    </div>
  )
}