import styles from './GeneralProjectsPage.module.css'
import PageTitle from '../../components/PageTitle/PageTitle'
import ProjectsViewMenu from '../../components/ProjectsViewMenu/ProjectsViewMenu'

export default function GeneralProjectsPage() {
  return (
    <>
      <PageTitle>General Projects</PageTitle>
      <section>
        <ProjectsViewMenu />
      </section>
    </>
  )
}