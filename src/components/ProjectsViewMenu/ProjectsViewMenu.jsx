import ViewMenuItem from '../ViewMenuItem/ViewMenuItem'
import Label from '../Label/Label'
import SearchBar from '../SearchBar/SearchBar'
import Button from '../Button/Button'
import styles from './ProjectsViewMenu.module.css'
import { MdViewKanban } from "react-icons/md"
import { MdViewTimeline } from "react-icons/md"
import { FaListAlt } from "react-icons/fa"
import { FaFilter } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa6"
import { useState } from 'react'

const views = [
  {
    label: 'List',
    icon: FaListAlt
  },
  {
    label: 'Kanban',
    icon: MdViewKanban
  },
  {
    label: 'Timeline',
    icon: MdViewTimeline
  },
]

export default function ProjectsViewMenu() {
  const [ selectedView, setSelectedView ] = useState('List');

  function onClickViewMenuItem(label) {
    setSelectedView(label);
  }

  return (
    <menu className={styles.menu}>
      <div className={styles.viewsContainer}>
        {views.map(view => (
          <ViewMenuItem onClick={() => onClickViewMenuItem(view.label)} isSelected={selectedView === view.label}>
            <Label Icon={view.icon}>{view.label}</Label>
          </ViewMenuItem>
        ))}
      </div>
      <div className={styles.actionsContainer}>
        <SearchBar />
        <Button><Label Icon={FaFilter}>Filter</Label></Button>
        <Button isFilled><Label Icon={FaPlus}>New Project</Label></Button>
      </div>
    </menu>
  )
}