import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import axios from "axios";
import Navbar from "../../Navbar";


const PaymentForm = () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Collect card details securely using Stripe Elements
        const cardElement = elements.getElement(CardElement);

        // Create a payment method and retrieve the paymentMethodId
        let { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('Error creating payment method:', error);
            setPaymentError(error.message); // Display payment error to the user
        } else {
            const paymentMethodId = paymentMethod.id;
            console.log(paymentMethodId)
            await axios.post('http://localhost:5000/sub/upgrade-test/', {paymentMethodId}, config)
            error=null
            // Now you have the paymentMethodId to send to your backend
            // Use it to upgrade the user's subscription or process the payment
        }
    };

    return (

                <>
                    <Navbar />
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Payment Details
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <CardElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        '::placeholder': {
                                                            color: '#aab7c4',
                                                        },
                                                    },
                                                    invalid: {
                                                        color: '#9e2146',
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Name on Card"
                                            variant="outlined"
                                            fullWidth
                                            // Add input fields for additional payment details
                                            // Add onChange handlers to update state
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={!stripe}
                                        >
                                            Pay
                                        </Button>
                                    </Grid>
                                    {paymentError && (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" color="error">
                                                {paymentError}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </>
    );
};

export default PaymentForm;