import { alpha, AppBar, Badge, Box, IconButton, InputBase, Stack, styled, Toolbar, Typography } from '@mui/material'
import { AccountCircle, Mail, Notifications } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';

export default function Topbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Spark
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box className='relative rounded bg-white/15 hover:bg-white/25 w-sm'>
          <Box className='absolute flex items-center justify-center h-full !px-2'>
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search…"
            className='!p-1 !pl-10 !text-inherit w-full'
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
        </IconButton>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={17} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton size="large" edge="end" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}