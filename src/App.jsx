import { Routes, Route } from "react-router-dom"
import Sidebar from './components/Sidebar/Sidebar'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import GeneralProjectsPage from './pages/GeneralProjectsPage/GeneralProjectsPage'
import InternalProjectsPage from './pages/InternalProjectsPage/InternalProjectsPage'
import ExternalProjectsPage from './pages/ExternalProjectsPage/ExternalProjectsPage'
import StartupProjectsPage from './pages/StartupProjectsPage/StartupProjectsPage'
import MeetingsPage from './pages/MeetingsPage/MeetingsPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/projects'>
            <Route path='general' element={<GeneralProjectsPage />} />
            <Route path='internal' element={<InternalProjectsPage />} />
            <Route path='external' element={<ExternalProjectsPage />} />
            <Route path='startups' element={<StartupProjectsPage />} />
          </Route>
          <Route path='/meetings' element={<MeetingsPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
