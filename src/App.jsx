import { Routes, Route } from "react-router-dom"
import Sidebar from './components/Sidebar/Sidebar'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import MeetingsPage from './pages/MeetingsPage/MeetingsPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'

function App() {
  return (
    <div id='app-container'>
      <Sidebar />
      <main>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/meetings' element={<MeetingsPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
