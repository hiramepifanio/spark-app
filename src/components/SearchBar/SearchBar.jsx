import styles from './SearchBar.module.css'
import { IoSearch } from "react-icons/io5"
import Icon from '../Icon/Icon'

export default function SearchBar({ placeholder='Buscar...' }) {
  return (
    <div  className={styles.searchBarContainer}>
      <div className={styles.iconContainer}>
        <Icon Content={IoSearch}/>
      </div>
      <input type="text" className={styles.searchBar} placeholder={placeholder} />
    </div>
  )
}