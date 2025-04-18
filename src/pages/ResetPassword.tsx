// src/pages/Login.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import logo1 from './../assets/icons/svg/Group 48699.svg';
import lockicon from './../assets/icons/svg/Group 47957.svg';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    // const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    // Typing the token as optional string
    const { token } = useParams<{ token?: string }>();
    console.log(token);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://localhost:3000/reset-password/${token}`, { newPassword });
            console.log('Password reset successfully');
            setMessage(response.data.message);
            navigate('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage('Error resetting password.');
        }
    };

    return (
        <div
            className="relative flex items-center justify-center h-screen"
            style={{ backgroundColor: 'rgb(34, 45, 89)' }} // Background color in RGB
        >
            {/* Left Side - Logo */}
            <div className="hidden lg:flex items-center justify-center w-1/3 p-8">
                <img src={lockicon} alt="Logo" className="max-w-full h-auto" />
            </div>

            {/* Right Side - Reset Password Form */}
            <div className="flex flex-col justify-center w-full max-w-md p-8">
                <Card style={{ width: '30rem', height: '30rem' }}>
                    {/* Logo */}
                    <div className="hidden lg:flex items-center justify-center w-52 px-4 pb-3 pt-14">
                        <img src={logo1} alt="Logo" className="max-w-full h-auto" />
                    </div>
                    <CardHeader className="px-6 pt-10 pb-3">
                        <CardTitle style={{ color: '#0290A4' }} className="text-left text-xl font-semibold">
                            Reset Password
                        </CardTitle>
                    </CardHeader>
                    <CardHeader className="px-6 pt-0">
                        <CardTitle className="text-left font-semibold">Reset Password</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                                </div>
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#0290A4' }}
                                    className="w-full"
                                >
                                    Reset
                                </Button>
                            </div>
                        </form>
                        {message && <p>{message}</p>}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ResetPassword;