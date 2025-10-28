import { Routes, Route, Navigate } from "react-router-dom"
import Layout from './components/Layout'
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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute"
import { NotificationContextProvider } from "./contexts/NotificationContext"

function App() {
  return (
    <AuthProvider>
      <NotificationContextProvider>
        <Routes>
          <Route element={<UnauthenticatedRoute />}>
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
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
          </Route>
        </Routes>
      </NotificationContextProvider>
    </AuthProvider>
  )
}

export default App
