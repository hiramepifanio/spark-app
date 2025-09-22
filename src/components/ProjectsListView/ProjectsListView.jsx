import ListViewGroup from '../ListViewGroup/ListViewGroup'
import styles from './ProjectsListView.module.css'
import { projects } from '../../data/projects'
import { stages } from '../../data/stages'

const columns = [
  { accessorKey: "name", header: "Nome", size: 2 },
  { accessorKey: "description", header: "Descrição", size: 3 },
  { accessorKey: "funding", header: "Fundos (R$)", size: 1 },
  { accessorKey: "stage", header: "Estágio", size: 1 },
  { accessorKey: "startedAt", header: "Começou Em", size: 1 },
  { accessorKey: "finishedAt", header: "Finalizou Em", size: 1 },
]

export default function ProjectsListView() {
  return (
    <>
      {stages.map(stage => (
        <ListViewGroup key={stage} data={projects.filter(p => p.stage === stage)} columns={columns}>{stage}</ListViewGroup>
      ))}
    </>
  )
}