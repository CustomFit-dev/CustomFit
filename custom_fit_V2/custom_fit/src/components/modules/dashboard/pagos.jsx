    import React from 'react';
    import {
    Box,
    Typography,
    Paper,
    Button,
    Divider,
    Container,
    Grid,
    Avatar,
    } from '@mui/material';
    import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
    import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

    const payments = [
    { name: 'Camiseta sencilla', method: 'Efectivo', icon: <AttachMoneyIcon /> },
    { name: 'Camiseta sencilla', method: 'Nequi', icon: <PhoneIphoneIcon /> }
    ];

    const PaymentDetails = () => {
    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
        <Typography
            variant="h5"
            align="center"
            sx={{ color: '#17BEBB', fontWeight: 'bold', mb: 4 }}
        >
            Datos de pago
        </Typography>

        {payments.map((payment, index) => (
            <Paper
            key={index}
            elevation={4}
            sx={{
                p: 3,
                mb: 4,
                bgcolor: '#121212',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(23,190,187,0.1)',
            }}
            >
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                <Avatar
                    sx={{
                    bgcolor: '#17BEBB',
                    color: '#000',
                    width: 40,
                    height: 40,
                    }}
                >
                    {payment.icon}
                </Avatar>
                </Grid>
                <Grid item xs>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {payment.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                    Método de pago: <span style={{ color: '#17BEBB' }}>{payment.method}</span>
                </Typography>
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                variant="contained"
                sx={{
                    bgcolor: '#17BEBB',
                    color: '#000',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 4,
                    '&:hover': {
                    bgcolor: '#0e8f8f'
                    }
                }}
                >
                Ver factura
                </Button>
            </Box>

            {index < payments.length - 1 && (
                <Divider sx={{ mt: 3, bgcolor: '#333' }} />
            )}
            </Paper>
        ))}
        </Container>
    );
    };

    export default PaymentDetails;
