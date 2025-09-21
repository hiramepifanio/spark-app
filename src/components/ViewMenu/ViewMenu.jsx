import ViewMenuItem from '../ViewMenuItem/ViewMenuItem'
import Label from '../Label/Label'
import SearchBar from '../SearchBar/SearchBar'
import Button from '../Button/Button'
import styles from './ViewMenu.module.css'
import { MdViewKanban } from "react-icons/md"
import { MdViewTimeline } from "react-icons/md"
import { FaListAlt } from "react-icons/fa"
import { FaFilter } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa6"

export default function ViewMenu() {
  return (
    <menu className={styles.menu}>
      <div className={styles.viewsContainer}>
        <ViewMenuItem>
          <Label Icon={MdViewKanban}>Kanban</Label>
        </ViewMenuItem>
        <ViewMenuItem isSelected>
          <Label Icon={MdViewTimeline}>Timeline</Label>
        </ViewMenuItem>
        <ViewMenuItem>
          <Label Icon={FaListAlt}>List</Label>
        </ViewMenuItem>
      </div>
      <div className={styles.actionsContainer}>
        <SearchBar />
        <Button><Label Icon={FaFilter}>Filter</Label></Button>
        <Button><Label Icon={FaPlus}>New Project</Label></Button>
      </div>
    </menu>
  )
}