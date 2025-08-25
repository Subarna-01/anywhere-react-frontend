import * as React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export const Footer: React.FC = () => {
    return (
        <Box
            component='footer'
            sx={{
                px: { xs: 3, sm: 6, md: 10 },
                py: 6,
                // mt: 8,
                borderTop: '1px solid #e0e0e0',
                backgroundColor: '#fafafa'
            }}
        >
            <Box
                sx={{
                    gap: { xs: 4, md: 6 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }
                }}
            >
                <Box>
                    <Typography variant='h6' sx={{ mb: 1.5, fontWeight: 500, color: '#111' }}>
                        Travel with Anywhere
                    </Typography>
                    <Typography variant='body2' sx={{ maxWidth: 320, lineHeight: 1.6, color: 'text.secondary' }}>
                        Anywhere is your trusted companion for seamless journeys,
                        offering personalized travel experiences that inspire and connect.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='h6' sx={{ mb: 1.5, fontWeight: 500, color: '#111' }}>
                        Contact Us
                    </Typography>
                    <Box sx={{ mb: 1.2, gap: 1, display: 'flex', alignItems: 'center', color: 'text.primary' }}>
                        <PhoneIcon fontSize='small' />
                        <Typography variant='body2'>+91 85849 42607</Typography>
                    </Box>
                    <Box sx={{ mb: 1.2, gap: 1, display: 'flex', alignItems: 'center', color: 'text.primary' }}>
                        <EmailIcon fontSize='small' sx={{ color: '#d44638' }} />
                        <Typography variant='body2'>anywhere.queries@gmail.com</Typography>
                    </Box>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        New Delhi, India
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='h6' sx={{ mb: 1.5, fontWeight: 500, color: '#111' }}>
                        Stay Connected
                    </Typography>
                    <Box sx={{ gap: 1.2, display: 'flex', flexDirection: 'column' }}>
                        <Box
                            component='a'
                            href='https://wa.me/919856371954'
                            target='_blank'
                            rel='noopener'
                            sx={{
                                gap: 1,
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                transition: 'all 0.2s ease',
                                color: '#25d366',
                                '&:hover': { color: '#128c7e' }
                            }}
                        >
                            <WhatsAppIcon fontSize='small' />
                            WhatsApp
                        </Box>
                        <Box
                            component='a'
                            href='https://www.instagram.com/travelwithanywhere?igsh=MXd5aHd0Z3ltaTVpcw=='
                            target='_blank'
                            rel='noopener'
                            sx={{
                                gap: 1,
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                transition: 'all 0.2s ease',
                                color: '#e1306c',
                                '&:hover': { color: '#c13584' }
                            }}
                        >
                            <InstagramIcon fontSize='small' />
                            Instagram
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    © {new Date().getFullYear()} Anywhere Travels. All rights reserved.
                </Typography>
            </Box>
        </Box >
    );
};
