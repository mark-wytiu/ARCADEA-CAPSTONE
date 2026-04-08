import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from '@mui/material';
import { createSvgIcon } from '@mui/material/utils';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

import './Header.scss';

const NAV_ITEMS = [
    { label: 'Home', path: '/' },
    { label: 'Add Games', path: '/add-game' },
];

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
);

function isNavActive(pathname, itemPath) {
    if (itemPath === '/') {
        return pathname === '/';
    }
    return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

function Header() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const location = useLocation();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="fixed" className="header-container">
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            aria-label="Open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
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
                                '& .MuiPaper-root': { minWidth: 200 },
                            }}
                        >
                            {NAV_ITEMS.map((item) => (
                                <MenuItem
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    onClick={handleCloseNavMenu}
                                    selected={isNavActive(location.pathname, item.path)}
                                    sx={{ color: 'text.primary' }}
                                >
                                    <Typography textAlign="left" component="span" variant="body1">
                                        {item.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow: { xs: 1, md: 0 },
                            color: 'inherit',
                            textDecoration: 'none',
                            mr: { md: 2 },
                        }}
                    >
                        <HomeIcon sx={{ mr: 1 }} />
                        <Typography component="span" className="header-title" variant="h6" noWrap>
                            Arcadea
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                        {NAV_ITEMS.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                className={`nav-button${isNavActive(location.pathname, item.path) ? ' active' : ''}`}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, ml: { xs: 1, md: 2 } }}>
                        <Tooltip title="Profile">
                            <IconButton sx={{ p: 0 }} aria-label="User profile (placeholder)">
                                <Avatar alt="Mark Wy Tiu" src="/static/images/avatar/2.jpg" sx={{ bgcolor: '#5e60ce' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
