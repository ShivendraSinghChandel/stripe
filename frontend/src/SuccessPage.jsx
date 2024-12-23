
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (sessionId) {
            axios
                .post('http://localhost:5000/payment/confirm-payment', { session_id: sessionId })
                .then((response) => {
                    console.log(response);
                    console.log(response.data.message);
                    setPaymentConfirmed(true);
                })
                .catch((err) => {
                    console.error('Error confirming payment:', err);
                    setError('Error confirming payment');
                });
        }
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Payment Success</h1>
            {paymentConfirmed ? (
                <p style={styles.message}>Your payment was successful, and your data has been saved!</p>
            ) : error ? (
                <p style={styles.error}>{error}</p>
            ) : (
                <p style={styles.message}>Confirming payment...</p>
            )}
            <Button onClick={()=>{navigate("/home")}} type='primary'>Back to Home</Button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
    },
    heading: {
        fontSize: '2rem',
        color: '#28a745',
        marginBottom: '20px',
    },
    message: {
        fontSize: '1.2rem',
        color: '#333',
        textAlign: 'center',
    },
    error: {
        fontSize: '1.2rem',
        color: '#dc3545',
        textAlign: 'center',
    }
};

export default SuccessPage;
