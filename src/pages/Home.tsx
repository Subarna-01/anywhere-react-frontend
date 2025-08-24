import * as React from 'react'
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
        setName('')
        setPhone('')
        setEmail('')
        setStartDate('')
        setErrors({})
        setIsSubmitted(false)
        setResponseError(false)
        setIsDialogBoxVisible(false)
    }

    const handleSave = async () => {
        const newErrors: typeof errors = {}
        if (!name.trim()) newErrors.name = 'Name is required'
        if (!email.trim()) newErrors.email = 'Email is required'
        else if (!validateEmail(email)) newErrors.email = 'Invalid email address'
        if (!phone.trim()) newErrors.phone = 'Phone number is required'
        else if (!validatePhoneNumber(phone)) newErrors.phone = 'Phone number must be digits only'
        if (!startDate.trim()) newErrors.startDate = 'Start date is required'
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
                sx={{
                    px: 2,
                    py: 2,
                    display: { xs: 'flex', sm: 'grid' },
                    gap: 2,
                    gridTemplateColumns: { sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                    overflowX: { xs: 'auto', sm: 'unset' },
                    scrollSnapType: { xs: 'x mandatory', sm: 'unset' }
                }}
            >
                {tourPackages.map((pkg, idx) => (
                    <Card key={idx} sx={{ flex: { xs: '0 0 100%', sm: 'unset' }, scrollSnapAlign: { xs: 'center', sm: 'unset' }, borderRadius: 0 }}>
                        <CardMedia sx={{ height: 200 }} image={pkg.coverImage} />
                        <CardContent>
                            <Typography variant='h5'>{pkg.packageName}</Typography>
                            <Typography color='text.secondary'>{pkg.packageDescription}</Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button
                                variant='contained'
                                sx={{ borderRadius: 25, backgroundColor: '#000', color: '#fff' }}
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
                    py: 10,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: { xs: 'center', md: 'left' },
                    px: 2,
                    gap: 4,
                }}
            >
                <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, px: { xs: 0, md: 0 } }}>
                    <Typography
                        variant='h4'
                        sx={{
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                            mb: 2,
                            fontWeight: '700',
                            textAlign: { xs: 'center', md: 'left' },
                            background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}
                    >
                        Know About Bhutan
                    </Typography>
                    <Typography
                        sx={{
                            maxWidth: '45rem',
                            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.15rem' },
                            textAlign: { xs: 'center', md: 'left' }
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
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            textAlign: { xs: 'center', md: 'left' },
                            fontSize: { xs: '0.75rem', sm: '0.95rem', md: '1rem' },
                            color: '#f97316',
                            '&:hover': { color: '#c2410c' }
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
                        sx={{ width: '100%', maxWidth: 600 }}
                    />
                </Box>
            </Box>
            <Dialog open={isDialogBoxVisible} onClose={handleDialogBoxClose} fullWidth maxWidth='sm' PaperProps={{ sx: { borderRadius: 0 } }}>
                <DialogTitle>
                    Get a Quote
                    <IconButton onClick={handleDialogBoxClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                        <CircularProgress sx={{ color: '#000' }} />
                    </Box>
                ) : isSubmitted ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: 200, px: 3 }}>
                        <Typography sx={{ fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' } }}>
                            We have received your request, we will get back to you soon!
                        </Typography>
                    </Box>
                ) : responseError ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: 200, px: 3 }}>
                        <Typography sx={{ fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' } }}>
                            Something went wrong, please try again later.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <DialogContent>
                            <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} error={!!errors.name} helperText={errors.name} fullWidth margin='normal' />
                            <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} fullWidth margin='normal' />
                            <TextField
                                label='Phone Number'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                error={!!errors.phone}
                                helperText={errors.phone}
                                fullWidth
                                margin='normal'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} variant='standard' disableUnderline>
                                                {countries.map((c) => (
                                                    <MenuItem key={c.code} value={c.dial}>
                                                        <FlagIcon countryCode={c.code} svg style={{ marginRight: 8 }} />
                                                        {c.dial}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label='Start Date'
                                type='date'
                                InputLabelProps={{ shrink: true }}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                error={!!errors.startDate}
                                helperText={errors.startDate}
                                fullWidth
                                margin='normal'
                            />
                        </DialogContent>
                        <DialogActions sx={{ py: 2 }}>
                            <Button variant='contained' onClick={handleSave} endIcon={<SendIcon />} sx={{ mr: 2, backgroundColor: '#000', color: '#fff' }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    )
}
