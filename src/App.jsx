import { Routes, Route, Navigate } from "react-router-dom"
import Layout from './components/Layout/Layout'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import GeneralProjectsPage from './pages/GeneralProjectsPage/GeneralProjectsPage'
import InternalProjectsPage from './pages/InternalProjectsPage/InternalProjectsPage'
import ExternalProjectsPage from './pages/ExternalProjectsPage/ExternalProjectsPage'
import StartupProjectsPage from './pages/StartupProjectsPage/StartupProjectsPage'
import MeetingsPage from './pages/MeetingsPage/MeetingsPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/projects'>
            <Route path='general' element={<GeneralProjectsPage />} />
            <Route path='internal' element={<InternalProjectsPage />} />
            <Route path='external' element={<ExternalProjectsPage />} />
            <Route path='startups' element={<StartupProjectsPage />} />
          </Route>
          <Route path='/meetings' element={<MeetingsPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
