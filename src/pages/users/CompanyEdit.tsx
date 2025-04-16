import { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast.ts'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toaster } from '@/components/ui/toaster.tsx'
import ModalEditCancelComponent from '@/components/ModalEditCancelComponet.tsx'

const companySchema = z
    .object({
        name: z.string(),
        member_cnt: z.string()
        // email: z.string().email('Please enter a valid email address'),
        // registration: z.string().regex(/^\d+$/, 'The registration must contain only numbers'),
        // password: z.string().optional().or(z.literal('')),
        // confirmationPassword: z.string().optional().or(z.literal(''))
    })
    // .refine((data) => data.password === data.confirmationPassword, {
    //     path: ['confirmationPassword'],
    //     message: 'Passwords do not match'
    // })

type companyFormInputs = z.infer<typeof companySchema>

const CompanyEdit = () => {
    const { id } = useParams()
    const [company, setCompany] = useState<Partial<companyFormInputs>>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { toast } = useToast()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        async function fetchCompany() {
            try {
                const headers = {
                    'Authorization': `${localStorage.getItem('access_token')}`,  // Use the appropriate header name
                    'Content-Type': 'application/json',  // Set content type if necessary
                }
                const response = await axios.get(`http://192.168.17.11:8000/api/companies/${id}`, {
                    headers
                    // params: {
                    //     id: id
                    // }
                })
                setCompany(response.data)
            } catch (error) {
                setError('Error searching for company.')
            } finally {
                setLoading(false)
            }
        }
        fetchCompany()
    }, [id])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid, dirtyFields }
    } = useForm<companyFormInputs>({
        resolver: zodResolver(companySchema),
        mode: 'onChange'
    })

    const watchedFields = watch(['name', 'member_cnt'])

    useEffect(() => {
        if (company) {
            setValue('name', company.name || '')
            setValue('member_cnt', company.member_cnt || '')
            // setValue('email', company.email || '')
            // setValue('registration', company.registration || '')
            // setValue('password', company.password || '')
            // setValue('confirmationPassword', company.password || '')
        }
    }, [company, setValue])

    const onSubmit = async (data: companyFormInputs) => {
        const { name, member_cnt } = data
        const formData = {
            id: id,
            name,
            member_cnt
        }
        console.log(formData)
        const headers = {
            'Authorization': `${localStorage.getItem('access_token')}`,  // Use the appropriate header name
            'Content-Type': 'application/json',  // Set content type if necessary
        }
        try {
            await axios.post(`http://192.168.17.11:8000/api/companies/save`, formData, {
                headers
            })
            toast({
                title: 'Data saved successfully',
                variant: 'success'
            })
            setTimeout(() => {
                navigate('/companies/list')
                setError('')
            }, 3000)
            setError('')
        } catch (error) {
            toast({
                title: 'Company update ERROR',
                variant: 'destructive'
            })
            setError('An error occurred while trying to register')
        }
    }

    const handleButtonCancel = () => {
        toast({
            title: 'Registered canceled',
            variant: 'cancel'
        })
        setTimeout(() => {
            navigate('/companies/list')
            setError('')
        }, 2000)
    }

    const breadcrumbItems = [{ label: 'Companies' }, { label: 'Edit Company' }]

    const handleCancelClick = () => {
        setIsModalOpen(true)
    }

    const handleConfirmCancel = () => {
        navigate('/companies/list')
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <Layout>
            <Toaster />
            <BreadcrumbComponent items={breadcrumbItems} />
            <div className="flex flex-row items-center">
                <Link to="/companies/list" className="text-4xl text-black p-1">
                    &lt;
                </Link>
                <h1 className="text-black text-2xl font-bold"> Edit Company</h1>
            </div>

            <div className="p-4">
                <div className="">
                    <Card className="">
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-row items-center">
                                    <span className="mx-4 text-gray-700 font-bold">Company Data</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                                <div className="flex gap-x-4">
                                    <div className="w-1/2">
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="Enter comapany name*"
                                            required
                                            name="name"
                                            {...register('name')}
                                            className="bg-primary-100"
                                        />
                                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                        <span className="text-xs text-black-500 float-right">
                                            • Max. 30 Caracteress
                                        </span>
                                    </div>
                                    <div className="w-1/2">
                                        <Input
                                            type="text"
                                            id="member_cnt"
                                            placeholder="Enter memeber count*"
                                            required
                                            name="member_cnt"
                                            {...register('member_cnt')}
                                            className="bg-primary-100"
                                        />
                                        {errors.member_cnt && <p className="text-red-500">{errors.member_cnt.message}</p>}
                                        <span className="text-xs text-black-500 float-right">
                                            • Max. 30 Caracteress
                                        </span>
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                {/* <div className="w-1/2">
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Submit or Email*"
                                        required
                                        name="email"
                                        // value={user.email}
                                        {...register('email')}
                                        className="bg-primary-100"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                    <span className="text-xs text-black-500 float-right">• Max 40 Caracters</span>
                                </div> */}
                                {/* <div className="flex flex-row items-center">
                                    <span className="mx-4 text-gray-700 font-bold">Access data</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                                <div className="flex gap-x-4">
                                    <div className="w-1/2">
                                        <Input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            required
                                            name="password"
                                            // value={user.password}
                                            {...register('password')}
                                            className="bg-primary-100"
                                        />
                                    </div>

                                    <div className="w-1/2">
                                        <Input
                                            type="password"
                                            id="confirmationPassword"
                                            placeholder="Confirm Password"
                                            required
                                            name="confirmationPassword"
                                            // value={user.password}
                                            {...register('confirmationPassword')}
                                            className="bg-primary-100"
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
                                        onClick={handleCancelClick}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className={`bg-primary-400 text-white px-4 py-2 ${
                                            !isValid || !watchedFields.some((field) => field !== '')
                                                ? 'bg-primary-200 opacity-50 cursor-not-allowed'
                                                : ''
                                        }`}
                                        // disabled={!isValid || !watchedFields.some((field) => field !== '')}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ModalEditCancelComponent
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmCancel}
                title={'Do you want to cancel??'}
                description={'The entered data will not be saved'}
            />
        </Layout>
    )
}

export default CompanyEdit
