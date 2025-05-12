import { useState } from 'react';
import Layout from '@/layouts/Layout.tsx'
import config from '../../config/index.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast.ts'
import { useForm } from 'react-hook-form'

const APITesting = () => {
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({
        // resolver: zodResolver(),
        mode: 'onChange'
    });
    const [responseData, setResponseData] = useState<{
        google_api_key?: string;
        zoom_api_key?: string;
        teams_api_key?: string;
    } | null>(null);

    const [responseCreateData, setResponseCreateData] = useState<{
        meeting_type?: string;
        meeting_url?: string;
        meeting_id?: string;
        meeting_passcode?: string | number;
    } | null>(null);

    const [responseJoinData, setResponseJoinData] = useState<{ start_meeting?: boolean } | null>(null);

    const onLoginSubmit = async (data: any) => {
        const { email, password } = data
        const formData = {
            email,
            password
        }
        const headers = {
            'Authorization': `${localStorage.getItem('access_token')}`,  // Use the appropriate header name
            'Content-Type': 'application/json',  // Set content type if necessary
        }
        try {
            const response = await axios.post(`${config.serverUrl}/api/meet/login`,
                formData,
                {
                    headers
                }
            )
            setResponseData(response.data);
            toast({
                title: 'Login Completed',
                variant: 'success'
            })
        } catch (err) {
            console.error(err)
            toast({
                title: 'Login not completed',
                variant: 'destructive'
            })
            // setError('An error occurred while trying to register')
        }
    }
    const onMeetingCreatingSubmit = async (data: any) => {
        const { email_create, password_create, meeting_type } = data
        const formData = {
            email: email_create,
            password: password_create,
            meeting_type: meeting_type
        }
        const headers = {
            'Authorization': `${localStorage.getItem('access_token')}`,  // Use the appropriate header name
            'Content-Type': 'application/json',  // Set content type if necessary
        }
        try {
            const response = await axios.post(`${config.serverUrl}/api/meet/create`,
                formData,
                {
                    headers
                }
            )
            setResponseCreateData(response.data);
            toast({
                title: 'Create Completed',
                variant: 'success'
            })
            // setError('')
        } catch (err) {
            console.error(err)
            toast({
                title: 'Create not completed',
                variant: 'destructive'
            })
            // setError('An error occurred while trying to register')
        }
    }
    const onMeetingJoiningSubmit = async (data: any) => {
        const { email_join, password_join, meeting_id, meeting_url, meeting_passcode } = data
        const formData = {
            email: email_join,
            password: password_join,
            meeting_id,
            meeting_url,
            meeting_passcode
        }
        const headers = {
            'Authorization': `${localStorage.getItem('access_token')}`,  // Use the appropriate header name
            'Content-Type': 'application/json',  // Set content type if necessary
        }
        try {
            const response = await axios.post(`${config.serverUrl}/api/meet/join`,
                formData,
                {
                    headers
                }
            )
            setResponseJoinData(response.data)
            toast({
                title: 'Login Completed',
                variant: 'success'
            })
        } catch (err) {
            console.error(err)
            toast({
                title: 'Login not completed',
                variant: 'destructive'
            })
            // setError('An error occurred while trying to register')
        }
    }
    const handleButtonCancel = () => {
        toast({
            title: 'Initialized',
            variant: 'cancel'
        })

        setResponseData(null);
        setResponseCreateData(null);
        setResponseJoinData(null);
    }

    const breadcrumbItems = [{ label: 'API Testing' }]

    return (
        <Layout>
            <Toaster />
            <BreadcrumbComponent items={breadcrumbItems} />
            <div className="flex flex-row items-center">
                <Link to="/users/list" className="text-4xl text-black p-1">
                    &lt;
                </Link>
                <h1 className="text-black text-2xl font-bold"> API Testing</h1>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
                <div className="">
                    <Card className="mb-4">
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit(onLoginSubmit)}>
                                Login API
                                <Separator className="my-4" />
                                <div className="flex gap-x-4">
                                    <div className="w-1/2 ">
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="Email"
                                            required
                                            {...register('email')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.email
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('email') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.email && <p className="text-red-500">{(errors.email as any).message}</p>}
                                    </div>
                                    <div className="w-1/2 ">
                                        <Input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            required
                                            {...register('password')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.password
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('password') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.password && <p className="text-red-500">{(errors.password as any).message}</p>}
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className='flex flex-col gap-2 response text-sm bg-gray-50 p-2 rounded'>
                                    {responseData ? (
                                        <>
                                            <div><strong>Google API Key:</strong> {responseData.google_api_key}</div>
                                            <div><strong>Zoom API Key:</strong> {responseData.zoom_api_key}</div>
                                            <div><strong>Teams API Key:</strong> {responseData.teams_api_key}</div>
                                        </>
                                    ) : (
                                        <span className="text-gray-400 italic">No response yet</span>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => handleButtonCancel()}
                                        type="button"
                                        className={`bg-secondary text-dark px-4 py-2 ${!isValid ? 'bg-secondary-200 opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isValid}
                                    >
                                        Init
                                    </Button>
                                    <Button
                                        type="submit"
                                        className={`bg-primary-400 text-white px-4 py-2 ${!isValid ? 'bg-primary-200 opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isValid}
                                    >
                                        Test
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <Card className="mb-4">
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit(onMeetingCreatingSubmit)}>
                                Meeting Creating API
                                <Separator className="my-4" />
                                <div className="flex gap-x-4">
                                    <div className="w-1/2 ">
                                        <Input
                                            type="email"
                                            id="email_create"
                                            placeholder="Email"
                                            required
                                            {...register('email_create')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.email_create
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('email_create') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.email_create && <p className="text-red-500">{(errors.email_create as any).message}</p>}
                                    </div>
                                    <div className="w-1/2 ">
                                        <Input
                                            type="text"
                                            id="meeting_type"
                                            placeholder="Meeting Type"
                                            required
                                            {...register('meeting_type')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.meeting_type
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('meeting_type') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.meeting_type && <p className="text-red-500">{(errors.meeting_type as any).message}</p>}
                                    </div>
                                    <div className="w-1/2 ">
                                        <Input
                                            type="password"
                                            id="password_create"
                                            placeholder="Password"
                                            required
                                            {...register('password_create')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.password_create
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('password_create') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.password_create && <p className="text-red-500">{(errors.password_create as any).message}</p>}
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className='flex flex-col gap-2 response-create text-sm bg-gray-50 p-2 rounded'>
                                    {responseCreateData ? (
                                        <>
                                            <div><strong>Meeting Type:</strong> {responseCreateData.meeting_type}</div>
                                            <div><strong>Meeting URL:</strong> <a href={responseCreateData.meeting_url} className="text-blue-600 underline" target="_blank">{responseCreateData.meeting_url}</a></div>
                                            <div><strong>Meeting ID:</strong> {responseCreateData.meeting_id}</div>
                                            <div><strong>Passcode:</strong> {responseCreateData.meeting_passcode}</div>
                                        </>
                                    ) : (
                                        <span className="text-gray-400 italic">No response yet</span>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => handleButtonCancel()}
                                        type="button"
                                        className={`bg-secondary text-dark px-4 py-2 ${!isValid ? 'bg-secondary-200 opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isValid}
                                    >
                                        Init
                                    </Button>
                                    <Button
                                        type="submit"
                                        className={`bg-primary-400 text-white px-4 py-2 ${!isValid ? 'bg-primary-200 opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isValid}
                                    >
                                        Test
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <Card className="mb-4">
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit(onMeetingJoiningSubmit)}>
                                Meeting Joining API
                                <Separator className="my-4" />
                                <div className="flex gap-x-4">
                                    <div className="w-1/2 ">
                                        <Input
                                            type="email"
                                            id="email_join"
                                            placeholder="Email"
                                            required
                                            {...register('email_join')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.email_join
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('email_join') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.email_join && <p className="text-red-500">{(errors.email_join as any).message}</p>}
                                    </div>
                                    <div className="w-1/2 ">
                                        <Input
                                            type="password"
                                            id="password_join"
                                            placeholder="Password"
                                            required
                                            {...register('password_join')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.password_join
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('password_join') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.password_join && <p className="text-red-500">{(errors.password_join as any).message}</p>}
                                    </div>
                                </div>
                                <div className="flex gap-x-4">
                                    <div className="w-1/2 ">
                                        <Input
                                            type="text"
                                            id="meeting_id"
                                            placeholder="Meeting ID"
                                            required
                                            {...register('meeting_id')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.meeting_id
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('meeting_id') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.meeting_id && <p className="text-red-500">{(errors.meeting_id as any).message}</p>}
                                    </div>
                                    <div className="w-1/2 ">
                                        <Input
                                            type="text"
                                            id="meeting_url"
                                            placeholder="Meeting URL"
                                            required
                                            {...register('meeting_url')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.meeting_url
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('meeting_url') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.meeting_url && <p className="text-red-500">{(errors.meeting_url as any).message}</p>}
                                    </div>
                                    <div className="w-1/2 ">
                                        <Input
                                            type="text"
                                            id="meeting_passcode"
                                            placeholder="Meeting Passcode"
                                            required
                                            {...register('meeting_passcode')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${errors.meeting_passcode
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('meeting_passcode') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.meeting_passcode && <p className="text-red-500">{(errors.meeting_passcode as any).message}</p>}
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex flex-col gap-2 response text-sm bg-gray-50 p-3 rounded border">
                                    {responseJoinData ? (
                                        <div>
                                            <strong>Start Meeting:</strong>{' '}
                                            <span className={responseJoinData.start_meeting ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                                {responseJoinData.start_meeting ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 italic">No response yet</span>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => handleButtonCancel()}
                                        type="button"
                                        className={`bg-secondary text-dark px-4 py-2 ${!isValid ? 'bg-secondary-200 opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isValid}
                                    >
                                        Init
                                    </Button>
                                    <Button
                                        type="submit"
                                        className={`bg-primary-400 text-white px-4 py-2 ${!isValid ? 'bg-primary-200 opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isValid}
                                    >
                                        Test
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}

export default APITesting
