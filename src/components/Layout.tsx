import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet } from "react-router-dom"
import { Box, Container, Stack } from '@mui/material'

export default function Layout() {
  return (
    <Box>
      <Topbar />
      <Stack direction={'row'}>
        <Sidebar />
        <Container className='!pt-4'>
          <Outlet />
        </Container>
      </Stack>
    </Box>
  )
}