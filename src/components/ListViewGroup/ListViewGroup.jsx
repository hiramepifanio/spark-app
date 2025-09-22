import ListViewHeader from '../ListViewHeader/ListViewHeader'
import ListViewTable from '../ListViewTable/ListViewTable'
import styles from './ListViewGroup.module.css'

export default function ListViewGroup({ children, data, columns }) {
  return (
    <>
      <ListViewHeader>{children}</ListViewHeader>
      <ListViewTable data={data} columns={columns} />
    </>
  )
}