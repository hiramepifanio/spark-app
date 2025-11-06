import { Routes, Route, Navigate } from "react-router-dom"
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import MeetingsPage from './pages/MeetingsPage/MeetingsPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute"
import { SnackbarProvider } from 'notistack';
import ProjectWorkflowsPage from "./pages/ProjectWorkflowsPage"
import ProjectWorkflowPage from "./pages/ProjectWorkflowPage"
import { ThemeProvider } from "@mui/material"
import { muiTheme } from "./theme/muiTheme"

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <AuthProvider>
        <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <Routes>
            <Route element={<UnauthenticatedRoute />}>
              <Route path='/register' element={<RegistrationPage />} />
              <Route path='/login' element={<LoginPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path='/' element={<Navigate to='/dashboard' replace />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/project-workflows' element={<ProjectWorkflowsPage />} />
                <Route path='/project-workflows/:workflowId' element={<ProjectWorkflowPage />} />
                <Route path='/meetings' element={<MeetingsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
