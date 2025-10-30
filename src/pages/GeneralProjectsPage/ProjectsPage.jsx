import styles from './GeneralProjectsPage.module.css'
import PageTitle from '../../components/PageTitle/PageTitle'
import ProjectsViewMenu from '../../components/ProjectsViewMenu/ProjectsViewMenu'
import ProjectsListView from '../../components/ProjectsListView/ProjectsListView'

import { Typography } from "@mui/material";

export default function GeneralProjectsPage() {
  return (
    <>
      <PageTitle>Projetos Gerais</PageTitle>
      <section>
        <ProjectsViewMenu />
        <ProjectsListView />
      </section>
    </>
  )
}

// export default function GeneralProjectsPage() {
//   return (
//     <>
//       <Typography variant="h3" component={'h1'}>Projetos</Typography>

//     </>
//   )
// }