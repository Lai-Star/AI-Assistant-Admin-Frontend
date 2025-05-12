import Layout from '@/layouts/Layout.tsx'
import config from '../../../config/index.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast.ts'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const userGroupSchema = z
    .object({
        name: z.string().regex(/^[A-Za-z\s]+$/, 'The name must contain only letters')
    })

type userGroupSchema = z.infer<typeof userGroupSchema>;

const UserGroupAdd = () => {
    // const [error, setError] = useState('')
    const navigate = useNavigate()
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(userGroupSchema),
        mode: 'onChange'
    })

    const onSubmit = async (data: any) => {
        console.log(data)
        const { name } = data
        console.log('Data sent:', { name })
        const formData = {
            name
        }
        const headers = {
            'Authorization': `${localStorage.getItem('access_token')}`,  // Use the appropriate header name
            'Content-Type': 'application/json',  // Set content type if necessary
        }
        try {
            await axios.post(`${config.serverUrl}/api/user-group/save`,
                formData,
                {
                    headers
                }
            )
            toast({
                title: 'Registered Completed',
                variant: 'success'
            })
            setTimeout(() => {
                navigate('/userGroups/list')
                // setError('')
            }, 3000)
            // setError('')
        } catch (err) {
            console.error(err)
            toast({
                title: 'Registration not completed',
                variant: 'destructive'
            })
            // setError('An error occurred while trying to register')
        }
    }
    const handleButtonCancel = () => {
        toast({
            title: 'Registered canceled',
            variant: 'cancel'
        })
        setTimeout(() => {
            navigate('/userGroups/list')
            // setError('')
        }, 2000)
    }

    const breadcrumbItems = [{ label: 'UserGroups' }, { label: 'User Group Registration' }]

    return (
        <Layout>
            <Toaster />
            <BreadcrumbComponent items={breadcrumbItems} />
            <div className="flex flex-row items-center">
                <Link to="/userGroups/list" className="text-4xl text-black p-1">
                    &lt;
                </Link>
                <h1 className="text-black text-2xl font-bold"> User Group Registration</h1>
            </div>
            <div className="p-4">
                <div className="">
                    <Card className="">
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                User Group Data
                                <Separator className="my-4" />
                                <div className="flex gap-x-4">
                                    <div className="w-1/2">
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="Enter user group name*"
                                            required
                                            {...register('name')}
                                            // className={`border p-2 w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                                ${errors.name
                                                    ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                    : watch('name') &&
                                                    'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.name && <p className="text-red-500">{(errors.name as any).message}</p>}
                                    </div>
                                    {/* <div className="w-1/2">
                                        <Input
                                            type="text"
                                            id="registration"
                                            name="registration"
                                            placeholder="Enter your registration number"
                                            required
                                            {...register('registration')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                                ${
                                                    errors.registration
                                                        ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                        : watch('registration') &&
                                                          'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.registration && (
                                            <p className="text-red-500">{errors.registration.message}</p>
                                        )}
                                        <span className="text-xs text-black-500 float-right">
                                            • Mín. 4 Letras | • Máx. 10 Caracteres
                                        </span>
                                    </div> */}
                                </div>
                                {/* <div className="w-1/2">
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Submit or Email*"
                                        required
                                        {...register('email')}
                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                                ${
                                                    errors.email
                                                        ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                        : watch('email') &&
                                                          'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                    <span className="text-xs text-black-500 float-right">• Máx 40 Caracteres</span>
                                </div> */}
                                {/* Access data */}
                                <Separator className="my-4" />
                                {/* <div className="flex gap-x-4">
                                    <div className="w-1/2">
                                        <Input
                                            type="name"
                                            id="name"
                                            name="name"
                                            placeholder="name"
                                            required
                                            // {...register('name')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                                ${
                                                    errors.name
                                                        ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                        : watch('name') &&
                                                          'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="w-1/2 ">
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="email"
                                            required
                                            {...register('email')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${
                                            errors.password
                                                ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                : watch('email') &&
                                                  'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                        }`}
                                        />
                                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                    </div>
                                </div>
                                <div className="flex gap-x-4">
                                    <div className="w-1/2 ">
                                        <Input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            required
                                            {...register('password')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${
                                            errors.password
                                                ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                : watch('password') &&
                                                  'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                        }`}
                                        />
                                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                    </div>

                                    <div className="w-1/2">
                                        <Input
                                            type="password"
                                            id="confirmationPassword"
                                            name="confirmationPassword"
                                            placeholder="Confirm Password"
                                            required
                                            {...register('confirmationPassword')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                                ${
                                                    errors.confirmationPassword
                                                        ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                        : watch('confirmationPassword') &&
                                                          'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.confirmationPassword && (
                                            <p className="text-red-500">{errors.confirmationPassword.message}</p>
                                        )}
                                    </div>
                                </div> */}
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="submit"
                                        className="bg-white text-black border p-2"
                                        onClick={handleButtonCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className={`bg-primary-400 text-white px-4 py-2 ${!isValid ? 'bg-primary-200 opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isValid}
                                    >
                                        Register
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

export default UserGroupAdd
