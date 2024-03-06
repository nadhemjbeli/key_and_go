import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "./PaymentForm";


const stripePromise = loadStripe('pk_test_51N2wIPHqkQpw01a9lhZIOyiTTYxyHrrSnbxcxCcVgSP10ryr3ZUEE2E82Lf2zoHeMCG6Wx8yG9pbCBhLLatZsAOp0015iBZros');

function StripedPayment(props) {
    return (
        <>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </>
    );
}

export default StripedPayment;