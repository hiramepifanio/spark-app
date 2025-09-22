import ListViewHeader from '../ListViewHeader/ListViewHeader'
import styles from './ListViewGroup.module.css'

export default function ListViewGroup({ children, rows }) {
  return (
    <>
      <ListViewHeader>{children}</ListViewHeader>
    </>
  )
}