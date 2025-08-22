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
    CircularProgress
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import FlagIcon from 'react-country-flag'
import SendIcon from '@mui/icons-material/Send'
import img_220331 from '../assets/220331.jpeg'
import img_220332 from '../assets/220332.jpeg'
import img_220356 from '../assets/220356.jpeg'
import img_230515 from '../assets/230515.jpg'

const tourPackages = [
    {
        packageName: 'Bhutan Bliss: A 3N/4D Himalayan Escape',
        packageDescription: 'Experience the serene beauty and rich culture of Bhutan in a magical 3N/4D getaway to Thimphu and Paro.',
        coverImage: img_220331
    },
    {
        packageName: 'Bhutan Bliss: A 5N/6D Cultural Sojourn',
        packageDescription: 'Delve into Bhutan\'s timeless charm over 6 days, exploring sacred monasteries, lush valleys, and the vibrant local life of Thimphu, Paro, and Punakha.',
        coverImage: img_220332
    },
    {
        packageName: 'Bhutan Bliss: A 9N/10D Himalayan Journey',
        packageDescription: 'Embark on a soul-stirring 9N/10D journey through Bhutan\'s stunning landscapes, ancient monasteries, and vibrant culture from Paro to Bumthang and beyond.',
        coverImage: img_220356
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
    const [errors, setErrors] = React.useState<{ name?: string; email?: string; phone?: string }>({})
    const [loading, setLoading] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [animatedTitleText, setAnimatedTitleText] = React.useState('')
    const headerRef = React.useRef<HTMLDivElement>(null)
    const titleText = 'Explore the Enchanted Kingdom of Bhutan!'

    const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    const validatePhoneNumber = (val: string) => /^[0-9]+$/.test(val)

    const handleDialogBoxOpen = () => setIsDialogBoxVisible(true)
    const handleDialogBoxClose = () => {
        setName('')
        setPhone('')
        setEmail('')
        setErrors({})
        setIsSubmitted(false)
        setIsDialogBoxVisible(false)
    }

    const handleSave = () => {
        const newErrors: typeof errors = {}
        if (!name.trim()) newErrors.name = 'Name is required'
        if (!email.trim()) newErrors.email = 'Email is required'
        else if (!validateEmail(email)) newErrors.email = 'Invalid email address'
        if (!phone.trim()) newErrors.phone = 'Phone number is required'
        else if (!validatePhoneNumber(phone)) newErrors.phone = 'Phone number must be digits only'
        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) {
            setLoading(true)
            setIsSubmitted(false)
            setTimeout(() => {
                setLoading(false)
                setIsSubmitted(true)
            }, 2000)
            console.log(`Name: ${name}, Email: ${email}, Phone Number: ${countryCode}-${phone}`)
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
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr',
                    },
                }}
            >
                {tourPackages.map((pkg, idx) => (
                    <Card
                        key={idx}
                        sx={{
                            minHeight: 200,
                            maxWidth: 450,
                            mx: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderRadius: 0,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                            },
                        }}
                    >
                        <CardMedia
                            sx={{ height: 175 }}
                            image={pkg?.coverImage}
                            title="Tiger\'s Nest"
                        />
                        <CardContent>
                            <Typography variant='h5' component='div'>
                                {pkg?.packageName}
                            </Typography>
                            <Typography
                                component='div'
                                color='text.secondary'
                                sx={{
                                    mt: 1,
                                }}
                            >
                                {pkg?.packageDescription}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ py: 2.5, justifyContent: 'center' }}>
                            <Button
                                variant='contained'
                                sx={{
                                    borderRadius: 25,
                                    color: '#fff',
                                    backgroundColor: '#000',
                                    textTransform: 'none'
                                }}
                                onClick={handleDialogBoxOpen}
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    px: 2,
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        px: 4,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                        maxWidth: '50rem',
                    }}
                >
                    Go Anywhere. Feel Everything.
                </Typography>
            </Box>
            <Dialog
                open={isDialogBoxVisible}
                onClose={handleDialogBoxClose}
                fullWidth
                maxWidth='sm'
                PaperProps={{ sx: { borderRadius: 0 } }}
            >
                <DialogTitle sx={{ m: 0, p: 2, pr: 5 }}>
                    Get a Quote
                    <IconButton
                        aria-label='close'
                        onClick={handleDialogBoxClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                        <CircularProgress sx={{ color: '#000' }} />
                    </Box>
                ) : isSubmitted ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                        <Typography
                            variant='h6'
                            align='center'
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.25rem' }
                            }}
                        >
                            We have received your request, we will get back to you soon!
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                label='Name'
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    if (errors.name) setErrors({ ...errors, name: undefined })
                                }}
                                fullWidth
                                margin='normal'
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': { borderColor: '#000' },
                                    },
                                    '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#000' } },
                                }}
                                FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                            />
                            <TextField
                                label='Email'
                                type='email'
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (errors.email) setErrors({ ...errors, email: undefined })
                                }}
                                fullWidth
                                margin='normal'
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': { borderColor: '#000' },
                                    },
                                    '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#000' } },
                                }}
                                FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                            />
                            <TextField
                                label='Phone Number'
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                    if (errors.phone) setErrors({ ...errors, phone: undefined })
                                }}
                                fullWidth
                                margin='normal'
                                error={!!errors.phone}
                                helperText={errors.phone}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': { borderColor: '#000' },
                                    },
                                    '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#000' } },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Select
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.target.value)}
                                                variant='standard'
                                                disableUnderline
                                                sx={{ mr: 1 }}
                                            >
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
                                FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                            />
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button
                                variant='contained'
                                sx={{ borderRadius: 25, textTransform: 'none', color: '#fff', backgroundColor: '#000' }}
                                onClick={handleSave}
                                endIcon={<SendIcon />}  
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
