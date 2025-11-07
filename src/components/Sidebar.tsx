import { AuthContext } from '../contexts/AuthContext'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconProps } from '@mui/material'
import { Business, Dashboard, Group, GroupWork, Logout, Settings, ViewKanban } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { ReactElement, useContext } from 'react'

interface generalNavigationItem {
  to: string
  label: string
  icon: ReactElement<SvgIconProps>
}

const items: generalNavigationItem[] = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <Dashboard />
  },
  {
    to: '/project-workflows',
    label: 'Workflows',
    icon: <ViewKanban />
  },
  {
    to: '/partners',
    label: 'Parceiros',
    icon: <Business />
  },
  {
    to: '/meetings',
    label: 'Reuniões',
    icon: <Group />
  },
  {
    to: '/settings',
    label: 'Configurações',
    icon: <Settings />
  }
]

export default function Sidebar() {
  const { authDispatch } = useContext(AuthContext)
  const location = useLocation();
  
  const handleLogout = (): void => {
    authDispatch({ type: 'LOGOUT' }); 
  };

  return (
    <Box className="h-screen w-3xs">
      <List>
        {items.map(item => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton 
              selected={location.pathname.startsWith(item.to)} 
              component={Link} 
              to={item.to} 
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}