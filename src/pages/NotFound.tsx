import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#000',
                backgroundColor: '#fff'
            }}
        >
            <Typography
                variant='h1'
                sx={{
                    mb: 2,
                    fontSize: { xs: '6rem', md: '10rem' },
                    fontWeight: 800,
                    color: '#000'
                }}
            >
                404
            </Typography>
            <Typography
                variant='h5'
                sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: '#222'
                }}
            >
                Page Not Found
            </Typography>
            <Typography
                variant='body1'
                sx={{
                    maxWidth: 400,
                    mb: 4,
                    color: '#555'
                }}
            >
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
            </Typography>
            <Button
                variant='contained'
                onClick={() => navigate('/')}
                sx={{
                    px: 4,
                    py: 1.2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    borderRadius: 8,
                    color: '#fff',
                    backgroundColor: '#000'
                }}
            >
                Back to Home
            </Button>
        </Box>
    );
};
