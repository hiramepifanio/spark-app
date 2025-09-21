import styles from './SearchBar.module.css'

export default function SearchBar() {
  return (
    <input type="text" className={styles.searchBar} placeholder="Search..." />
  )
}