import * as React from 'react';
import { Box, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

export const Footer: React.FC = () => {
    return (
        <Box
            component='footer'
            sx={{
                backgroundColor: '#f5f5f5',
                py: 4,
                px: 2,
                mt: 4,
                textAlign: 'center',
                borderTop: '1px solid #ddd',
            }}
        >
            <Typography
                variant='h6'
                gutterBottom
                sx={{
                    fontSize: { xs: '1.2rem', sm: '1.5rem' },
                }}
            >
                Stay Connected
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: { xs: 2, sm: 4 },
                    mb: 2,
                }}
            >
                <Box
                    component='a'
                    href='https://wa.me/919876543210'
                    target='_blank'
                    rel='noopener'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: '#25d366',
                        textDecoration: 'none',
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    <WhatsAppIcon />
                    WhatsApp
                </Box>
                <Box
                    component='a'
                    href='https://instagram.com/yourProfileHere'
                    target='_blank'
                    rel='noopener'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: '#e1306c',
                        textDecoration: 'none',
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    <InstagramIcon />
                    Instagram
                </Box>
                <Box
                    component='a'
                    href='mailto:contact@yourdomain.com'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: '#d44638',
                        textDecoration: 'none',
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    <EmailIcon />
                    Email Us
                </Box>
            </Box>
            <Typography variant='body2' color='text.secondary'>
                © {new Date().getFullYear()} Anywhere. All rights reserved.
            </Typography>
        </Box>

    );
}