
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51QYKW4RoE6pFh21C8BJOOiLJGHOxLOCsStpegYoQW6YdrVl19te7GT7lkmpD0L3Bvbn4U0oJRqez33wJ2oX8t7Jh00zGyDaShx'); // Your Stripe publishable key

const CheckoutPage = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const totalAmount = useParams().totalamount; 
    const items = useSelector(state => state.mycard.card); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCheckout = async () => {
        if (!email) {
            alert('Please enter your email');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/payment/create-payment-intent', {
                items,
                totalAmount,
                email,
            });

            const { id: sessionId } = response.data; 

            const stripe = await stripePromise;

            const { error } = await stripe.redirectToCheckout({
                sessionId, 
            });

            if (error) {
                console.error('Error during checkout:', error);
                setLoading(false);
            }
        } catch (err) {
            console.error('Error during checkout:', err);
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Checkout Page</h1>
            <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    style={styles.input}
                    required
                />
            </div>
            <button
                disabled={loading}
                onClick={handleCheckout}
                style={loading ? styles.loadingButton : styles.checkoutButton}
            >
                {loading ? 'Processing...' : 'Checkout'}
            </button>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '20px',
        width: '100%',
        maxWidth: '400px',
    },
    label: {
        fontSize: '1rem',
        marginBottom: '8px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px',
    },
    checkoutButton: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '400px',
    },
    loadingButton: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#ccc',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'not-allowed',
        width: '100%',
        maxWidth: '400px',
    }
};

export default CheckoutPage;
