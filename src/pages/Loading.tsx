// src/pages/Loading.tsx
import React, { useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import logo2 from '@/assets/icons/Group 48687@2x.png'
import { useNavigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster.tsx'
import { useToast } from '@/hooks/use-toast.ts'

const Loading: React.FC = () => {
    const { toast } = useToast()

    const navigate = useNavigate()

    useEffect(() => {
        toast({
            title: 'User successfully logged in!',
            variant: 'success'
        })
        setTimeout(() => {
            navigate('/home')
        }, 3000) // Simula o tempo de espera de 3 segundos
    }, [navigate])

    return (
        <>
            <Toaster />
            <div className="flex justify-center items-center h-screen">
                <div className="progress w-1/2 bg-blue-500">Loading...</div>
            </div>
            <div className="flex items-center justify-center h-screen bg-neutral-100">
                <div className="flex flex-col items-center">
                    <div className="hidden lg:flex items-center justify-center w-1/3 p-8">
                        <img src={logo2} alt="Logo" className="max-w-full h-auto" />
                    </div>
                    <Progress value={33} />
                </div>
            </div>
        </>
    )
}

export default Loading
