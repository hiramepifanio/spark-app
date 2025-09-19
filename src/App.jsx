import { Routes, Route } from "react-router-dom"
import Sidebar from './components/Sidebar'
import DashboardPage from './components/DashboardPage'
import ProjectsPage from './components/ProjectsPage'
import MeetingsPage from './components/MeetingsPage'
import SettingsPage from './components/SettingsPage'

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
