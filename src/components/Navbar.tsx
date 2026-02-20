import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  styled,
  Fade,
  useTheme,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Home as HomeIcon,
  CalendarMonth as CalendarMonthIcon,
  School as SchoolIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Class as ClassIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(5, 12, 20, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'rgba(5, 12, 20, 0.98)',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}));

const NavButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

interface StyledButtonProps {
  active?: boolean;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyledButtonProps>(({ theme, active }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  fontFamily: '"Inter", sans-serif',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: active ? '100%' : '0%',
    height: '2px',
    background: '#fff',
    transition: 'all 0.3s ease-in-out',
    transform: 'translateX(-50%)',
  },
  '&:hover': {
    color: '#fff',
    background: 'rgba(255, 255, 255, 0.05)',
    '&::after': {
      width: '100%',
    },
  },
  '&.MuiButton-root': {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '1rem',
  },
})) as typeof Button;

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  fontFamily: '"Poppins", sans-serif',
  background: 'linear-gradient(to right, #ff6b6b, #4ecdc4, #45b7d1, #96c93d)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% auto',
  animation: 'gradient 3s linear infinite',
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% center',
    },
    '100%': {
      backgroundPosition: '200% center',
    },
  },
  letterSpacing: '-0.5px',
  cursor: 'pointer',
  transition: 'opacity 0.3s ease-in-out',
  '&:hover': {
    opacity: 0.9,
  },
})) as typeof Typography;

const Navbar: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Logo component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
          CampusConnect
        </Logo>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          [theme.breakpoints.down('md')]: {
            display: 'none'
          }
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <StyledButton
              component={RouterLink}
              to="/"
              startIcon={<HomeIcon />}
              sx={{ color: isActive('/') ? '#fff' : 'rgba(255, 255, 255, 0.7)' }}
            >
              Home
            </StyledButton>
            <StyledButton
              component={RouterLink}
              to="/calendar"
              startIcon={<CalendarMonthIcon />}
              sx={{ color: isActive('/calendar') ? '#fff' : 'rgba(255, 255, 255, 0.7)' }}
            >
              Events
            </StyledButton>
            <StyledButton
              startIcon={<SchoolIcon />}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleClick}
              sx={{ color: (isActive('/room-booking') || isActive('/study-spots')) ? '#fff' : 'rgba(255, 255, 255, 0.7)' }}
            >
              Booking
            </StyledButton>
          </Box>

          {isAuthenticated ? (
            <IconButton
              onClick={handleLogout}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: '#fff',
                  transform: 'rotate(180deg)',
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          ) : (
            <StyledButton
              component={RouterLink}
              to="/auth"
              sx={{ color: isActive('/auth') ? '#fff' : 'rgba(255, 255, 255, 0.7)' }}
            >
              Login
            </StyledButton>
          )}
        </Box>

        <MobileMenuButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMobileMenuOpen}
          sx={{
            display: { xs: 'flex', md: 'none' }
          }}
        >
          <MenuIcon />
        </MobileMenuButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Fade}
          PaperProps={{
            sx: {
              background: 'rgba(10, 25, 41, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              mt: 1,
              minWidth: 200,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          {isAdmin && (
            <MenuItem
              onClick={() => {
                handleClose();
                navigate('/room-booking');
              }}
              sx={{
                color: isActive('/room-booking') ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                },
              }}
            >
              Room Booking
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              handleClose();
              navigate('/study-spots');
            }}
            sx={{
              color: isActive('/study-spots') ? '#fff' : 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
              },
            }}
          >
            Study Spots
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: '300px',
              background: 'rgba(10, 25, 41, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <MenuItem
            component={RouterLink}
            to="/"
            onClick={handleMobileMenuClose}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/calendar"
            onClick={handleMobileMenuClose}
          >
            <ListItemIcon>
              <CalendarMonthIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText>Events</ListItemText>
          </MenuItem>
          {isAdmin && (
            <MenuItem
              component={RouterLink}
              to="/room-booking"
              onClick={handleMobileMenuClose}
            >
              <ListItemIcon>
                <ClassIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText>Room Booking</ListItemText>
            </MenuItem>
          )}
          <MenuItem
            component={RouterLink}
            to="/study-spots"
            onClick={handleMobileMenuClose}
          >
            <ListItemIcon>
              <SchoolIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText>Study Spots</ListItemText>
          </MenuItem>
          {isAuthenticated ? (
            <MenuItem onClick={() => {
              handleMobileMenuClose();
              handleLogout();
            }}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          ) : (
            <MenuItem
              component={RouterLink}
              to="/auth"
              onClick={handleMobileMenuClose}
            >
              <ListItemText>Login</ListItemText>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 