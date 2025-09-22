import styles from './GeneralProjectsPage.module.css'
import PageTitle from '../../components/PageTitle/PageTitle'
import ProjectsViewMenu from '../../components/ProjectsViewMenu/ProjectsViewMenu'
import ProjectsListView from '../../components/ProjectsListView/ProjectsListView'

export default function GeneralProjectsPage() {
  return (
    <>
      <PageTitle>General Projects</PageTitle>
      <section>
        <ProjectsViewMenu />
        <ProjectsListView />
      </section>
    </>
  )
}