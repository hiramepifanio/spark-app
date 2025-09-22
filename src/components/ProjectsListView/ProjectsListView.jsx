import ListViewGroup from '../ListViewGroup/ListViewGroup'
import styles from './ProjectsListView.module.css'
import { projects } from '../../data/projects'
import { stages } from '../../data/stages'

const columns = [
  { accessorKey: "name", header: "Name", size: 2 },
  { accessorKey: "description", header: "Description", size: 3 },
  { accessorKey: "funding", header: "Funding (USD)", size: 1 },
  { accessorKey: "stage", header: "Stage", size: 1 },
  { accessorKey: "startedAt", header: "Started At", size: 1 },
  { accessorKey: "finishedAt", header: "Finished At", size: 1 },
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