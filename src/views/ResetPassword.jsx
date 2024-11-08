import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

const ResetPassword = () => {
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axiosClient.post('/password/reset', {
                email,
                password,
                password_confirmation: passwordConfirmation,
                token,
            });
            setMessage(response.data.status);
        } catch (err) {
            setError(err.response.data.email || err.response.data.password);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default ResetPassword;
