
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
    const navigate = useNavigate();
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Payment Canceled</h1>
            <p style={styles.message}>Unfortunately, your payment was not completed. Please try again.</p>
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
        height: '100vh',
        backgroundColor: '#f8d7da', 
        color: '#721c24', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    message: {
        fontSize: '1rem',
        textAlign: 'center',
        color: '#721c24', 
    }
};

export default CancelPage;
