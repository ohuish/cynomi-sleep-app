'use client'
import * as React from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@/mui'
import MenuIcon from '@mui/icons-material/Menu'
import LightMode from '@mui/icons-material/LightMode'
import DarkMode from '@mui/icons-material/DarkMode'
import { ColorModeContext } from '@/theme'

const pages = [
  {
    href: 'record',
    text: 'Record Sleep',
  },
  {
    href: 'view',
    text: 'View Sleep Data',
  },
]

export default function Navbar() {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Sleep Tracker
          </Typography>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            😴
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ text, href }) => (
                <MenuItem key={href} onClick={handleCloseNavMenu}>
                  <Link
                    href={href}
                    color='inherit'
                    underline='none'
                    textAlign='center'
                  >
                    {text}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ text, href }) => (
              <Button
                key={href}
                href={href}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {text}
              </Button>
            ))}
          </Box>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color='inherit'
          >
            {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
