import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import SearchBar from '../SearchBar/SearchBar'
import Avatar from '../Avatar/Avatar'
import styles from './Topbar.module.css'
import { FaBell } from "react-icons/fa6"

export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <Button >Ask AI</Button>
      </div>
      <div className={styles.center}>
        <SearchBar />
      </div>
      <div className={styles.right}>
        <Icon isClickable Content={FaBell} />
        <Avatar />
      </div>
    </header>
  )
}