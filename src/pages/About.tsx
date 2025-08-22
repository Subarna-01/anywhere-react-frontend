import * as React from 'react';
import { Box, Typography } from '@mui/material';
import img_005515 from '../assets/005515.png';
import img_005815 from '../assets/005815.png';

export const About: React.FC = () => {
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    minHeight: '60vh',
                    px: { xs: 2, md: 10 },
                    py: { xs: 4, md: 8 },
                    alignItems: 'center',
                    gap: { xs: 3, md: 4 },
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        width: '100%',
                        aspectRatio: '16 / 9',
                        backgroundImage: `url(${img_005515})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <Box sx={{ flex: 1, maxWidth: 600, textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                        variant='h3'
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontSize: { xs: '1.75rem', md: '3rem' },
                        }}
                    >
                        Who We Are
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            fontSize: { xs: '0.95rem', md: '1.125rem' },
                        }}
                    >
                        We’re passionate about creating immersive travel experiences that connect you with the heart of your dream destinations. With a focus on innovation, quality, and genuine care, our team is dedicated to making every journey truly unforgettable. We don’t just plan trips — we craft stories, emotions, and memories that last a lifetime. Every destination is handpicked, every detail thoughtfully considered, so you can travel with confidence and wonder.
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row-reverse' },
                    minHeight: '60vh',
                    px: { xs: 2, md: 10 },
                    py: { xs: 4, md: 8 },
                    alignItems: 'center',
                    gap: { xs: 3, md: 4 },
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        width: '100%',
                        aspectRatio: '16 / 9',
                        backgroundImage: `url(${img_005815})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Box sx={{ flex: 1, maxWidth: 600, textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                        variant='h3'
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontSize: { xs: '1.75rem', md: '3rem' },
                        }}
                    >
                        Why Choose Us
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            fontSize: { xs: '0.95rem', md: '1.125rem' },
                        }}
                    >
                        We blend expert planning with a personal touch to deliver seamless, tailor-made adventures. From thoughtfully curated itineraries to 24/7 support, we go above and beyond to make your journey smooth, exciting, and uniquely yours. Our team takes the time to understand your travel style, ensuring every detail reflects your preferences. With us, it’s not just a trip — it’s an experience designed around you.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
