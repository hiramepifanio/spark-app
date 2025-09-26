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
import { MdModeEdit } from "react-icons/md"
import { useState } from 'react'

const views = [
  {
    label: 'Lista',
    icon: FaListAlt
  },
  {
    label: 'Kanban',
    icon: MdViewKanban
  },
  {
    label: 'Linha do Tempo',
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
          <ViewMenuItem key={view.label} onClick={() => onClickViewMenuItem(view.label)} isSelected={selectedView === view.label}>
            <Label Icon={view.icon}>{view.label}</Label>
          </ViewMenuItem>
        ))}
      </div>
      <div className={styles.actionsContainer}>
        <SearchBar placeholder='Busque em projetos...'/>
        <Button><Label Icon={FaFilter}>Filtrar</Label></Button>
        <Button><Label Icon={MdModeEdit}>Editar Etapas</Label></Button>
        <Button isFilled><Label Icon={FaPlus}>Novo Projeto</Label></Button>
      </div>
    </menu>
  )
}