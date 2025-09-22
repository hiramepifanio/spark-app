import ListViewGroupHeader from '../ListViewGroupHeader/ListViewGroupHeader'
import styles from './ListViewGroup.module.css'

export default function ListViewGroup({ children, rows }) {
  return (
    <>
      <ListViewGroupHeader>{children}</ListViewGroupHeader>
    </>
  )
}