import styles from './GeneralProjectsPage.module.css'
import PageTitle from '../../components/PageTitle/PageTitle'
import ViewMenu from '../../components/ViewMenu/ViewMenu'

export default function GeneralProjectsPage() {
  return (
    <>
      <PageTitle>General Projects</PageTitle>
      <section>
        <ViewMenu />
      </section>
    </>
  )
}