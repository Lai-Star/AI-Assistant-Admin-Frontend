import { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout.tsx'
import config from '../../../config/index.tsx'
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

const userGroupSchema = z
    .object({
        name: z.string(),
    })

type userGroupFormInputs = z.infer<typeof userGroupSchema>

const UserGroupEdit = () => {
    const { id } = useParams()
    const [userGroup, setUserGroup] = useState<Partial<userGroupFormInputs>>({})
    const navigate = useNavigate()
    const { toast } = useToast()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        async function fetchUserGroup() {
            try {
                const headers = {
                    'Authorization': `${localStorage.getItem('access_token')}`,  // Use the appropriate header name
                    'Content-Type': 'application/json',  // Set content type if necessary
                }
                const response = await axios.get(`https://${config.serverUrl}/api/user-group/${id}`, {
                    headers
                    // params: {
                    //     id: id
                    // }
                })
                setUserGroup(response.data)
            } catch (error) {
            } finally {
                // setLoading(false)
            }
        }
        fetchUserGroup()
    }, [id])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid }
    } = useForm<userGroupFormInputs>({
        resolver: zodResolver(userGroupSchema),
        mode: 'onChange'
    })

    const watchedFields = watch(['name'])

    useEffect(() => {
        if (userGroup) {
            setValue('name', userGroup.name || '')
        }
    }, [userGroup, setValue])

    const onSubmit = async (data: userGroupFormInputs) => {
        const { name } = data
        const formData = {
            id: id,
            name
        }

        const headers = {
            'Authorization': `${localStorage.getItem('access_token')}`,  // Use the appropriate header name
            'Content-Type': 'application/json',  // Set content type if necessary
        }
        try {
            await axios.post(`https://${config.serverUrl}/api/user-group/save`, formData, {
                headers
            })
            toast({
                title: 'Data saved successfully',
                variant: 'success'
            })
            setTimeout(() => {
                navigate('/userGroups/list')
            }, 3000)
        } catch (error) {
            toast({
                title: 'Company update ERROR',
                variant: 'destructive'
            })
        }
    }

    const breadcrumbItems = [{ label: 'UserGroups' }, { label: 'Edit User Group' }]

    const handleCancelClick = () => {
        setIsModalOpen(true)
    }

    const handleConfirmCancel = () => {
        navigate('/userGroups/list')
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
                <h1 className="text-black text-2xl font-bold"> Edit User Group</h1>
            </div>

            <div className="p-4">
                <div className="">
                    <Card className="">
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-row items-center">
                                    <span className="mx-4 text-gray-700 font-bold">User Group Data</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                                <div className="flex gap-x-4">
                                    <div className="w-1/2">
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="Enter comapany name*"
                                            required
                                            {...register('name')}
                                            className="bg-primary-100"
                                        />
                                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                    </div>
                                </div>
                                <Separator className="my-4" />
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

export default UserGroupEdit
