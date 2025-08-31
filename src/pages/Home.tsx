import React, { useRef, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    CircularProgress,
    Link
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import FlagIcon from 'react-country-flag'
import SendIcon from '@mui/icons-material/Send'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import img_220331 from '../assets/220331.webp'
import img_220332 from '../assets/220332.jpg'
import img_220356 from '../assets/220356.jpg'
import img_230515 from '../assets/230515.jpg'
import img_233415 from '../assets/233415.jpg'
import img_225315 from '../assets/225315.jpg';
import img_225515 from '../assets/225515.jpg';
import img_225615 from '../assets/225615.jpg';
import img_225715 from '../assets/225715.jpg';

const tourPackages = [
    {
        packageName: 'Bhutan Bliss: A 3N/4D Himalayan Escape',
        packageDescription: 'Experience the serene beauty and rich culture of Bhutan in a magical 3N/4D getaway to Thimphu and Paro.',
        coverImage: img_220331,
        tourPackageName: 'Bhutan Tour Package (3N/4D)'
    },
    {
        packageName: 'Bhutan Bliss: A 5N/6D Cultural Sojourn',
        packageDescription: 'Delve into Bhutan\'s timeless charm over 6 days, exploring sacred monasteries, lush valleys, and the vibrant local life of Thimphu, Paro, and Punakha.',
        coverImage: img_220332,
        tourPackageName: 'Bhutan Tour Package (5N/6D)'
    },
    {
        packageName: 'Bhutan Bliss: A 9N/10D Himalayan Journey',
        packageDescription: 'Embark on a soul-stirring 9N/10D journey through Bhutan\'s stunning landscapes, ancient monasteries, and vibrant culture from Paro to Bumthang and beyond.',
        coverImage: img_220356,
        tourPackageName: 'Bhutan Tour Package (9N/10D)'
    },
]

const countries = [
    { code: 'IN', dial: '+91' },
    { code: 'US', dial: '+1' },
    { code: 'GB', dial: '+44' },
    { code: 'BT', dial: '+975' },
]

export const Home: React.FC = () => {
    const [isDialogBoxVisible, setIsDialogBoxVisible] = React.useState(false)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [countryCode, setCountryCode] = React.useState('+91')
    const [startDate, setStartDate] = React.useState('')
    const [selectedPackage, setSelectedPackage] = React.useState('')
    const [errors, setErrors] = React.useState<{ name?: string; email?: string; phone?: string; startDate?: string }>({})
    const [loading, setLoading] = React.useState(false)
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [responseError, setResponseError] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [animatedTitleText, setAnimatedTitleText] = React.useState('')
    const headerRef = React.useRef<HTMLDivElement>(null)
    const titleText = 'Explore the Enchanted Kingdom of Bhutan!'

    const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    const validatePhoneNumber = (val: string) => /^[0-9]+$/.test(val)

    const handleDialogBoxOpen = (pkgName: string) => {
        setSelectedPackage(pkgName)
        setIsDialogBoxVisible(true)
    }

    const handleDialogBoxClose = () => {
        setIsDialogBoxVisible(false)
        setTimeout(() => {
            setName('');
            setPhone('');
            setEmail('');
            setStartDate('');
            setErrors({});
            setIsSubmitted(false);
            setResponseError(false);
        }, 200);
    }

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const totalPages = 3;
    const intervalTime = 2000;

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const page = Math.round((scrollLeft / (scrollWidth - clientWidth)) * (totalPages - 1));
            setActiveIndex(page);
        }
    };

    const handleSave = async () => {
        const newErrors: typeof errors = {}
        if (!name.trim()) newErrors.name = 'Name is required!'
        if (!email.trim()) newErrors.email = 'Email is required!'
        else if (!validateEmail(email)) newErrors.email = 'Invalid email address!'
        if (!phone.trim()) newErrors.phone = 'Phone number is required!'
        else if (!validatePhoneNumber(phone)) newErrors.phone = 'Phone number must be digits only!'
        if (!startDate.trim()) newErrors.startDate = 'Journey date is required!'
        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) {
            setLoading(true)
            setIsSubmitted(false)
            setResponseError(false)
            try {
                const res = await fetch('https://anywhere-fastapi-backend.onrender.com/mail/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        customer_name: name,
                        customer_email: email,
                        customer_phone: `${countryCode}-${phone}`,
                        tour_package_name: selectedPackage,
                        tour_start_date: startDate
                    })
                })
                const data = await res.json()
                if (data.status_code === 200) {
                    setIsSubmitted(true)
                } else {
                    setResponseError(true)
                }
            } catch {
                setResponseError(true)
            } finally {
                setLoading(false)
            }
        }
    }

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.5 }
        )
        if (headerRef.current) observer.observe(headerRef.current)
        return () => observer.disconnect()
    }, [])

    React.useEffect(() => {
        if (!visible) return
        let i = 0
        const interval = setInterval(() => {
            setAnimatedTitleText(titleText.slice(0, i + 1))
            i = (i + 1) % (titleText.length + 1)
        }, 100)
        return () => clearInterval(interval)
    }, [visible])

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                const pageWidth = clientWidth;
                let nextPage = activeIndex + 1;

                if (nextPage >= totalPages) {
                    nextPage = 0;
                }

                scrollRef.current.scrollTo({
                    left: nextPage * pageWidth,
                    behavior: "smooth",
                });

                setActiveIndex(nextPage);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <Box sx={{ flex: 1 }}>
            <Box
                sx={{
                    height: { xs: 220, sm: 320, md: 380 },
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${img_230515})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 1,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 2,
                    }}
                />
                <Box sx={{ position: 'relative', zIndex: 3, px: 2 }} ref={headerRef}>
                    <Typography
                        variant='h3'
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                        }}
                    >
                        {animatedTitleText}
                    </Typography>
                    <Typography
                        sx={{
                            mt: 1,
                            px: 2,
                            py: 0.5,
                            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.35rem' },
                            display: 'inline-block',
                            borderRadius: 5,
                            color: '#000',
                            backgroundColor: '#ffdf00',
                        }}
                    >
                        Exclusively Bhutan
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    px: 4,
                    pt: 6.5,
                    pb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                    }}
                >
                    Packages For You
                </Typography>
            </Box>
            <Box
                ref={scrollRef}
                onScroll={handleScroll}
                sx={{
                    px: 2,
                    py: 2.5,
                    gap: 2,
                    display: { xs: "flex", sm: "grid" },
                    gridTemplateColumns: { sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                    overflowX: { xs: "auto", sm: "unset" },
                    scrollSnapType: { xs: "x mandatory", sm: "unset" },
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {tourPackages.map((pkg, idx) => (
                    <Card
                        key={idx}
                        sx={{
                            minHeight: 150,
                            maxWidth: 420,
                            flex: { xs: "0 0 100%", sm: "unset" },
                            scrollSnapAlign: { xs: "center", sm: "unset" },
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 0,
                            boxShadow: 5,
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.03)",
                                boxShadow: 7.5,
                            },
                        }}
                    >
                        <CardMedia sx={{ height: 200 }} image={pkg.coverImage} />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem', md: '1.5rem' } }}>{pkg.packageName}</Typography>
                            <Typography color="text.secondary" sx={{ mt: 1.5, fontSize: { xs: '0.85rem', sm: '0.95rem', md: '0.95rem' } }}>
                                {pkg.packageDescription}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ mt: "auto", py: 2, justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 25,
                                    backgroundColor: "#000",
                                    color: "#fff",
                                }}
                                onClick={() => handleDialogBoxOpen(pkg.tourPackageName)}
                            >
                                Book Now
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
            <Box
                sx={{
                    display: { xs: "flex", sm: "none" },
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    my: 1.5,
                }}
            >
                {[...Array(totalPages)].map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: i === activeIndex ? "black" : "grey.400",
                            transition: "all 0.3s ease",
                        }}
                    />
                ))}
            </Box>
            <Box
                sx={{
                    py: 5,
                    px: 4,
                    mt: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 5,
                    backgroundColor: '#fff',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        fontWeight: 700,
                        mb: 0,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #065e48ff, #00ad83, #66e2c4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Best Time to Visit Bhutan
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: { xs: 2, sm: 3 },
                        px: { xs: 1, sm: 0 },
                        width: '100%',
                        maxWidth: '1200px',
                        overflowX: { xs: 'auto', sm: 'visible' },
                        paddingBottom: { xs: 2, sm: 0 },
                        scrollSnapType: { xs: 'x mandatory', sm: 'none' },
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        }
                    }}
                >
                    {[
                        { season: 'Spring', months: 'Mar - May', description: 'Blossoming flowers, pleasant weather, ideal for trekking and cultural festivals.', image: img_225715 },
                        { season: 'Summer', months: 'Jun - Aug', description: 'Monsoon season, lush green landscapes, fewer tourists, some trails may be slippery.', image: img_225315 },
                        { season: 'Autumn', months: 'Sep - Nov', description: 'Clear skies, vibrant festivals, great for photography and sightseeing.', image: img_225615 },
                        { season: 'Winter', months: 'Dec - Feb', description: 'Cool and crisp weather, snow-capped mountains, perfect for cultural experiences.', image: img_225515 },
                    ].map((item, idx) => (
                        <Card
                            key={idx}
                            sx={{
                                borderRadius: 0,
                                boxShadow: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                backgroundColor: '#fefefe',
                                flexShrink: 0,
                                width: { xs: '100%', sm: '280px' },
                                scrollSnapAlign: { xs: 'center', sm: 'none' },
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.image}
                                alt={item.season}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 700,
                                        mb: 0.5,
                                        textAlign: 'center',
                                        fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                                        background: 'linear-gradient(90deg, #000, #555)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {item.season}
                                </Typography>
                                <Typography
                                    variant='subtitle2'
                                    sx={{
                                        fontWeight: 500,
                                        mb: 1,
                                        textAlign: 'center',
                                        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                                        background: 'linear-gradient(90deg, #333, #777)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {item.months}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        textAlign: 'center',
                                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                                        color: '#333',
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    py: 10,
                    mt: 5,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: { xs: 'center', md: 'left' },
                    px: 2,
                    gap: 6,
                    backgroundColor: "#fff",
                    color: "text.secondary",
                }}
            >
                <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                        variant='h4'
                        sx={{
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            mb: 2,
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, #065e48ff, #00ad83, #66e2c4)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Know About Bhutan
                    </Typography>

                    <Typography
                        sx={{
                            maxWidth: '45rem',
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem' },
                            opacity: 0.9,
                        }}
                    >
                        Bhutan, the Land of the Thunder Dragon, is known for its pristine natural beauty,
                        spiritual heritage, and Gross National Happiness. From the cliffside Tiger’s Nest
                        Monastery to the lush valleys of Paro and Punakha, Bhutan offers an unforgettable
                        journey where tradition and tranquility coexist.
                    </Typography>

                    <Link
                        href='https://www.indembthimphu.gov.in/pages/MzE5'
                        target='_blank'
                        underline='hover'
                        sx={{
                            mt: 3,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            fontSize: { xs: '0.75rem', sm: '0.95rem', md: '1rem' },
                            color: '#333',
                            transition: 'color 0.3s ease',
                            '&:hover': { color: '#000' },
                        }}
                    >
                        View documents required to travel for Indians
                        <OpenInNewIcon fontSize='small' />
                    </Link>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component='img'
                        src={img_233415}
                        alt='Dochula Pass'
                        sx={{
                            width: '100%',
                            maxWidth: 550,
                            borderRadius: 0,
                            // boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                        }}
                    />
                </Box>
            </Box>
            <Dialog
                open={isDialogBoxVisible}
                onClose={handleDialogBoxClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{ sx: { borderRadius: 0 } }}
            >
                <DialogTitle>
                    Send Enquiry
                    <IconButton
                        onClick={handleDialogBoxClose}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: 200,
                        }}
                    >
                        <CircularProgress sx={{ color: "#00ad83" }} />
                    </Box>
                ) : isSubmitted ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            minHeight: 200,
                            px: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                            }}
                        >
                            We have received your request, we will get back to you soon!
                        </Typography>
                    </Box>
                ) : responseError ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            minHeight: 200,
                            px: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                            }}
                        >
                            Something went wrong, please try again later.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <DialogContent>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                                fullWidth
                                required
                                margin="normal"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#00ad83" },
                                        "&:hover fieldset": { borderColor: "#00ad83" },
                                        "&.Mui-focused fieldset": { borderColor: "#00ad83" },
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "#00ad83" },
                                    "& .MuiFormHelperText-root": {
                                        marginLeft: 0,
                                    },
                                }}
                            />
                            <TextField
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                                fullWidth
                                margin="normal"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#00ad83" },
                                        "&:hover fieldset": { borderColor: "#00ad83" },
                                        "&.Mui-focused fieldset": { borderColor: "#00ad83" },
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "#00ad83" },
                                    "& .MuiFormHelperText-root": {
                                        marginLeft: 0,
                                    },
                                }}
                            />
                            <TextField
                                label="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                error={!!errors.phone}
                                helperText={errors.phone}
                                required
                                fullWidth
                                margin="normal"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#00ad83)" },
                                        "&:hover fieldset": { borderColor: "#00ad83" },
                                        "&.Mui-focused fieldset": { borderColor: "#00ad83" },
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "#00ad83" },
                                    "& .MuiFormHelperText-root": {
                                        marginLeft: 0,
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Select
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.target.value)}
                                                variant="standard"
                                                disableUnderline
                                            >
                                                {countries.map((c) => (
                                                    <MenuItem key={c.code} value={c.dial}>
                                                        <FlagIcon
                                                            countryCode={c.code}
                                                            svg
                                                            style={{ marginRight: 8 }}
                                                        />
                                                        {c.dial}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Journey Date"
                                type="date"
                                required
                                InputLabelProps={{ shrink: true }}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                error={!!errors.startDate}
                                helperText={errors.startDate}
                                fullWidth
                                margin="normal"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#00ad83" },
                                        "&:hover fieldset": { borderColor: "#00ad83" },
                                        "&.Mui-focused fieldset": { borderColor: "#00ad83" },
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "#00ad83" },
                                    "& .MuiFormHelperText-root": {
                                        marginLeft: 0,
                                    },
                                }}
                            />
                        </DialogContent>
                        <DialogActions sx={{ py: 2 }}>
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                endIcon={<SendIcon />}
                                sx={{
                                    mr: 2,
                                    borderRadius: 25,
                                    backgroundColor: "#00ad83",
                                    color: "#fff",
                                }}
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    )
}
