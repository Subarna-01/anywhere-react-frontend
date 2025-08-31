import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Button,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position='sticky'
            elevation={0}
            sx={{
                px: { xs: 2, sm: 4 },
                boxShadow: 'none',
                borderBottom: 'none',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: '#000',
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }}
        >
            <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ gap: 3, display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant='h6'
                        sx={{
                            fontSize: { xs: '1.2rem', sm: '1.5rem' },
                            color: "#00ad83"
                        }}
                    >
                        anywhere.trips
                    </Typography>
                    {!isMobile && (
                        <>
                            <Button
                                component={Link}
                                to='/'
                                disableRipple
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                Home
                            </Button>
                            <Button
                                component={Link}
                                to='/about'
                                disableRipple
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                About Us
                            </Button>
                        </>
                    )}
                </Box>
                {isMobile && (
                    <>
                        <IconButton
                            edge='end'
                            color='inherit'
                            aria-label='menu'
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                                sx: {
                                    borderRadius: 0
                                }
                            }}
                        >
                            <MenuItem
                                component={Link}
                                to='/'
                                onClick={handleMenuClose}
                            >
                                Home
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to='/about'
                                onClick={handleMenuClose}
                            >
                                About Us
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};
