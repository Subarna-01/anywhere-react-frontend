import * as React from 'react';
import { Box, Typography, Container } from '@mui/material';
import img_005515 from '../assets/005515.png';
import img_005815 from '../assets/005815.png';

export const About: React.FC = () => {
    return (
        <Box
        >
            <Box
                sx={{
                    backgroundColor: '#fff',
                    py: { xs: 6, md: 10 },
                }}
            >
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        gap: { xs: 4, md: 8 },
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            width: '100%',
                            aspectRatio: '16 / 10',
                            mb: { xs: 2.5 },
                            borderRadius: 0,
                            backgroundImage: `url(${img_005515})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                            transition: 'transform 0.5s ease',
                            animation: 'fadeInLeft 1.5s ease',
                            '&:hover': { transform: 'scale(1.03)' },
                        }}
                    />
                    <Box
                        sx={{
                            flex: 1,
                            maxWidth: 600,
                            textAlign: { xs: 'center', md: 'left' },
                            animation: 'fadeInRight 1.5s ease',
                        }}
                    >
                        <Typography
                            variant='h3'
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '1.75rem', md: '2.75rem' },
                            }}
                        >
                            Who We Are
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{ fontSize: { xs: '0.95rem', md: '1.125rem' }, lineHeight: 1.7 }}
                        >
                            We're passionate about creating immersive travel experiences that connect you with the heart of your dream destinations.
                            With a focus on innovation, quality, and genuine care, our team is dedicated to making every journey truly unforgettable.
                            We don't just plan trips — we craft stories, emotions, and memories that last a lifetime.
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    py: { xs: 1, md: 10 }
                }}
            >
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row-reverse' },
                        alignItems: 'center',
                        gap: { xs: 4, md: 8 },
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            width: '100%',
                            aspectRatio: '16 / 10',
                            mb: { xs: 2.5 },
                            borderRadius: 0,
                            backgroundImage: `url(${img_005815})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                            transition: 'transform 0.5s ease',
                            animation: 'fadeInRight 1.5s ease',
                            '&:hover': { transform: 'scale(1.03)' },
                        }}
                    />
                    <Box
                        sx={{
                            flex: 1,
                            maxWidth: 600,
                            textAlign: { xs: 'center', md: 'left' },
                            animation: 'fadeInLeft 1.5s ease',
                        }}
                    >
                        <Typography
                            variant='h3'
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '1.75rem', md: '2.75rem' },
                            }}
                        >
                            Why Choose Us
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{ fontSize: { xs: '0.95rem', md: '1.125rem' }, lineHeight: 1.7, mb: { xs: 10 } }}
                        >
                            We blend expert planning with a personal touch to deliver seamless, tailor-made adventures.
                            From thoughtfully curated itineraries to 24/7 support, we go above and beyond to make your journey smooth, exciting, and uniquely yours.
                            With us, it's not just a trip — it's an experience designed around you.
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <style>
                {`
                    @keyframes fadeInLeft {
                        from { opacity: 0; transform: translateX(-40px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes fadeInRight {
                        from { opacity: 0; transform: translateX(40px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    `}
            </style>
        </Box>
    );
};
