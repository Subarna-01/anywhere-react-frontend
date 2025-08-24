import * as React from 'react';
import { Box, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f5f5f5',
                py: 5,
                px: { xs: 2, sm: 4, md: 8 },
                mt: 6,
                borderTop: '1px solid #ddd',
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
                    gap: 4,
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ mb: 1, color: '#222' }}>
                        Travel with Anywhere
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 280 }}>
                        Explore the beauty of Bhutan with our curated trips and trusted travel guidance.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ mb: 1, color: '#222' }}>
                        Contact
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#444' }}>
                        <PhoneIcon fontSize="small" />
                        <Typography variant="body2">+91 85849 42607</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#d44638' }}>
                        <EmailIcon fontSize="small" />
                        <Typography variant="body2">anywhere.queries@gmail.com</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        New Delhi, India
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ mb: 1, color: '#222' }}>
                        Stay Connected
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box
                            component="a"
                            href="https://wa.me/919856371954"
                            target="_blank"
                            rel="noopener"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: '#25d366',
                                textDecoration: 'none',
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            <WhatsAppIcon />
                            WhatsApp
                        </Box>
                        <Box
                            component="a"
                            href="https://www.instagram.com/travelwithanywhere?igsh=MXd5aHd0Z3ltaTVpcw=="
                            target="_blank"
                            rel="noopener"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: '#e1306c',
                                textDecoration: 'none',
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            <InstagramIcon />
                            Instagram
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Anywhere. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};
