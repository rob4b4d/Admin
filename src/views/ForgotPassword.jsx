import React, { useState } from 'react';
import axiosClient from '../axios-client';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            const response = await axiosClient.post('/password/forgot', { email });
            setMessage(response.data.status);
        } catch (err) {
            console.error(err); // Log the entire error object for debugging
            if (err.response && err.response.data) {
                setError(err.response.data.email || 'Failed to send reset link');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ForgotPassword;
