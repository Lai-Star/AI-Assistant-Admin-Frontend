import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import config from '../../config/index.tsx';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast.ts';
import { Toaster } from '@/components/ui/toaster.tsx';

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(5, 'Password must be at least 6 characters long'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema), // Using the resolver for validation
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const response = await axios.post(`https://${config.serverUrl}/api/auth/login`, {
                email: data.email,
                password: data.password,
            });
            console.log('Successful authentication:', response.data);

            const { access_token, user } = response.data;

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            toast({
                title: 'User successfully logged in!',
                variant: 'success',
            });
            navigate('/loading');
        } catch (error) {
            toast({
                title: 'Invalid username/password.',
                variant: 'destructive',
            });
        }
    };

    return (
        <>
            <Toaster />
            <div
                className="relative flex items-center justify-center h-screen"
                style={{ backgroundColor: 'rgb(34, 45, 89)' }} // Background color in RGB
            >
                <div className="hidden lg:flex items-center justify-center w-1/3 p-8">
                    {/* <img src={logo2} alt="Logo" className="max-w-full h-auto" /> */}
                    <h1 className="text-xs">Logo</h1>
                </div>

                {/* Right Side - Login Form */}
                <div style={{ height: '30rem' }} className="flex flex-col justify-center w-full max-w-xl p-8">
                    <Card className="h-full">
                        <CardHeader className="p-4">
                            <CardTitle style={{ color: '#0290A4' }} className="pt-3 px-5 text-left text-5xl font-bold">
                                Welcome!
                            </CardTitle>
                        </CardHeader>
                        <CardHeader className="py-3 pt-9">
                            <CardTitle className="text-left text-1xl px-5 font-semibold">Login to your account</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {/* Email Field */}
                            <div className="space-y-4 px-5">
                                <div>
                                    <Label
                                        htmlFor="email"
                                        className={`block text-sm font-medium mb-2 ${
                                            errors.email ? 'text-red-500' : 'text-gray-700'
                                        }`}
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                                            errors.email
                                                ? 'border-b-red-800 border-2 placeholder-red-500 text-red-500'
                                                : 'border-green-500'
                                        }`}
                                        type="email"
                                        placeholder="Email or Registration Number"
                                        {...register('email', { required: true })}
                                    />
                                    {errors?.email?.type === 'required' && (
                                        <p className="text-red-500 text-sm mt-1">Required field.</p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <Label htmlFor="password" className={`block text-sm font-medium mb-2 ${
                                        errors.password ? 'text-red-500' : 'text-gray-700'
                                    }`}>
                                        Password
                                    </Label>
                                    <Input
                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                                            errors.password
                                                ? 'border-b-red-800 border-2 placeholder-red-500 text-red-500'
                                                : 'border-green-500'
                                        }`}
                                        type="password"
                                        placeholder="Password"
                                        {...register('password', { required: true, minLength: 5 })}
                                    />
                                    {errors?.password?.type === 'required' && (
                                        <p className="text-red-500 text-sm mt-1">Required field.</p>
                                    )}
                                    {errors?.password?.type === 'minLength' && (
                                        <p className="error-message">Password needs to have at least 6 characters.</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4" style={{ paddingLeft: '3rem' }}>
                            {/* Login Button */}
                            <Button
                                className="w-full p-5 text-1xl"
                                onClick={handleSubmit(onSubmit)}
                                style={{ backgroundColor: '#0290A4' }}
                            >
                                Enter
                            </Button>

                            {/* Forgot Password */}
                            <a
                                href="/forgot"
                                className="text-sm text-center text-blue-600 hover:underline mt-3 font-bold"
                                style={{ color: '#0290A4' }}
                            >
                                I forgot my password
                            </a>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Login;