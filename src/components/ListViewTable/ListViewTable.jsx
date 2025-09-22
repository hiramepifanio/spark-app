import styles from './ListViewTable.module.css'
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"

export default function ListViewTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className={styles.table}>
      <div className={styles.tableHead}>
        {table.getHeaderGroups().map(headerGroup => (
          <div key={headerGroup.id} className={`${styles.tableRow} ${styles.tableHeadRow}`}>
            {headerGroup.headers.map(header => (
              <div key={header.id} className={`${styles.tableItem} ${styles.tableHeadItem}`} style={{flex: `${header.column.columnDef.size} 1 0`}}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.tableBody}>
        {table.getRowModel().rows.map(row => (
          <div key={row.id} className={`${styles.tableRow} ${styles.tableBodyRow}`}>
            {row.getVisibleCells().map(cell => (
              <div key={cell.id} className={`${styles.tableItem} ${styles.tableBodyItem}`} style={{flex: `${cell.column.columnDef.size} 1 0`}}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}