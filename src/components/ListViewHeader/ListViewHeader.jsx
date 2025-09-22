import Icon from '../Icon/Icon'
import styles from './ListViewHeader.module.css'
import { FaAngleDown } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"

export default function ListViewHeader({ children, count }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button className={styles.toggle}><Icon Content={FaAngleDown} /></button>
        <span className={styles.title}>{children}</span>
        <div className={styles.count}>{count}</div>
      </div>
      <div className={styles.right}>
        <button className={styles.add}><Icon Content={FaPlus} /></button>
      </div>
    </div>
  )
}